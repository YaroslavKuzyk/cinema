import { ID, IProfileData, ICreateProfileData, IUpdateProfileData } from '@cinema/shared';
export declare abstract class IProfileGateway {
    abstract findByUserId(userId: ID): Promise<IProfileData | null>;
    abstract create(data: ICreateProfileData): Promise<IProfileData>;
    abstract update(userId: ID, data: IUpdateProfileData): Promise<IProfileData>;
    abstract delete(userId: ID): Promise<void>;
}
