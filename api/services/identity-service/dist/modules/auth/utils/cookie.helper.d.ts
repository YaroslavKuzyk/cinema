import type { Response } from 'express';
export declare const REFRESH_TOKEN_COOKIE_NAME = "refreshToken";
export interface CookieOptions {
    httpOnly: boolean;
    secure: boolean;
    sameSite: 'strict' | 'lax' | 'none';
    maxAge: number;
    path: string;
}
export declare function getRefreshTokenCookieOptions(): CookieOptions;
export declare function setRefreshTokenCookie(res: Response, token: string): void;
export declare function clearRefreshTokenCookie(res: Response): void;
