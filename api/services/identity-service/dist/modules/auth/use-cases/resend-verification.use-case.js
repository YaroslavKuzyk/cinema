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
exports.ResendVerificationUseCase = void 0;
const common_1 = require("@nestjs/common");
const crypto = __importStar(require("crypto"));
const shared_1 = require("@cinema/shared");
const users_service_1 = require("../../users/domain/users.service");
const tokens_service_1 = require("../../tokens/domain/tokens.service");
const messaging_1 = require("../../../infrastructure/messaging");
let ResendVerificationUseCase = class ResendVerificationUseCase {
    usersService;
    tokensService;
    kafkaProducer;
    VERIFICATION_TOKEN_EXPIRY_HOURS = 24;
    RESEND_VERIFICATION_COOLDOWN_MINUTES = 3;
    constructor(usersService, tokensService, kafkaProducer) {
        this.usersService = usersService;
        this.tokensService = tokensService;
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
    async execute(userId) {
        const user = await this.usersService.findById(userId);
        if (!user) {
            throw new common_1.UnauthorizedException('User not found');
        }
        if (user.emailVerified) {
            throw new common_1.BadRequestException('Email is already verified');
        }
        const existingTokens = await this.tokensService.findAllByUserIdAndType(userId, shared_1.ETokenType.EMAIL_VERIFICATION);
        const existingToken = existingTokens.find((t) => new Date(t.expiresAt) > new Date());
        if (existingToken) {
            const minutesSinceCreated = (new Date().getTime() - new Date(existingToken.createdAt).getTime()) /
                1000 /
                60;
            if (minutesSinceCreated < this.RESEND_VERIFICATION_COOLDOWN_MINUTES) {
                const waitTime = Math.ceil(this.RESEND_VERIFICATION_COOLDOWN_MINUTES - minutesSinceCreated);
                throw new common_1.BadRequestException(`Please wait ${waitTime} minute(s) before requesting another verification email`);
            }
        }
        await this.tokensService.deleteByUserIdAndType(userId, shared_1.ETokenType.EMAIL_VERIFICATION);
        const verificationToken = this.generateVerificationToken();
        const verificationTokenExpiry = this.getVerificationTokenExpiry();
        await this.tokensService.create({
            userId: user.id,
            type: shared_1.ETokenType.EMAIL_VERIFICATION,
            token: verificationToken,
            expiresAt: verificationTokenExpiry,
        });
        const event = {
            userId: user.id,
            email: user.email,
            firstName: user.firstName,
            lastName: user.lastName,
            verificationToken,
        };
        await this.kafkaProducer.emit(shared_1.IDENTITY_EVENTS.USER_CREATED, event);
    }
};
exports.ResendVerificationUseCase = ResendVerificationUseCase;
exports.ResendVerificationUseCase = ResendVerificationUseCase = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [users_service_1.UsersService,
        tokens_service_1.TokensService,
        messaging_1.KafkaProducerService])
], ResendVerificationUseCase);
//# sourceMappingURL=resend-verification.use-case.js.map