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
var KafkaConsumerController_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.KafkaConsumerController = void 0;
const common_1 = require("@nestjs/common");
const microservices_1 = require("@nestjs/microservices");
const shared_1 = require("@cinema/shared");
const email_service_1 = require("../../modules/email/domain/email.service");
let KafkaConsumerController = KafkaConsumerController_1 = class KafkaConsumerController {
    emailService;
    logger = new common_1.Logger(KafkaConsumerController_1.name);
    constructor(emailService) {
        this.emailService = emailService;
    }
    async handleUserCreated(data, context) {
        const topic = context.getTopic();
        this.logger.log(`Received event from topic ${topic}: user.created for ${data.email}`);
        try {
            const userName = `${data.firstName} ${data.lastName}`.trim() || data.email;
            const result = await this.emailService.sendWelcomeEmail(data.email, userName, data.verificationToken);
            if (result.success) {
                this.logger.log(`Welcome email sent successfully to ${data.email}, messageId: ${result.messageId}`);
            }
            else {
                this.logger.error(`Failed to send welcome email to ${data.email}: ${result.error}`);
            }
        }
        catch (error) {
            const message = error instanceof Error ? error.message : 'Unknown error';
            this.logger.error(`Error handling user.created event: ${message}`);
        }
    }
    async handlePasswordResetRequested(data, context) {
        const topic = context.getTopic();
        this.logger.log(`Received event from topic ${topic}: password.reset.requested for ${data.email}`);
        try {
            const result = await this.emailService.sendPasswordResetEmail(data.email, data.firstName, data.resetToken);
            if (result.success) {
                this.logger.log(`Password reset email sent successfully to ${data.email}, messageId: ${result.messageId}`);
            }
            else {
                this.logger.error(`Failed to send password reset email to ${data.email}: ${result.error}`);
            }
        }
        catch (error) {
            const message = error instanceof Error ? error.message : 'Unknown error';
            this.logger.error(`Error handling password.reset.requested event: ${message}`);
        }
    }
    async handleUserVerified(data, context) {
        const topic = context.getTopic();
        this.logger.log(`Received event from topic ${topic}: user.verified for ${data.email}`);
        this.logger.log(`User ${data.email} has been verified successfully`);
    }
};
exports.KafkaConsumerController = KafkaConsumerController;
__decorate([
    (0, microservices_1.EventPattern)(shared_1.IDENTITY_EVENTS.USER_CREATED),
    __param(0, (0, microservices_1.Payload)()),
    __param(1, (0, microservices_1.Ctx)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, microservices_1.KafkaContext]),
    __metadata("design:returntype", Promise)
], KafkaConsumerController.prototype, "handleUserCreated", null);
__decorate([
    (0, microservices_1.EventPattern)(shared_1.IDENTITY_EVENTS.PASSWORD_RESET_REQUESTED),
    __param(0, (0, microservices_1.Payload)()),
    __param(1, (0, microservices_1.Ctx)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, microservices_1.KafkaContext]),
    __metadata("design:returntype", Promise)
], KafkaConsumerController.prototype, "handlePasswordResetRequested", null);
__decorate([
    (0, microservices_1.EventPattern)(shared_1.IDENTITY_EVENTS.USER_VERIFIED),
    __param(0, (0, microservices_1.Payload)()),
    __param(1, (0, microservices_1.Ctx)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, microservices_1.KafkaContext]),
    __metadata("design:returntype", Promise)
], KafkaConsumerController.prototype, "handleUserVerified", null);
exports.KafkaConsumerController = KafkaConsumerController = KafkaConsumerController_1 = __decorate([
    (0, common_1.Controller)(),
    __metadata("design:paramtypes", [email_service_1.EmailService])
], KafkaConsumerController);
//# sourceMappingURL=kafka-consumer.controller.js.map