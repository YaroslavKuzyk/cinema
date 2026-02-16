export type ID = string;

export enum EUserType {
  CUSTOMER = 'CUSTOMER',
  ADMIN = 'ADMIN',
}

export interface IUserData {
  id: ID;
  email: string;
  phoneNumber: string;
  firstName: string;
  lastName: string;
  userType: EUserType;
  emailVerified: boolean;
  avatarKey: string | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface IUserWithPassword extends IUserData {
  password: string;
}

export interface ICreateUserData {
  email: string;
  phoneNumber: string;
  firstName: string;
  lastName: string;
  userType: EUserType;
  password: string;
}

export interface IUpdateUserData
  extends Partial<Omit<ICreateUserData, 'password'>> {
  password?: string;
  emailVerified?: boolean;
  avatarKey?: string | null;
}
