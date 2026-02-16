import { UsersService } from '@/modules/users/domain/users.service';
import { TokensService } from '@/modules/tokens/domain/tokens.service';
import { KafkaProducerService } from '@/infrastructure/messaging';
import { IPasswordGateway } from '../domain/password.gateway';
import { IResetPasswordData } from '../domain/auth.types';
export declare class ResetPasswordUseCase {
    private readonly usersService;
    private readonly tokensService;
    private readonly passwordGateway;
    private readonly kafkaProducer;
    constructor(usersService: UsersService, tokensService: TokensService, passwordGateway: IPasswordGateway, kafkaProducer: KafkaProducerService);
    execute(data: IResetPasswordData): Promise<void>;
}
