import { UsersService } from '@/modules/users/domain/users.service';
import { TokensService } from '@/modules/tokens/domain/tokens.service';
import { IJwtTokensGateway } from '../domain/jwt-tokens.gateway';
import { IPasswordGateway } from '../domain/password.gateway';
import { AuthMapper } from '../data/auth.mapper';
import { ILoginData, IAuthResult } from '../domain/auth.types';
export declare class LoginUseCase {
    private readonly usersService;
    private readonly tokensService;
    private readonly jwtTokensGateway;
    private readonly passwordGateway;
    private readonly authMapper;
    private readonly REFRESH_TOKEN_EXPIRY_DAYS;
    constructor(usersService: UsersService, tokensService: TokensService, jwtTokensGateway: IJwtTokensGateway, passwordGateway: IPasswordGateway, authMapper: AuthMapper);
    private getRefreshTokenExpiry;
    execute(data: ILoginData): Promise<IAuthResult>;
}
