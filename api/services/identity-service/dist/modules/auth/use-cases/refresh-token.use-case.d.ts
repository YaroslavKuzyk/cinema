import { ID } from '@cinema/shared';
import { UsersService } from '@/modules/users/domain/users.service';
import { TokensService } from '@/modules/tokens/domain/tokens.service';
import { IJwtTokensGateway } from '../domain/jwt-tokens.gateway';
import { AuthMapper } from '../data/auth.mapper';
import { IAuthResult } from '../domain/auth.types';
export declare class RefreshTokenUseCase {
    private readonly usersService;
    private readonly tokensService;
    private readonly jwtTokensGateway;
    private readonly authMapper;
    private readonly REFRESH_TOKEN_EXPIRY_DAYS;
    constructor(usersService: UsersService, tokensService: TokensService, jwtTokensGateway: IJwtTokensGateway, authMapper: AuthMapper);
    private getRefreshTokenExpiry;
    execute(userId: ID, refreshToken: string): Promise<IAuthResult>;
}
