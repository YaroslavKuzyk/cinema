import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { EmailService } from './domain/email.service';
import { IEmailGateway } from './domain/email.gateway';
import { ResendGateway } from './data/resend.gateway';
import { TemplateService } from './domain/template.service';

@Module({
  imports: [ConfigModule],
  providers: [
    EmailService,
    TemplateService,
    {
      provide: IEmailGateway,
      useClass: ResendGateway,
    },
  ],
  exports: [EmailService],
})
export class EmailModule {}
