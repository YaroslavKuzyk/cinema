import { Injectable, BadRequestException } from '@nestjs/common';
import { ETokenType, IDENTITY_EVENTS, IUserVerifiedEvent } from '@cinema/shared';
import { UsersService } from '@/modules/users/domain/users.service';
import { TokensService } from '@/modules/tokens/domain/tokens.service';
import { KafkaProducerService } from '@/infrastructure/messaging';

@Injectable()
export class VerifyEmailUseCase {
  constructor(
    private readonly usersService: UsersService,
    private readonly tokensService: TokensService,
    private readonly kafkaProducer: KafkaProducerService,
  ) {}

  async execute(token: string): Promise<void> {
    const userToken = await this.tokensService.findValidByToken(token);

    if (!userToken || userToken.type !== ETokenType.EMAIL_VERIFICATION) {
      throw new BadRequestException('Invalid or expired verification token');
    }

    const user = await this.usersService.findById(userToken.userId);
    if (!user) {
      throw new BadRequestException('User not found');
    }

    if (user.emailVerified) {
      throw new BadRequestException('Email is already verified');
    }

    await this.usersService.update(user.id, {
      emailVerified: true,
    });

    await this.tokensService.deleteByToken(token);

    // Emit user.verified event
    try {
      const event: IUserVerifiedEvent = {
        userId: user.id,
        email: user.email,
      };
      await this.kafkaProducer.emit(IDENTITY_EVENTS.USER_VERIFIED, event);
    } catch (error) {
      console.error('Failed to emit user.verified event:', error);
    }
  }
}
