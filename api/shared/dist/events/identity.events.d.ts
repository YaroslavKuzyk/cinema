import { ID } from '../contracts/identity';
export declare const IDENTITY_EVENTS: {
    readonly USER_CREATED: "user.created";
    readonly USER_VERIFIED: "user.verified";
    readonly USER_UPDATED: "user.updated";
    readonly USER_DELETED: "user.deleted";
    readonly PASSWORD_RESET_REQUESTED: "password.reset.requested";
    readonly PASSWORD_CHANGED: "password.changed";
};
export interface IUserCreatedEvent {
    userId: ID;
    email: string;
    firstName: string;
    lastName: string;
    verificationToken: string;
}
export interface IUserVerifiedEvent {
    userId: ID;
    email: string;
}
export interface IPasswordResetRequestedEvent {
    userId: ID;
    email: string;
    firstName: string;
    resetToken: string;
}
export interface IPasswordChangedEvent {
    userId: ID;
    email: string;
}
