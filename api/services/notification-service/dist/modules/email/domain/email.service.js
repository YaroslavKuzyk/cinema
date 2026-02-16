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
var EmailService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmailService = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const shared_1 = require("@cinema/shared");
const email_gateway_1 = require("./email.gateway");
const template_service_1 = require("./template.service");
let EmailService = EmailService_1 = class EmailService {
    emailGateway;
    templateService;
    configService;
    logger = new common_1.Logger(EmailService_1.name);
    constructor(emailGateway, templateService, configService) {
        this.emailGateway = emailGateway;
        this.templateService = templateService;
        this.configService = configService;
    }
    async sendWelcomeEmail(to, userName, verificationToken) {
        const frontendUrl = this.configService.getOrThrow('FRONTEND_URL');
        const verificationLink = `${frontendUrl}/verify-email?token=${verificationToken}`;
        const html = this.templateService.render(shared_1.EEmailTemplate.WELCOME, {
            userName,
            verificationLink,
            appUrl: frontendUrl,
        });
        this.logger.log(`Sending welcome email to ${to}`);
        return this.emailGateway.sendEmail({
            to,
            subject: 'Welcome to Cinema!',
            html,
        });
    }
    async sendEmailVerification(to, userName, verificationToken) {
        const frontendUrl = this.configService.getOrThrow('FRONTEND_URL');
        const verificationLink = `${frontendUrl}/verify-email?token=${verificationToken}`;
        const html = this.templateService.render(shared_1.EEmailTemplate.EMAIL_VERIFICATION, {
            userName,
            verificationLink,
        });
        this.logger.log(`Sending email verification to ${to}`);
        return this.emailGateway.sendEmail({
            to,
            subject: 'Verify your email - Cinema',
            html,
        });
    }
    async sendPasswordResetEmail(to, userName, resetToken) {
        const frontendUrl = this.configService.getOrThrow('FRONTEND_URL');
        const resetLink = `${frontendUrl}/reset-password?token=${resetToken}`;
        const html = this.templateService.render(shared_1.EEmailTemplate.PASSWORD_RESET, {
            userName,
            resetLink,
        });
        this.logger.log(`Sending password reset email to ${to}`);
        return this.emailGateway.sendEmail({
            to,
            subject: 'Password Reset - Cinema',
            html,
        });
    }
};
exports.EmailService = EmailService;
exports.EmailService = EmailService = EmailService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [email_gateway_1.IEmailGateway,
        template_service_1.TemplateService,
        config_1.ConfigService])
], EmailService);
//# sourceMappingURL=email.service.js.map