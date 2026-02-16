import { ID, EUserType } from '@cinema/shared';
export interface ITokenPayload {
    sub: ID;
    email: string;
}
export interface ITokens {
    accessToken: string;
    refreshToken: string;
}
export interface IUserInfo {
    id: ID;
    email: string;
    phoneNumber: string;
    firstName: string;
    lastName: string;
    userType: EUserType;
    emailVerified: boolean;
}
export interface IAuthResponse extends ITokens {
    user: IUserInfo;
}
export interface IRegisterData {
    email: string;
    phoneNumber: string;
    firstName: string;
    lastName: string;
    password: string;
}
export interface ILoginData {
    email: string;
    password: string;
}
export interface IAuthResult {
    accessToken: string;
    refreshToken: string;
    user: IUserInfo;
}
export interface ITokensResult {
    accessToken: string;
    refreshToken: string;
}
export interface IForgotPasswordData {
    email: string;
}
export interface IResetPasswordData {
    token: string;
    password: string;
}
