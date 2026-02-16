import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Resend } from 'resend';
import { IEmailResult } from '@cinema/shared';
import { IEmailGateway, ISendEmailDto } from '../domain/email.gateway';

@Injectable()
export class ResendGateway implements IEmailGateway {
  private readonly logger = new Logger(ResendGateway.name);
  private resend: Resend;
  private defaultFrom: string;

  constructor(private readonly configService: ConfigService) {
    const apiKey = this.configService.getOrThrow<string>('RESEND_API_KEY');
    this.resend = new Resend(apiKey);
    this.defaultFrom = this.configService.getOrThrow<string>('FROM_EMAIL');
  }

  async sendEmail(data: ISendEmailDto): Promise<IEmailResult> {
    try {
      const emailOptions = {
        from: data.from || this.defaultFrom,
        to: data.to,
        subject: data.subject,
        ...(data.html && { html: data.html }),
        ...(data.text && { text: data.text }),
        ...(data.replyTo && { replyTo: data.replyTo }),
      };

      const result = await this.resend.emails.send(
        emailOptions as Parameters<typeof this.resend.emails.send>[0],
      );

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
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Unknown error';
      this.logger.error(`Email sending failed: ${message}`);
      return {
        success: false,
        error: message,
      };
    }
  }
}
