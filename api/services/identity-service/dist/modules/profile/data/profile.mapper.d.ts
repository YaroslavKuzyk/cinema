import { Profile } from '@prisma/client';
import { IProfileData } from '@cinema/shared';
export declare class ProfileMapper {
    toProfileData(profile: Profile): IProfileData;
}
