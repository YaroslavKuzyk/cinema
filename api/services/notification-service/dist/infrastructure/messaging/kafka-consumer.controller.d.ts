import { KafkaContext } from '@nestjs/microservices';
import { IUserCreatedEvent, IUserVerifiedEvent, IPasswordResetRequestedEvent } from '@cinema/shared';
import { EmailService } from '../../modules/email/domain/email.service';
export declare class KafkaConsumerController {
    private readonly emailService;
    private readonly logger;
    constructor(emailService: EmailService);
    handleUserCreated(data: IUserCreatedEvent, context: KafkaContext): Promise<void>;
    handlePasswordResetRequested(data: IPasswordResetRequestedEvent, context: KafkaContext): Promise<void>;
    handleUserVerified(data: IUserVerifiedEvent, context: KafkaContext): Promise<void>;
}
