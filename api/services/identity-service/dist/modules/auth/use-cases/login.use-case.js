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
exports.LoginUseCase = void 0;
const common_1 = require("@nestjs/common");
const shared_1 = require("@cinema/shared");
const users_service_1 = require("../../users/domain/users.service");
const tokens_service_1 = require("../../tokens/domain/tokens.service");
const jwt_tokens_gateway_1 = require("../domain/jwt-tokens.gateway");
const password_gateway_1 = require("../domain/password.gateway");
const auth_mapper_1 = require("../data/auth.mapper");
let LoginUseCase = class LoginUseCase {
    usersService;
    tokensService;
    jwtTokensGateway;
    passwordGateway;
    authMapper;
    REFRESH_TOKEN_EXPIRY_DAYS = 7;
    constructor(usersService, tokensService, jwtTokensGateway, passwordGateway, authMapper) {
        this.usersService = usersService;
        this.tokensService = tokensService;
        this.jwtTokensGateway = jwtTokensGateway;
        this.passwordGateway = passwordGateway;
        this.authMapper = authMapper;
    }
    getRefreshTokenExpiry() {
        const expiry = new Date();
        expiry.setDate(expiry.getDate() + this.REFRESH_TOKEN_EXPIRY_DAYS);
        return expiry;
    }
    async execute(data) {
        const user = await this.usersService.findByEmail(data.email);
        if (!user) {
            throw new common_1.UnauthorizedException('Invalid credentials');
        }
        const isPasswordValid = await this.passwordGateway.compare(data.password, user.password);
        if (!isPasswordValid) {
            throw new common_1.UnauthorizedException('Invalid credentials');
        }
        const tokens = await this.jwtTokensGateway.generateTokens({
            sub: user.id,
            email: user.email,
        });
        await this.tokensService.create({
            userId: user.id,
            type: shared_1.ETokenType.REFRESH_TOKEN,
            token: tokens.refreshToken,
            expiresAt: this.getRefreshTokenExpiry(),
        });
        return this.authMapper.toAuthResult(tokens, user);
    }
};
exports.LoginUseCase = LoginUseCase;
exports.LoginUseCase = LoginUseCase = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [users_service_1.UsersService,
        tokens_service_1.TokensService,
        jwt_tokens_gateway_1.IJwtTokensGateway,
        password_gateway_1.IPasswordGateway,
        auth_mapper_1.AuthMapper])
], LoginUseCase);
//# sourceMappingURL=login.use-case.js.map