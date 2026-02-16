import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ETokenType } from '@cinema/shared';
import { UsersService } from '@/modules/users/domain/users.service';
import { TokensService } from '@/modules/tokens/domain/tokens.service';
import { IJwtTokensGateway } from '../domain/jwt-tokens.gateway';
import { IPasswordGateway } from '../domain/password.gateway';
import { AuthMapper } from '../data/auth.mapper';
import { ILoginData, IAuthResult } from '../domain/auth.types';

@Injectable()
export class LoginUseCase {
  private readonly REFRESH_TOKEN_EXPIRY_DAYS = 7;

  constructor(
    private readonly usersService: UsersService,
    private readonly tokensService: TokensService,
    private readonly jwtTokensGateway: IJwtTokensGateway,
    private readonly passwordGateway: IPasswordGateway,
    private readonly authMapper: AuthMapper,
  ) {}

  private getRefreshTokenExpiry(): Date {
    const expiry = new Date();
    expiry.setDate(expiry.getDate() + this.REFRESH_TOKEN_EXPIRY_DAYS);
    return expiry;
  }

  async execute(data: ILoginData): Promise<IAuthResult> {
    // Find user by email
    const user = await this.usersService.findByEmail(data.email);
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    // Verify password
    const isPasswordValid = await this.passwordGateway.compare(
      data.password,
      user.password,
    );
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    // Generate access & refresh tokens
    const tokens = await this.jwtTokensGateway.generateTokens({
      sub: user.id,
      email: user.email,
    });

    // Multi-device support: don't delete existing refresh tokens
    await this.tokensService.create({
      userId: user.id,
      type: ETokenType.REFRESH_TOKEN,
      token: tokens.refreshToken,
      expiresAt: this.getRefreshTokenExpiry(),
    });

    return this.authMapper.toAuthResult(tokens, user);
  }
}
