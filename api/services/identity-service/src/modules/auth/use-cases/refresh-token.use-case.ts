import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ID, ETokenType } from '@cinema/shared';
import { UsersService } from '@/modules/users/domain/users.service';
import { TokensService } from '@/modules/tokens/domain/tokens.service';
import { IJwtTokensGateway } from '../domain/jwt-tokens.gateway';
import { AuthMapper } from '../data/auth.mapper';
import { ITokensResult } from '../domain/auth.types';

@Injectable()
export class RefreshTokenUseCase {
  private readonly REFRESH_TOKEN_EXPIRY_DAYS = 7;

  constructor(
    private readonly usersService: UsersService,
    private readonly tokensService: TokensService,
    private readonly jwtTokensGateway: IJwtTokensGateway,
    private readonly authMapper: AuthMapper,
  ) {}

  private getRefreshTokenExpiry(): Date {
    const expiry = new Date();
    expiry.setDate(expiry.getDate() + this.REFRESH_TOKEN_EXPIRY_DAYS);
    return expiry;
  }

  async execute(userId: ID, refreshToken: string): Promise<ITokensResult> {
    const userToken = await this.tokensService.findByToken(refreshToken);

    if (!userToken || userToken.type !== ETokenType.REFRESH_TOKEN) {
      throw new UnauthorizedException('Invalid refresh token');
    }

    if (userToken.userId !== userId) {
      throw new UnauthorizedException('Access denied');
    }

    if (new Date() > new Date(userToken.expiresAt)) {
      await this.tokensService.deleteByToken(refreshToken);
      throw new UnauthorizedException('Refresh token has expired');
    }

    const user = await this.usersService.findById(userId);
    if (!user) {
      throw new UnauthorizedException('User not found');
    }

    const tokens = await this.jwtTokensGateway.generateTokens({
      sub: user.id,
      email: user.email,
    });

    // Token rotation for security
    await this.tokensService.deleteByToken(refreshToken);
    await this.tokensService.create({
      userId: user.id,
      type: ETokenType.REFRESH_TOKEN,
      token: tokens.refreshToken,
      expiresAt: this.getRefreshTokenExpiry(),
      deviceInfo: userToken.deviceInfo ?? undefined,
      ipAddress: userToken.ipAddress ?? undefined,
    });

    return this.authMapper.toTokensResult(tokens);
  }
}
