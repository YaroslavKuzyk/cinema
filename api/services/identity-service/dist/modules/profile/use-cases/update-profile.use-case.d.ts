import { ID, IProfileData, IUpdateProfileData } from '@cinema/shared';
import { IProfileGateway } from '../domain/profile.gateway';
import { UsersService } from '@/modules/users/domain/users.service';
export interface IUpdateProfileWithAvatarData extends IUpdateProfileData {
    avatarKey?: string | null;
}
export declare class UpdateProfileUseCase {
    private readonly profileGateway;
    private readonly usersService;
    constructor(profileGateway: IProfileGateway, usersService: UsersService);
    execute(userId: ID, data: IUpdateProfileWithAvatarData): Promise<IProfileData>;
}
