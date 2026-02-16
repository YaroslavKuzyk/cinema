import { ID, IProfileData, ICreateProfileData, IUpdateProfileData } from '@cinema/shared';
import { GetProfileUseCase, CreateProfileUseCase, UpdateProfileUseCase } from '../use-cases';
export declare class ProfileService {
    private readonly getProfileUseCase;
    private readonly createProfileUseCase;
    private readonly updateProfileUseCase;
    constructor(getProfileUseCase: GetProfileUseCase, createProfileUseCase: CreateProfileUseCase, updateProfileUseCase: UpdateProfileUseCase);
    getProfile(userId: ID): Promise<IProfileData | null>;
    createProfile(data: ICreateProfileData): Promise<IProfileData>;
    updateProfile(userId: ID, data: IUpdateProfileData): Promise<IProfileData>;
}
