export interface IEmailOptions {
    to: string;
    subject: string;
    html?: string;
    text?: string;
}
export interface ITemplateEmailOptions {
    to: string;
    template: EEmailTemplate;
    data: Record<string, unknown>;
}
export declare enum EEmailTemplate {
    WELCOME = "welcome",
    EMAIL_VERIFICATION = "email-verification",
    PASSWORD_RESET = "password-reset"
}
export interface IEmailResult {
    success: boolean;
    messageId?: string;
    error?: string;
}
