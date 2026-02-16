import { ProfileService } from './domain/profile.service';
import { UpdateProfileDto, ProfileResponseDto } from './dtos';
export declare class ProfileController {
    private readonly profileService;
    constructor(profileService: ProfileService);
    getProfile(userId: string): Promise<ProfileResponseDto | null>;
    updateProfile(userId: string, dto: UpdateProfileDto): Promise<ProfileResponseDto>;
}
