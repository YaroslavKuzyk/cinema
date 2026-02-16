import { ID } from './user.types';
export declare enum ETokenType {
    EMAIL_VERIFICATION = "EMAIL_VERIFICATION",
    PASSWORD_RESET = "PASSWORD_RESET",
    REFRESH_TOKEN = "REFRESH_TOKEN"
}
export interface ITokenData {
    id: ID;
    userId: ID;
    type: ETokenType;
    token: string;
    expiresAt: Date;
    createdAt: Date;
    deviceInfo?: string;
    ipAddress?: string;
    lastUsed?: Date;
}
export interface ICreateTokenData {
    userId: ID;
    type: ETokenType;
    token: string;
    expiresAt: Date;
    deviceInfo?: string;
    ipAddress?: string;
}
export interface IUpdateTokenData {
    lastUsed?: Date;
    expiresAt?: Date;
}
