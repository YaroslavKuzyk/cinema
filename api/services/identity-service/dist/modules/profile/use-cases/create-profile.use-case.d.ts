import { IProfileData, ICreateProfileData } from '@cinema/shared';
import { IProfileGateway } from '../domain/profile.gateway';
export declare class CreateProfileUseCase {
    private readonly profileGateway;
    constructor(profileGateway: IProfileGateway);
    execute(data: ICreateProfileData): Promise<IProfileData>;
}
