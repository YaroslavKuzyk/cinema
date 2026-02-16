import { Injectable, BadRequestException } from '@nestjs/common';
import * as crypto from 'crypto';
import { ETokenType, IDENTITY_EVENTS, IPasswordResetRequestedEvent } from '@cinema/shared';
import { UsersService } from '@/modules/users/domain/users.service';
import { TokensService } from '@/modules/tokens/domain/tokens.service';
import { KafkaProducerService } from '@/infrastructure/messaging';
import { IForgotPasswordData } from '../domain/auth.types';

@Injectable()
export class ForgotPasswordUseCase {
  private readonly PASSWORD_RESET_TOKEN_EXPIRY_MINUTES = 15;
  private readonly RESEND_VERIFICATION_COOLDOWN_MINUTES = 3;

  constructor(
    private readonly usersService: UsersService,
    private readonly tokensService: TokensService,
    private readonly kafkaProducer: KafkaProducerService,
  ) {}

  private generatePasswordResetToken(): string {
    return crypto.randomBytes(32).toString('hex');
  }

  private getPasswordResetTokenExpiry(): Date {
    const expiry = new Date();
    expiry.setMinutes(
      expiry.getMinutes() + this.PASSWORD_RESET_TOKEN_EXPIRY_MINUTES,
    );
    return expiry;
  }

  async execute(data: IForgotPasswordData): Promise<void> {
    const user = await this.usersService.findByEmail(data.email);

    // Security: Don't reveal if user exists to prevent email enumeration
    if (!user) {
      return;
    }

    // Rate limiting: Check for recent password reset requests
    const existingTokens = await this.tokensService.findAllByUserIdAndType(
      user.id,
      ETokenType.PASSWORD_RESET,
    );

    const existingToken = existingTokens.find(
      (t) => new Date(t.expiresAt) > new Date(),
    );

    if (existingToken) {
      const minutesSinceCreated =
        (new Date().getTime() - new Date(existingToken.createdAt).getTime()) /
        1000 /
        60;

      if (minutesSinceCreated < this.RESEND_VERIFICATION_COOLDOWN_MINUTES) {
        const waitTime = Math.ceil(
          this.RESEND_VERIFICATION_COOLDOWN_MINUTES - minutesSinceCreated,
        );
        throw new BadRequestException(
          `Please wait ${waitTime} minute(s) before requesting another password reset`,
        );
      }
    }

    // Delete old password reset tokens
    await this.tokensService.deleteByUserIdAndType(
      user.id,
      ETokenType.PASSWORD_RESET,
    );

    const passwordResetToken = this.generatePasswordResetToken();
    const passwordResetTokenExpiry = this.getPasswordResetTokenExpiry();

    await this.tokensService.create({
      userId: user.id,
      type: ETokenType.PASSWORD_RESET,
      token: passwordResetToken,
      expiresAt: passwordResetTokenExpiry,
    });

    // Emit password.reset.requested event
    const event: IPasswordResetRequestedEvent = {
      userId: user.id,
      email: user.email,
      firstName: user.firstName,
      resetToken: passwordResetToken,
    };
    await this.kafkaProducer.emit(IDENTITY_EVENTS.PASSWORD_RESET_REQUESTED, event);
  }
}
