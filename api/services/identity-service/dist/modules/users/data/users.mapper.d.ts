import { User, Prisma } from '@prisma/client';
import { IUserData, IUserWithPassword, ICreateUserData, IUpdateUserData } from '@cinema/shared';
export declare class UsersMapper {
    toData(data: User): IUserData;
    toDataWithPassword(data: User): IUserWithPassword;
    toCreate(data: ICreateUserData): Prisma.UserCreateInput;
    toUpdate(data: IUpdateUserData): Prisma.UserUpdateInput;
}
