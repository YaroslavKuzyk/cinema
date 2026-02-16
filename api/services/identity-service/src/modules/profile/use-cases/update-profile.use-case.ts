import { Injectable } from '@nestjs/common';
import { ID, IProfileData, IUpdateProfileData } from '@cinema/shared';
import { IProfileGateway } from '../domain/profile.gateway';
import { UsersService } from '@/modules/users/domain/users.service';

export interface IUpdateProfileWithAvatarData extends IUpdateProfileData {
  avatarKey?: string | null;
}

@Injectable()
export class UpdateProfileUseCase {
  constructor(
    private readonly profileGateway: IProfileGateway,
    private readonly usersService: UsersService,
  ) {}

  async execute(
    userId: ID,
    data: IUpdateProfileWithAvatarData,
  ): Promise<IProfileData> {
    let existingProfile = await this.profileGateway.findByUserId(userId);

    // Create profile if it doesn't exist (upsert behavior)
    if (!existingProfile) {
      existingProfile = await this.profileGateway.create({ userId });
    }

    // Update user avatarKey if provided
    if (data.avatarKey !== undefined) {
      await this.usersService.update(userId, { avatarKey: data.avatarKey });
    }

    // Extract profile-only fields
    const { avatarKey, ...profileData } = data;

    return this.profileGateway.update(userId, profileData);
  }
}
