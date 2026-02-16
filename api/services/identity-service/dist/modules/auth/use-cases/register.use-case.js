"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RegisterUseCase = void 0;
const common_1 = require("@nestjs/common");
const crypto = __importStar(require("crypto"));
const shared_1 = require("@cinema/shared");
const users_service_1 = require("../../users/domain/users.service");
const tokens_service_1 = require("../../tokens/domain/tokens.service");
const messaging_1 = require("../../../infrastructure/messaging");
const jwt_tokens_gateway_1 = require("../domain/jwt-tokens.gateway");
const password_gateway_1 = require("../domain/password.gateway");
const auth_mapper_1 = require("../data/auth.mapper");
let RegisterUseCase = class RegisterUseCase {
    usersService;
    tokensService;
    jwtTokensGateway;
    passwordGateway;
    authMapper;
    kafkaProducer;
    VERIFICATION_TOKEN_EXPIRY_HOURS = 24;
    REFRESH_TOKEN_EXPIRY_DAYS = 7;
    constructor(usersService, tokensService, jwtTokensGateway, passwordGateway, authMapper, kafkaProducer) {
        this.usersService = usersService;
        this.tokensService = tokensService;
        this.jwtTokensGateway = jwtTokensGateway;
        this.passwordGateway = passwordGateway;
        this.authMapper = authMapper;
        this.kafkaProducer = kafkaProducer;
    }
    generateVerificationToken() {
        return crypto.randomBytes(32).toString('hex');
    }
    getVerificationTokenExpiry() {
        const expiry = new Date();
        expiry.setHours(expiry.getHours() + this.VERIFICATION_TOKEN_EXPIRY_HOURS);
        return expiry;
    }
    getRefreshTokenExpiry() {
        const expiry = new Date();
        expiry.setDate(expiry.getDate() + this.REFRESH_TOKEN_EXPIRY_DAYS);
        return expiry;
    }
    async execute(data) {
        const existingUser = await this.usersService.findByEmail(data.email);
        if (existingUser) {
            throw new common_1.ConflictException('User with this email already exists');
        }
        const hashedPassword = await this.passwordGateway.hash(data.password);
        const user = await this.usersService.create({
            email: data.email,
            phoneNumber: data.phoneNumber,
            firstName: data.firstName,
            lastName: data.lastName,
            userType: shared_1.EUserType.CUSTOMER,
            password: hashedPassword,
        });
        const verificationToken = this.generateVerificationToken();
        const verificationTokenExpiry = this.getVerificationTokenExpiry();
        await this.tokensService.create({
            userId: user.id,
            type: shared_1.ETokenType.EMAIL_VERIFICATION,
            token: verificationToken,
            expiresAt: verificationTokenExpiry,
        });
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
        try {
            const event = {
                userId: user.id,
                email: user.email,
                firstName: user.firstName,
                lastName: user.lastName,
                verificationToken,
            };
            await this.kafkaProducer.emit(shared_1.IDENTITY_EVENTS.USER_CREATED, event);
        }
        catch (error) {
            console.error('Failed to emit user.created event:', error);
        }
        return this.authMapper.toAuthResult(tokens, user);
    }
};
exports.RegisterUseCase = RegisterUseCase;
exports.RegisterUseCase = RegisterUseCase = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [users_service_1.UsersService,
        tokens_service_1.TokensService,
        jwt_tokens_gateway_1.IJwtTokensGateway,
        password_gateway_1.IPasswordGateway,
        auth_mapper_1.AuthMapper,
        messaging_1.KafkaProducerService])
], RegisterUseCase);
//# sourceMappingURL=register.use-case.js.map