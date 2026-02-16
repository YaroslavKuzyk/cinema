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
var ResendGateway_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.ResendGateway = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const resend_1 = require("resend");
let ResendGateway = ResendGateway_1 = class ResendGateway {
    configService;
    logger = new common_1.Logger(ResendGateway_1.name);
    resend;
    defaultFrom;
    constructor(configService) {
        this.configService = configService;
        const apiKey = this.configService.getOrThrow('RESEND_API_KEY');
        this.resend = new resend_1.Resend(apiKey);
        this.defaultFrom = this.configService.getOrThrow('FROM_EMAIL');
    }
    async sendEmail(data) {
        try {
            const emailOptions = {
                from: data.from || this.defaultFrom,
                to: data.to,
                subject: data.subject,
                ...(data.html && { html: data.html }),
                ...(data.text && { text: data.text }),
                ...(data.replyTo && { replyTo: data.replyTo }),
            };
            const result = await this.resend.emails.send(emailOptions);
            if (result.error) {
                this.logger.error(`Failed to send email: ${result.error.message}`);
                return {
                    success: false,
                    error: result.error.message,
                };
            }
            this.logger.log(`Email sent successfully: ${result.data?.id}`);
            return {
                success: true,
                messageId: result.data?.id || '',
            };
        }
        catch (error) {
            const message = error instanceof Error ? error.message : 'Unknown error';
            this.logger.error(`Email sending failed: ${message}`);
            return {
                success: false,
                error: message,
            };
        }
    }
};
exports.ResendGateway = ResendGateway;
exports.ResendGateway = ResendGateway = ResendGateway_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_1.ConfigService])
], ResendGateway);
//# sourceMappingURL=resend.gateway.js.map