export const NOTIFICATION_EVENTS = {
  EMAIL_SENT: 'email.sent',
  EMAIL_FAILED: 'email.failed',
} as const;

export interface IEmailSentEvent {
  to: string;
  template: string;
  messageId: string;
}

export interface IEmailFailedEvent {
  to: string;
  template: string;
  error: string;
}
