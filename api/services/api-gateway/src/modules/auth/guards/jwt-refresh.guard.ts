import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as jwt from 'jsonwebtoken';

const REFRESH_TOKEN_COOKIE_NAME = 'refreshToken';

export interface IJwtRefreshPayload {
  sub: string;
  tokenId: string;
  iat: number;
  exp: number;
}

@Injectable()
export class JwtRefreshGuard implements CanActivate {
  constructor(private readonly configService: ConfigService) {}

  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const refreshToken = request.cookies?.[REFRESH_TOKEN_COOKIE_NAME];

    if (!refreshToken) {
      throw new UnauthorizedException('Refresh token not found');
    }

    try {
      const secret = this.configService.getOrThrow<string>('JWT_REFRESH_SECRET');
      const payload = jwt.verify(refreshToken, secret) as IJwtRefreshPayload;

      request.user = {
        id: payload.sub,
        tokenId: payload.tokenId,
        refreshToken,
      };

      return true;
    } catch (error) {
      throw new UnauthorizedException('Invalid or expired refresh token');
    }
  }
}
