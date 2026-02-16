import { UsersService } from '@/modules/users/domain/users.service';
import { TokensService } from '@/modules/tokens/domain/tokens.service';
import { KafkaProducerService } from '@/infrastructure/messaging';
import { IJwtTokensGateway } from '../domain/jwt-tokens.gateway';
import { IPasswordGateway } from '../domain/password.gateway';
import { AuthMapper } from '../data/auth.mapper';
import { IRegisterData, IAuthResult } from '../domain/auth.types';
export declare class RegisterUseCase {
    private readonly usersService;
    private readonly tokensService;
    private readonly jwtTokensGateway;
    private readonly passwordGateway;
    private readonly authMapper;
    private readonly kafkaProducer;
    private readonly VERIFICATION_TOKEN_EXPIRY_HOURS;
    private readonly REFRESH_TOKEN_EXPIRY_DAYS;
    constructor(usersService: UsersService, tokensService: TokensService, jwtTokensGateway: IJwtTokensGateway, passwordGateway: IPasswordGateway, authMapper: AuthMapper, kafkaProducer: KafkaProducerService);
    private generateVerificationToken;
    private getVerificationTokenExpiry;
    private getRefreshTokenExpiry;
    execute(data: IRegisterData): Promise<IAuthResult>;
}
