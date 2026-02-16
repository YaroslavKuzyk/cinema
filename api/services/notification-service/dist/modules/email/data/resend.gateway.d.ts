import { ConfigService } from '@nestjs/config';
import { IEmailResult } from '@cinema/shared';
import { IEmailGateway, ISendEmailDto } from '../domain/email.gateway';
export declare class ResendGateway implements IEmailGateway {
    private readonly configService;
    private readonly logger;
    private resend;
    private defaultFrom;
    constructor(configService: ConfigService);
    sendEmail(data: ISendEmailDto): Promise<IEmailResult>;
}
