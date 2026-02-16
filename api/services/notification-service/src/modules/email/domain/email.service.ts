import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { IEmailResult, EEmailTemplate } from '@cinema/shared';
import { IEmailGateway } from './email.gateway';
import { TemplateService } from './template.service';

@Injectable()
export class EmailService {
  private readonly logger = new Logger(EmailService.name);

  constructor(
    private readonly emailGateway: IEmailGateway,
    private readonly templateService: TemplateService,
    private readonly configService: ConfigService,
  ) {}

  async sendWelcomeEmail(
    to: string,
    userName: string,
    verificationToken: string,
  ): Promise<IEmailResult> {
    const frontendUrl = this.configService.getOrThrow<string>('FRONTEND_URL');
    const verificationLink = `${frontendUrl}/verify-email?token=${verificationToken}`;

    const html = this.templateService.render(EEmailTemplate.WELCOME, {
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

  async sendEmailVerification(
    to: string,
    userName: string,
    verificationToken: string,
  ): Promise<IEmailResult> {
    const frontendUrl = this.configService.getOrThrow<string>('FRONTEND_URL');
    const verificationLink = `${frontendUrl}/verify-email?token=${verificationToken}`;

    const html = this.templateService.render(EEmailTemplate.EMAIL_VERIFICATION, {
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

  async sendPasswordResetEmail(
    to: string,
    userName: string,
    resetToken: string,
  ): Promise<IEmailResult> {
    const frontendUrl = this.configService.getOrThrow<string>('FRONTEND_URL');
    const resetLink = `${frontendUrl}/reset-password?token=${resetToken}`;

    const html = this.templateService.render(EEmailTemplate.PASSWORD_RESET, {
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
}
