import { Injectable, BadRequestException } from '@nestjs/common';
import { ETokenType, IDENTITY_EVENTS, IPasswordChangedEvent } from '@cinema/shared';
import { UsersService } from '@/modules/users/domain/users.service';
import { TokensService } from '@/modules/tokens/domain/tokens.service';
import { KafkaProducerService } from '@/infrastructure/messaging';
import { IPasswordGateway } from '../domain/password.gateway';
import { IResetPasswordData } from '../domain/auth.types';

@Injectable()
export class ResetPasswordUseCase {
  constructor(
    private readonly usersService: UsersService,
    private readonly tokensService: TokensService,
    private readonly passwordGateway: IPasswordGateway,
    private readonly kafkaProducer: KafkaProducerService,
  ) {}

  async execute(data: IResetPasswordData): Promise<void> {
    const userToken = await this.tokensService.findValidByToken(data.token);

    if (!userToken || userToken.type !== ETokenType.PASSWORD_RESET) {
      throw new BadRequestException('Invalid or expired verification token');
    }

    const user = await this.usersService.findById(userToken.userId);
    if (!user) {
      throw new BadRequestException('User not found');
    }

    await this.usersService.update(user.id, {
      password: await this.passwordGateway.hash(data.password),
    });

    // Delete refresh tokens (logout from all devices) and password reset tokens
    await this.tokensService.deleteByUserIdAndType(
      user.id,
      ETokenType.REFRESH_TOKEN,
    );
    await this.tokensService.deleteByUserIdAndType(
      user.id,
      ETokenType.PASSWORD_RESET,
    );

    // Emit password.changed event
    try {
      const event: IPasswordChangedEvent = {
        userId: user.id,
        email: user.email,
      };
      await this.kafkaProducer.emit(IDENTITY_EVENTS.PASSWORD_CHANGED, event);
    } catch (error) {
      console.error('Failed to emit password.changed event:', error);
    }
  }
}
