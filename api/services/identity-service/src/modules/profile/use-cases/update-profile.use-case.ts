import { Injectable, NotFoundException } from '@nestjs/common';
import { ID, IProfileData, IUpdateProfileData } from '@cinema/shared';
import { IProfileGateway } from '../domain/profile.gateway';

@Injectable()
export class UpdateProfileUseCase {
  constructor(private readonly profileGateway: IProfileGateway) {}

  async execute(userId: ID, data: IUpdateProfileData): Promise<IProfileData> {
    const existingProfile = await this.profileGateway.findByUserId(userId);
    if (!existingProfile) {
      throw new NotFoundException('Profile not found');
    }

    return this.profileGateway.update(userId, data);
  }
}
