import { UsersService } from '@/modules/users/domain/users.service';
import { TokensService } from '@/modules/tokens/domain/tokens.service';
import { KafkaProducerService } from '@/infrastructure/messaging';
import { IForgotPasswordData } from '../domain/auth.types';
export declare class ForgotPasswordUseCase {
    private readonly usersService;
    private readonly tokensService;
    private readonly kafkaProducer;
    private readonly PASSWORD_RESET_TOKEN_EXPIRY_MINUTES;
    private readonly RESEND_VERIFICATION_COOLDOWN_MINUTES;
    constructor(usersService: UsersService, tokensService: TokensService, kafkaProducer: KafkaProducerService);
    private generatePasswordResetToken;
    private getPasswordResetTokenExpiry;
    execute(data: IForgotPasswordData): Promise<void>;
}
