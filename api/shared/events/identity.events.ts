import { ID } from '../contracts/identity';

export const IDENTITY_EVENTS = {
  USER_CREATED: 'user.created',
  USER_VERIFIED: 'user.verified',
  USER_UPDATED: 'user.updated',
  USER_DELETED: 'user.deleted',
  PASSWORD_RESET_REQUESTED: 'password.reset.requested',
  PASSWORD_CHANGED: 'password.changed',
} as const;

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
