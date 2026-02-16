"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const auth_service_1 = require("./domain/auth.service");
const register_dto_1 = require("./dtos/register.dto");
const login_dto_1 = require("./dtos/login.dto");
const auth_response_dto_1 = require("./dtos/auth-response.dto");
const user_response_dto_1 = require("./dtos/user-response.dto");
const access_token_response_dto_1 = require("./dtos/access-token-response.dto");
const message_response_dto_1 = require("./dtos/message-response.dto");
const forgot_password_dto_1 = require("./dtos/forgot-password.dto");
const reset_password_dto_1 = require("./dtos/reset-password.dto");
const jwt_refresh_guard_1 = require("./guards/jwt-refresh.guard");
const current_user_decorator_1 = require("./decorators/current-user.decorator");
const public_decorator_1 = require("./decorators/public.decorator");
const cookie_helper_1 = require("./utils/cookie.helper");
let AuthController = class AuthController {
    authService;
    constructor(authService) {
        this.authService = authService;
    }
    async register(dto, res) {
        const result = await this.authService.register(dto);
        (0, cookie_helper_1.setRefreshTokenCookie)(res, result.refreshToken);
        return {
            accessToken: result.accessToken,
            user: result.user,
        };
    }
    async login(dto, res) {
        const result = await this.authService.login(dto);
        (0, cookie_helper_1.setRefreshTokenCookie)(res, result.refreshToken);
        return {
            accessToken: result.accessToken,
            user: result.user,
        };
    }
    async refresh(user, res) {
        const result = await this.authService.refresh(user.id, user.refreshToken);
        (0, cookie_helper_1.setRefreshTokenCookie)(res, result.refreshToken);
        return {
            accessToken: result.accessToken,
        };
    }
    async logout(req, res) {
        const cookies = req.cookies;
        const refreshToken = cookies?.[cookie_helper_1.REFRESH_TOKEN_COOKIE_NAME];
        if (refreshToken) {
            await this.authService.logout(refreshToken);
        }
        (0, cookie_helper_1.clearRefreshTokenCookie)(res);
    }
    async logoutAll(userId, res) {
        await this.authService.logoutAll(userId);
        (0, cookie_helper_1.clearRefreshTokenCookie)(res);
    }
    async getCurrentUser(userId) {
        return this.authService.getCurrentUser(userId);
    }
    async resendVerificationEmail(userId) {
        await this.authService.resendVerificationEmail(userId);
        return { message: 'Verification email sent successfully' };
    }
    async verifyEmail(token) {
        await this.authService.verifyEmail(token);
        return { message: 'Email verified successfully' };
    }
    async forgotPassword(dto) {
        await this.authService.forgotPassword(dto);
        return { message: 'Password reset email sent successfully' };
    }
    async resetPassword(dto) {
        await this.authService.resetPassword(dto);
        return { message: 'Password reset successfully' };
    }
};
exports.AuthController = AuthController;
__decorate([
    (0, public_decorator_1.Public)(),
    (0, common_1.Post)('register'),
    (0, swagger_1.ApiOperation)({ summary: 'Register a new user' }),
    (0, swagger_1.ApiCreatedResponse)({
        description: 'User successfully registered',
        type: auth_response_dto_1.AuthResponseDto,
    }),
    (0, swagger_1.ApiConflictResponse)({ description: 'User with this email already exists' }),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Res)({ passthrough: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [register_dto_1.RegisterDto, Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "register", null);
__decorate([
    (0, public_decorator_1.Public)(),
    (0, common_1.Post)('login'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({ summary: 'Login user' }),
    (0, swagger_1.ApiOkResponse)({
        description: 'User successfully logged in',
        type: auth_response_dto_1.AuthResponseDto,
    }),
    (0, swagger_1.ApiUnauthorizedResponse)({ description: 'Invalid credentials' }),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Res)({ passthrough: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [login_dto_1.LoginDto, Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "login", null);
__decorate([
    (0, public_decorator_1.Public)(),
    (0, common_1.Post)('refresh'),
    (0, common_1.UseGuards)(jwt_refresh_guard_1.JwtRefreshGuard),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({ summary: 'Refresh access token' }),
    (0, swagger_1.ApiOkResponse)({
        description: 'Access token successfully refreshed',
        type: access_token_response_dto_1.AccessTokenResponseDto,
    }),
    (0, swagger_1.ApiUnauthorizedResponse)({ description: 'Invalid or expired refresh token' }),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __param(1, (0, common_1.Res)({ passthrough: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "refresh", null);
__decorate([
    (0, common_1.Post)('logout'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({ summary: 'Logout from current device' }),
    (0, swagger_1.ApiOkResponse)({
        description: 'User successfully logged out from current device',
    }),
    (0, swagger_1.ApiUnauthorizedResponse)({ description: 'Unauthorized' }),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Res)({ passthrough: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "logout", null);
__decorate([
    (0, common_1.Post)('logout-all'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({ summary: 'Logout from all devices' }),
    (0, swagger_1.ApiOkResponse)({
        description: 'User successfully logged out from all devices',
    }),
    (0, swagger_1.ApiUnauthorizedResponse)({ description: 'Unauthorized' }),
    __param(0, (0, current_user_decorator_1.CurrentUser)('id')),
    __param(1, (0, common_1.Res)({ passthrough: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "logoutAll", null);
__decorate([
    (0, common_1.Get)('me'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ summary: 'Get current authenticated user' }),
    (0, swagger_1.ApiOkResponse)({
        description: 'Current user data',
        type: user_response_dto_1.UserResponseDto,
    }),
    (0, swagger_1.ApiUnauthorizedResponse)({ description: 'Unauthorized' }),
    __param(0, (0, current_user_decorator_1.CurrentUser)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "getCurrentUser", null);
__decorate([
    (0, common_1.Post)('resend-verification'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({
        summary: 'Resend email verification',
    }),
    (0, swagger_1.ApiOkResponse)({
        description: 'Verification email sent successfully',
        type: message_response_dto_1.MessageResponseDto,
    }),
    (0, swagger_1.ApiUnauthorizedResponse)({ description: 'Unauthorized' }),
    (0, swagger_1.ApiBadRequestResponse)({
        description: 'Email already verified',
        schema: {
            type: 'object',
            properties: {
                statusCode: { type: 'number', example: 400 },
                message: { type: 'string', example: 'Email is already verified' },
                error: { type: 'string', example: 'Bad Request' },
            },
        },
    }),
    __param(0, (0, current_user_decorator_1.CurrentUser)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "resendVerificationEmail", null);
__decorate([
    (0, public_decorator_1.Public)(),
    (0, common_1.Get)('verify-email'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({
        summary: 'Verify email address',
    }),
    (0, swagger_1.ApiQuery)({
        name: 'token',
        description: 'Email verification token received in the verification email',
        required: true,
        type: String,
        example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
    }),
    (0, swagger_1.ApiOkResponse)({
        description: 'Email verified successfully',
        type: message_response_dto_1.MessageResponseDto,
    }),
    (0, swagger_1.ApiBadRequestResponse)({
        description: 'Invalid or expired verification token',
        schema: {
            type: 'object',
            properties: {
                statusCode: { type: 'number', example: 400 },
                message: {
                    type: 'string',
                    example: 'Invalid verification token',
                },
                error: { type: 'string', example: 'Bad Request' },
            },
        },
    }),
    __param(0, (0, common_1.Query)('token')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "verifyEmail", null);
__decorate([
    (0, public_decorator_1.Public)(),
    (0, common_1.Post)('forgot-password'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({
        summary: 'Forgot password',
    }),
    (0, swagger_1.ApiOkResponse)({
        description: 'Password reset email sent successfully',
        type: message_response_dto_1.MessageResponseDto,
    }),
    (0, swagger_1.ApiBadRequestResponse)({
        description: 'Invalid or expired verification token',
        schema: {
            type: 'object',
            properties: {
                statusCode: { type: 'number', example: 400 },
                message: {
                    type: 'string',
                    example: 'Invalid verification token',
                },
                error: { type: 'string', example: 'Bad Request' },
            },
        },
    }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [forgot_password_dto_1.ForgotPasswordDto]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "forgotPassword", null);
__decorate([
    (0, public_decorator_1.Public)(),
    (0, common_1.Post)('reset-password'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({
        summary: 'Reset password',
    }),
    (0, swagger_1.ApiOkResponse)({
        description: 'Password reset successfully',
        type: message_response_dto_1.MessageResponseDto,
    }),
    (0, swagger_1.ApiBadRequestResponse)({
        description: 'Invalid or expired verification token',
        schema: {
            type: 'object',
            properties: {
                statusCode: { type: 'number', example: 400 },
                message: {
                    type: 'string',
                    example: 'Invalid verification token',
                },
                error: { type: 'string', example: 'Bad Request' },
            },
        },
    }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [reset_password_dto_1.ResetPasswordDto]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "resetPassword", null);
exports.AuthController = AuthController = __decorate([
    (0, swagger_1.ApiTags)('Authentication'),
    (0, common_1.Controller)('auth'),
    __metadata("design:paramtypes", [auth_service_1.AuthService])
], AuthController);
//# sourceMappingURL=auth.controller.js.map