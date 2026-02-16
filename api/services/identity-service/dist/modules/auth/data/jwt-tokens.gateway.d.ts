import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { IJwtTokensGateway } from '../domain/jwt-tokens.gateway';
import { ITokenPayload, ITokens } from '../domain/auth.types';
export declare class JwtTokensGateway implements IJwtTokensGateway {
    private readonly jwtService;
    private readonly configService;
    constructor(jwtService: JwtService, configService: ConfigService);
    generateTokens(payload: ITokenPayload): Promise<ITokens>;
    generateAccessToken(payload: ITokenPayload): Promise<string>;
    generateRefreshToken(payload: ITokenPayload): Promise<string>;
}
