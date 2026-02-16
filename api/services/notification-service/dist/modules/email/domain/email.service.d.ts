import { ConfigService } from '@nestjs/config';
import { IEmailResult } from '@cinema/shared';
import { IEmailGateway } from './email.gateway';
import { TemplateService } from './template.service';
export declare class EmailService {
    private readonly emailGateway;
    private readonly templateService;
    private readonly configService;
    private readonly logger;
    constructor(emailGateway: IEmailGateway, templateService: TemplateService, configService: ConfigService);
    sendWelcomeEmail(to: string, userName: string, verificationToken: string): Promise<IEmailResult>;
    sendEmailVerification(to: string, userName: string, verificationToken: string): Promise<IEmailResult>;
    sendPasswordResetEmail(to: string, userName: string, resetToken: string): Promise<IEmailResult>;
}
