import { IEmailResult } from '@cinema/shared';

export interface ISendEmailDto {
  to: string | string[];
  subject: string;
  from?: string;
  replyTo?: string;
  html?: string;
  text?: string;
}

export abstract class IEmailGateway {
  abstract sendEmail(data: ISendEmailDto): Promise<IEmailResult>;
}
