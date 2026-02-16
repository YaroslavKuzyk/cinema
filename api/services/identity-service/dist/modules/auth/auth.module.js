"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthModule = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const passport_1 = require("@nestjs/passport");
const auth_controller_1 = require("./auth.controller");
const auth_service_1 = require("./domain/auth.service");
const jwt_tokens_gateway_1 = require("./domain/jwt-tokens.gateway");
const password_gateway_1 = require("./domain/password.gateway");
const jwt_tokens_gateway_2 = require("./data/jwt-tokens.gateway");
const password_gateway_2 = require("./data/password.gateway");
const auth_mapper_1 = require("./data/auth.mapper");
const jwt_access_strategy_1 = require("./strategies/jwt-access.strategy");
const jwt_refresh_strategy_1 = require("./strategies/jwt-refresh.strategy");
const use_cases_1 = require("./use-cases");
const users_module_1 = require("../users/users.module");
const tokens_module_1 = require("../tokens/tokens.module");
const messaging_1 = require("../../infrastructure/messaging");
let AuthModule = class AuthModule {
};
exports.AuthModule = AuthModule;
exports.AuthModule = AuthModule = __decorate([
    (0, common_1.Module)({
        imports: [
            passport_1.PassportModule,
            jwt_1.JwtModule.register({}),
            users_module_1.UsersModule,
            tokens_module_1.TokensModule,
            messaging_1.KafkaModule,
        ],
        controllers: [auth_controller_1.AuthController],
        providers: [
            { provide: jwt_tokens_gateway_1.IJwtTokensGateway, useClass: jwt_tokens_gateway_2.JwtTokensGateway },
            { provide: password_gateway_1.IPasswordGateway, useClass: password_gateway_2.PasswordGateway },
            auth_service_1.AuthService,
            auth_mapper_1.AuthMapper,
            jwt_access_strategy_1.JwtAccessStrategy,
            jwt_refresh_strategy_1.JwtRefreshStrategy,
            use_cases_1.RegisterUseCase,
            use_cases_1.LoginUseCase,
            use_cases_1.RefreshTokenUseCase,
            use_cases_1.LogoutUseCase,
            use_cases_1.LogoutAllUseCase,
            use_cases_1.GetCurrentUserUseCase,
            use_cases_1.VerifyEmailUseCase,
            use_cases_1.ResendVerificationUseCase,
            use_cases_1.ForgotPasswordUseCase,
            use_cases_1.ResetPasswordUseCase,
        ],
        exports: [auth_service_1.AuthService],
    })
], AuthModule);
//# sourceMappingURL=auth.module.js.map