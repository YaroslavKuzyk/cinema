import { ID } from '@cinema/shared';
import { UsersService } from '@/modules/users/domain/users.service';
import { AuthMapper } from '../data/auth.mapper';
import { IUserInfo } from '../domain/auth.types';
export declare class GetCurrentUserUseCase {
    private readonly usersService;
    private readonly authMapper;
    constructor(usersService: UsersService, authMapper: AuthMapper);
    execute(userId: ID): Promise<IUserInfo>;
}
