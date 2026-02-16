import { ID } from './user.types';

export interface IProfileData {
  userId: ID;
  keyword?: string;
  description?: string;
  state?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface ICreateProfileData {
  userId: ID;
  keyword?: string;
  description?: string;
  state?: string;
}

export interface IUpdateProfileData {
  keyword?: string;
  description?: string;
  state?: string;
}
