import { UsersService } from '@/modules/users/domain/users.service';
import { TokensService } from '@/modules/tokens/domain/tokens.service';
import { KafkaProducerService } from '@/infrastructure/messaging';
export declare class VerifyEmailUseCase {
    private readonly usersService;
    private readonly tokensService;
    private readonly kafkaProducer;
    constructor(usersService: UsersService, tokensService: TokensService, kafkaProducer: KafkaProducerService);
    execute(token: string): Promise<void>;
}
