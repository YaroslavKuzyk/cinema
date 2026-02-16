"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.REFRESH_TOKEN_COOKIE_NAME = void 0;
exports.getRefreshTokenCookieOptions = getRefreshTokenCookieOptions;
exports.setRefreshTokenCookie = setRefreshTokenCookie;
exports.clearRefreshTokenCookie = clearRefreshTokenCookie;
exports.REFRESH_TOKEN_COOKIE_NAME = 'refreshToken';
function getRefreshTokenCookieOptions() {
    const isProduction = process.env.NODE_ENV === 'production';
    return {
        httpOnly: true,
        secure: isProduction,
        sameSite: isProduction ? 'strict' : 'lax',
        maxAge: 7 * 24 * 60 * 60 * 1000,
        path: '/',
    };
}
function setRefreshTokenCookie(res, token) {
    res.cookie(exports.REFRESH_TOKEN_COOKIE_NAME, token, getRefreshTokenCookieOptions());
}
function clearRefreshTokenCookie(res) {
    res.clearCookie(exports.REFRESH_TOKEN_COOKIE_NAME, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: process.env.NODE_ENV === 'production' ? 'strict' : 'lax',
        path: '/',
    });
}
//# sourceMappingURL=cookie.helper.js.map