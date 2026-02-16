import { Injectable } from '@nestjs/common';
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
}

@Injectable()
export class AuthMapper {
  toUserInfo(user: IUserInput): IUserInfo {
    return {
      id: user.id,
      email: user.email,
      phoneNumber: user.phoneNumber,
      firstName: user.firstName,
      lastName: user.lastName,
      userType: user.userType,
      emailVerified: user.emailVerified,
    };
  }

  toAuthResult(
    tokens: { accessToken: string; refreshToken: string },
    user: IUserInput,
  ): IAuthResult {
    return {
      accessToken: tokens.accessToken,
      refreshToken: tokens.refreshToken,
      user: this.toUserInfo(user),
    };
  }

  toTokensResult(tokens: {
    accessToken: string;
    refreshToken: string;
  }): ITokensResult {
    return {
      accessToken: tokens.accessToken,
      refreshToken: tokens.refreshToken,
    };
  }
}
