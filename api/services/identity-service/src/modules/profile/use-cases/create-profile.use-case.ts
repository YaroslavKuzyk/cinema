import { Injectable, ConflictException } from '@nestjs/common';
import { IProfileData, ICreateProfileData } from '@cinema/shared';
import { IProfileGateway } from '../domain/profile.gateway';

@Injectable()
export class CreateProfileUseCase {
  constructor(private readonly profileGateway: IProfileGateway) {}

  async execute(data: ICreateProfileData): Promise<IProfileData> {
    const existingProfile = await this.profileGateway.findByUserId(data.userId);
    if (existingProfile) {
      throw new ConflictException('Profile already exists for this user');
    }

    return this.profileGateway.create(data);
  }
}
