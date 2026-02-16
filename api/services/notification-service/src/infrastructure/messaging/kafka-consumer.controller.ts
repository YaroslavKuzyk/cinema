import { Controller, Logger } from '@nestjs/common';
import { EventPattern, Payload, Ctx, KafkaContext } from '@nestjs/microservices';
import {
  IDENTITY_EVENTS,
  IUserCreatedEvent,
  IUserVerifiedEvent,
  IPasswordResetRequestedEvent,
} from '@cinema/shared';
import { EmailService } from '../../modules/email/domain/email.service';

@Controller()
export class KafkaConsumerController {
  private readonly logger = new Logger(KafkaConsumerController.name);

  constructor(private readonly emailService: EmailService) {}

  @EventPattern(IDENTITY_EVENTS.USER_CREATED)
  async handleUserCreated(
    @Payload() data: IUserCreatedEvent,
    @Ctx() context: KafkaContext,
  ): Promise<void> {
    const topic = context.getTopic();
    this.logger.log(`Received event from topic ${topic}: user.created for ${data.email}`);

    try {
      const userName = `${data.firstName} ${data.lastName}`.trim() || data.email;

      const result = await this.emailService.sendWelcomeEmail(
        data.email,
        userName,
        data.verificationToken,
      );

      if (result.success) {
        this.logger.log(`Welcome email sent successfully to ${data.email}, messageId: ${result.messageId}`);
      } else {
        this.logger.error(`Failed to send welcome email to ${data.email}: ${result.error}`);
      }
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Unknown error';
      this.logger.error(`Error handling user.created event: ${message}`);
    }
  }

  @EventPattern(IDENTITY_EVENTS.PASSWORD_RESET_REQUESTED)
  async handlePasswordResetRequested(
    @Payload() data: IPasswordResetRequestedEvent,
    @Ctx() context: KafkaContext,
  ): Promise<void> {
    const topic = context.getTopic();
    this.logger.log(`Received event from topic ${topic}: password.reset.requested for ${data.email}`);

    try {
      const result = await this.emailService.sendPasswordResetEmail(
        data.email,
        data.firstName,
        data.resetToken,
      );

      if (result.success) {
        this.logger.log(`Password reset email sent successfully to ${data.email}, messageId: ${result.messageId}`);
      } else {
        this.logger.error(`Failed to send password reset email to ${data.email}: ${result.error}`);
      }
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Unknown error';
      this.logger.error(`Error handling password.reset.requested event: ${message}`);
    }
  }

  @EventPattern(IDENTITY_EVENTS.USER_VERIFIED)
  async handleUserVerified(
    @Payload() data: IUserVerifiedEvent,
    @Ctx() context: KafkaContext,
  ): Promise<void> {
    const topic = context.getTopic();
    this.logger.log(`Received event from topic ${topic}: user.verified for ${data.email}`);

    // Optional: Send confirmation email that the account is now verified
    // This is just logged for now, but could be extended to send a confirmation email
    this.logger.log(`User ${data.email} has been verified successfully`);
  }
}
