import { ID, IProfileData, IUpdateProfileData } from '@cinema/shared';
import { IProfileGateway } from '../domain/profile.gateway';
export declare class UpdateProfileUseCase {
    private readonly profileGateway;
    constructor(profileGateway: IProfileGateway);
    execute(userId: ID, data: IUpdateProfileData): Promise<IProfileData>;
}
