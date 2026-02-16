import { IUsersGateway } from './users.gateway';
import { ID, IUserWithPassword, ICreateUserData, IUpdateUserData } from '@cinema/shared';
export declare class UsersService {
    private readonly usersGateway;
    constructor(usersGateway: IUsersGateway);
    findById(id: ID): Promise<IUserWithPassword | null>;
    findByEmail(email: string): Promise<IUserWithPassword | null>;
    create(data: ICreateUserData): Promise<IUserWithPassword>;
    update(id: ID, data: IUpdateUserData): Promise<IUserWithPassword>;
    delete(id: ID): Promise<void>;
}
