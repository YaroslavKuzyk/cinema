import { PrismaService } from '@/infrastructure/database/prisma.service';
import { IUsersGateway } from '../domain/users.gateway';
import { ID, ICreateUserData, IUpdateUserData, IUserWithPassword } from '@cinema/shared';
import { UsersMapper } from './users.mapper';
export declare class UsersGateway implements IUsersGateway {
    private readonly prisma;
    private readonly usersMapper;
    constructor(prisma: PrismaService, usersMapper: UsersMapper);
    findById(id: ID): Promise<IUserWithPassword | null>;
    findByEmail(email: string): Promise<IUserWithPassword | null>;
    create(data: ICreateUserData): Promise<IUserWithPassword>;
    update(id: ID, data: IUpdateUserData): Promise<IUserWithPassword>;
    delete(id: ID): Promise<void>;
}
