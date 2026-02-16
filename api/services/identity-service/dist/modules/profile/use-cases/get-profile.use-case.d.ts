import { ID, IProfileData } from '@cinema/shared';
import { IProfileGateway } from '../domain/profile.gateway';
export declare class GetProfileUseCase {
    private readonly profileGateway;
    constructor(profileGateway: IProfileGateway);
    execute(userId: ID): Promise<IProfileData | null>;
}
