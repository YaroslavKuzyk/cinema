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
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const register_use_case_1 = require("../use-cases/register.use-case");
const login_use_case_1 = require("../use-cases/login.use-case");
const refresh_token_use_case_1 = require("../use-cases/refresh-token.use-case");
const logout_use_case_1 = require("../use-cases/logout.use-case");
const logout_all_use_case_1 = require("../use-cases/logout-all.use-case");
const get_current_user_use_case_1 = require("../use-cases/get-current-user.use-case");
const verify_email_use_case_1 = require("../use-cases/verify-email.use-case");
const resend_verification_use_case_1 = require("../use-cases/resend-verification.use-case");
const forgot_password_use_case_1 = require("../use-cases/forgot-password.use-case");
const reset_password_use_case_1 = require("../use-cases/reset-password.use-case");
let AuthService = class AuthService {
    registerUseCase;
    loginUseCase;
    refreshTokenUseCase;
    logoutUseCase;
    logoutAllUseCase;
    getCurrentUserUseCase;
    verifyEmailUseCase;
    resendVerificationUseCase;
    forgotPasswordUseCase;
    resetPasswordUseCase;
    constructor(registerUseCase, loginUseCase, refreshTokenUseCase, logoutUseCase, logoutAllUseCase, getCurrentUserUseCase, verifyEmailUseCase, resendVerificationUseCase, forgotPasswordUseCase, resetPasswordUseCase) {
        this.registerUseCase = registerUseCase;
        this.loginUseCase = loginUseCase;
        this.refreshTokenUseCase = refreshTokenUseCase;
        this.logoutUseCase = logoutUseCase;
        this.logoutAllUseCase = logoutAllUseCase;
        this.getCurrentUserUseCase = getCurrentUserUseCase;
        this.verifyEmailUseCase = verifyEmailUseCase;
        this.resendVerificationUseCase = resendVerificationUseCase;
        this.forgotPasswordUseCase = forgotPasswordUseCase;
        this.resetPasswordUseCase = resetPasswordUseCase;
    }
    async register(data) {
        return this.registerUseCase.execute(data);
    }
    async login(data) {
        return this.loginUseCase.execute(data);
    }
    async refresh(userId, refreshToken) {
        return this.refreshTokenUseCase.execute(userId, refreshToken);
    }
    async logout(refreshToken) {
        return this.logoutUseCase.execute(refreshToken);
    }
    async logoutAll(userId) {
        return this.logoutAllUseCase.execute(userId);
    }
    async getCurrentUser(userId) {
        return this.getCurrentUserUseCase.execute(userId);
    }
    async resendVerificationEmail(userId) {
        return this.resendVerificationUseCase.execute(userId);
    }
    async verifyEmail(token) {
        return this.verifyEmailUseCase.execute(token);
    }
    async forgotPassword(data) {
        return this.forgotPasswordUseCase.execute(data);
    }
    async resetPassword(data) {
        return this.resetPasswordUseCase.execute(data);
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [register_use_case_1.RegisterUseCase,
        login_use_case_1.LoginUseCase,
        refresh_token_use_case_1.RefreshTokenUseCase,
        logout_use_case_1.LogoutUseCase,
        logout_all_use_case_1.LogoutAllUseCase,
        get_current_user_use_case_1.GetCurrentUserUseCase,
        verify_email_use_case_1.VerifyEmailUseCase,
        resend_verification_use_case_1.ResendVerificationUseCase,
        forgot_password_use_case_1.ForgotPasswordUseCase,
        reset_password_use_case_1.ResetPasswordUseCase])
], AuthService);
//# sourceMappingURL=auth.service.js.map