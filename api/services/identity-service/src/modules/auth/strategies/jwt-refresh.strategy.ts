import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Request } from 'express';
import { ITokenPayload } from '../domain/auth.types';
import { REFRESH_TOKEN_COOKIE_NAME } from '../utils/cookie.helper';

@Injectable()
export class JwtRefreshStrategy extends PassportStrategy(
  Strategy,
  'jwt-refresh',
) {
  constructor(configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        (req: Request): string | null => {
          const cookies = req?.cookies as Record<string, string> | undefined;
          return cookies?.[REFRESH_TOKEN_COOKIE_NAME] ?? null;
        },
      ]),
      secretOrKey: configService.getOrThrow<string>('JWT_REFRESH_SECRET'),
      ignoreExpiration: false,
      passReqToCallback: true as const,
    });
  }

  validate(req: Request, payload: ITokenPayload) {
    if (!payload.sub) {
      throw new UnauthorizedException();
    }
    const cookies = req.cookies as Record<string, string> | undefined;
    const refreshToken = cookies?.[REFRESH_TOKEN_COOKIE_NAME];
    return { id: payload.sub, email: payload.email, refreshToken };
  }
}
