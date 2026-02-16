import { Injectable } from '@nestjs/common';
import { PrismaService } from '@/infrastructure/database/prisma.service';
import { IUsersGateway } from '../domain/users.gateway';
import { ID, ICreateUserData, IUpdateUserData, IUserWithPassword } from '@cinema/shared';
import { UsersMapper } from './users.mapper';

@Injectable()
export class UsersGateway implements IUsersGateway {
  constructor(
    private readonly prisma: PrismaService,
    private readonly usersMapper: UsersMapper,
  ) {}

  async findById(id: ID): Promise<IUserWithPassword | null> {
    const user = await this.prisma.user.findUnique({ where: { id } });
    return user ? this.usersMapper.toDataWithPassword(user) : null;
  }

  async findByEmail(email: string): Promise<IUserWithPassword | null> {
    const user = await this.prisma.user.findUnique({ where: { email } });
    return user ? this.usersMapper.toDataWithPassword(user) : null;
  }

  async create(data: ICreateUserData): Promise<IUserWithPassword> {
    const user = await this.prisma.user.create({
      data: this.usersMapper.toCreate(data),
    });
    return this.usersMapper.toDataWithPassword(user);
  }

  async update(id: ID, data: IUpdateUserData): Promise<IUserWithPassword> {
    const user = await this.prisma.user.update({
      where: { id },
      data: this.usersMapper.toUpdate(data),
    });
    return this.usersMapper.toDataWithPassword(user);
  }

  async delete(id: ID): Promise<void> {
    await this.prisma.user.delete({ where: { id } });
  }
}
