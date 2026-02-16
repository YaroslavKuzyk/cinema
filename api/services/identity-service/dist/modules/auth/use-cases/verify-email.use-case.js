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
exports.VerifyEmailUseCase = void 0;
const common_1 = require("@nestjs/common");
const shared_1 = require("@cinema/shared");
const users_service_1 = require("../../users/domain/users.service");
const tokens_service_1 = require("../../tokens/domain/tokens.service");
const messaging_1 = require("../../../infrastructure/messaging");
let VerifyEmailUseCase = class VerifyEmailUseCase {
    usersService;
    tokensService;
    kafkaProducer;
    constructor(usersService, tokensService, kafkaProducer) {
        this.usersService = usersService;
        this.tokensService = tokensService;
        this.kafkaProducer = kafkaProducer;
    }
    async execute(token) {
        const userToken = await this.tokensService.findValidByToken(token);
        if (!userToken || userToken.type !== shared_1.ETokenType.EMAIL_VERIFICATION) {
            throw new common_1.BadRequestException('Invalid or expired verification token');
        }
        const user = await this.usersService.findById(userToken.userId);
        if (!user) {
            throw new common_1.BadRequestException('User not found');
        }
        if (user.emailVerified) {
            throw new common_1.BadRequestException('Email is already verified');
        }
        await this.usersService.update(user.id, {
            emailVerified: true,
        });
        await this.tokensService.deleteByToken(token);
        try {
            const event = {
                userId: user.id,
                email: user.email,
            };
            await this.kafkaProducer.emit(shared_1.IDENTITY_EVENTS.USER_VERIFIED, event);
        }
        catch (error) {
            console.error('Failed to emit user.verified event:', error);
        }
    }
};
exports.VerifyEmailUseCase = VerifyEmailUseCase;
exports.VerifyEmailUseCase = VerifyEmailUseCase = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [users_service_1.UsersService,
        tokens_service_1.TokensService,
        messaging_1.KafkaProducerService])
], VerifyEmailUseCase);
//# sourceMappingURL=verify-email.use-case.js.map