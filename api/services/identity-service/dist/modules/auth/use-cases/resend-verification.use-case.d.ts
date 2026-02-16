import { ID } from '@cinema/shared';
import { UsersService } from '@/modules/users/domain/users.service';
import { TokensService } from '@/modules/tokens/domain/tokens.service';
import { KafkaProducerService } from '@/infrastructure/messaging';
export declare class ResendVerificationUseCase {
    private readonly usersService;
    private readonly tokensService;
    private readonly kafkaProducer;
    private readonly VERIFICATION_TOKEN_EXPIRY_HOURS;
    private readonly RESEND_VERIFICATION_COOLDOWN_MINUTES;
    constructor(usersService: UsersService, tokensService: TokensService, kafkaProducer: KafkaProducerService);
    private generateVerificationToken;
    private getVerificationTokenExpiry;
    execute(userId: ID): Promise<void>;
}
