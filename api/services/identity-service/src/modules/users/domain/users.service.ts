import { Injectable } from '@nestjs/common';
import { IUsersGateway } from './users.gateway';
import { ID, IUserWithPassword, ICreateUserData, IUpdateUserData } from '@cinema/shared';

@Injectable()
export class UsersService {
  constructor(private readonly usersGateway: IUsersGateway) {}

  async findById(id: ID): Promise<IUserWithPassword | null> {
    return this.usersGateway.findById(id);
  }

  async findByEmail(email: string): Promise<IUserWithPassword | null> {
    return this.usersGateway.findByEmail(email);
  }

  async create(data: ICreateUserData): Promise<IUserWithPassword> {
    return this.usersGateway.create(data);
  }

  async update(id: ID, data: IUpdateUserData): Promise<IUserWithPassword> {
    return this.usersGateway.update(id, data);
  }

  async delete(id: ID): Promise<void> {
    return this.usersGateway.delete(id);
  }
}
