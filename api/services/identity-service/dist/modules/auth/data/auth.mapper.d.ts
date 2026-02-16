import { ID, EUserType } from '@cinema/shared';
import { IUserInfo, IAuthResult, ITokensResult } from '../domain/auth.types';
interface IUserInput {
    id: ID;
    email: string;
    phoneNumber: string;
    firstName: string;
    lastName: string;
    userType: EUserType;
    emailVerified: boolean;
    avatarKey: string | null;
}
export declare class AuthMapper {
    toUserInfo(user: IUserInput): IUserInfo;
    toAuthResult(tokens: {
        accessToken: string;
        refreshToken: string;
    }, user: IUserInput): IAuthResult;
    toTokensResult(tokens: {
        accessToken: string;
        refreshToken: string;
    }): ITokensResult;
}
export {};
