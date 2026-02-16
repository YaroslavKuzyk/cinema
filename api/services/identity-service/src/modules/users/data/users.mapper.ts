import { User, Prisma } from '@prisma/client';
import { Injectable } from '@nestjs/common';
import { IUserData, IUserWithPassword, ICreateUserData, IUpdateUserData, EUserType } from '@cinema/shared';
import { v4 as uuid } from 'uuid';

@Injectable()
export class UsersMapper {
  toData(data: User): IUserData {
    return {
      id: data.id,
      email: data.email,
      phoneNumber: data.phoneNumber,
      firstName: data.firstName,
      lastName: data.lastName,
      userType: data.userType as EUserType,
      emailVerified: data.emailVerified,
      avatarKey: data.avatarKey,
      createdAt: data.createdAt,
      updatedAt: data.updatedAt,
    };
  }

  toDataWithPassword(data: User): IUserWithPassword {
    return {
      ...this.toData(data),
      password: data.password,
    };
  }

  toCreate(data: ICreateUserData): Prisma.UserCreateInput {
    return {
      id: `user-${uuid()}`,
      email: data.email,
      phoneNumber: data.phoneNumber,
      firstName: data.firstName,
      lastName: data.lastName,
      userType: data.userType,
      password: data.password,
    };
  }

  toUpdate(data: IUpdateUserData): Prisma.UserUpdateInput {
    return {
      email: data.email,
      phoneNumber: data.phoneNumber,
      firstName: data.firstName,
      lastName: data.lastName,
      userType: data.userType,
      password: data.password,
      emailVerified: data.emailVerified,
      avatarKey: data.avatarKey,
    };
  }
}
