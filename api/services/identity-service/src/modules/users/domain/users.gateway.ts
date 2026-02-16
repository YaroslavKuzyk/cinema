import {
  ID,
  IUserWithPassword,
  ICreateUserData,
  IUpdateUserData,
} from '@cinema/shared';

export abstract class IUsersGateway {
  abstract findById(id: ID): Promise<IUserWithPassword | null>;
  abstract findByEmail(email: string): Promise<IUserWithPassword | null>;
  abstract create(data: ICreateUserData): Promise<IUserWithPassword>;
  abstract update(id: ID, data: IUpdateUserData): Promise<IUserWithPassword>;
  abstract delete(id: ID): Promise<void>;
}
