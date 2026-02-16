export declare const NOTIFICATION_EVENTS: {
    readonly EMAIL_SENT: "email.sent";
    readonly EMAIL_FAILED: "email.failed";
};
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
