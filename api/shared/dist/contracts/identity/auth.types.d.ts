import { ID, IUserData } from './user.types';
export interface IJwtPayload {
    sub: ID;
    email: string;
    type: 'access' | 'refresh';
}
export interface IAuthTokens {
    accessToken: string;
    refreshToken: string;
}
export interface IAuthResponse {
    user: IUserData;
    tokens: IAuthTokens;
}
export interface ILoginCredentials {
    email: string;
    password: string;
}
export interface IRegisterData {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    phoneNumber: string;
}
