import {
  Injectable,
  UnauthorizedException,
  BadRequestException,
} from '@nestjs/common';
import * as crypto from 'crypto';
import { ID, ETokenType, IDENTITY_EVENTS, IUserCreatedEvent } from '@cinema/shared';
import { UsersService } from '@/modules/users/domain/users.service';
import { TokensService } from '@/modules/tokens/domain/tokens.service';
import { KafkaProducerService } from '@/infrastructure/messaging';

@Injectable()
export class ResendVerificationUseCase {
  private readonly VERIFICATION_TOKEN_EXPIRY_HOURS = 24;
  private readonly RESEND_VERIFICATION_COOLDOWN_MINUTES = 3;

  constructor(
    private readonly usersService: UsersService,
    private readonly tokensService: TokensService,
    private readonly kafkaProducer: KafkaProducerService,
  ) {}

  private generateVerificationToken(): string {
    return crypto.randomBytes(32).toString('hex');
  }

  private getVerificationTokenExpiry(): Date {
    const expiry = new Date();
    expiry.setHours(expiry.getHours() + this.VERIFICATION_TOKEN_EXPIRY_HOURS);
    return expiry;
  }

  async execute(userId: ID): Promise<void> {
    const user = await this.usersService.findById(userId);
    if (!user) {
      throw new UnauthorizedException('User not found');
    }

    if (user.emailVerified) {
      throw new BadRequestException('Email is already verified');
    }

    const existingTokens = await this.tokensService.findAllByUserIdAndType(
      userId,
      ETokenType.EMAIL_VERIFICATION,
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
          `Please wait ${waitTime} minute(s) before requesting another verification email`,
        );
      }
    }

    // Delete old verification tokens
    await this.tokensService.deleteByUserIdAndType(
      userId,
      ETokenType.EMAIL_VERIFICATION,
    );

    const verificationToken = this.generateVerificationToken();
    const verificationTokenExpiry = this.getVerificationTokenExpiry();

    await this.tokensService.create({
      userId: user.id,
      type: ETokenType.EMAIL_VERIFICATION,
      token: verificationToken,
      expiresAt: verificationTokenExpiry,
    });

    // Emit user.created event with new verification token
    const event: IUserCreatedEvent = {
      userId: user.id,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      verificationToken,
    };
    await this.kafkaProducer.emit(IDENTITY_EVENTS.USER_CREATED, event);
  }
}
