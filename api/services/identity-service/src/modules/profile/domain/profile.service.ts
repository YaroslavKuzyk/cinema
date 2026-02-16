import { Injectable } from '@nestjs/common';
import { ID, IProfileData, ICreateProfileData, IUpdateProfileData } from '@cinema/shared';
import {
  GetProfileUseCase,
  CreateProfileUseCase,
  UpdateProfileUseCase,
} from '../use-cases';

@Injectable()
export class ProfileService {
  constructor(
    private readonly getProfileUseCase: GetProfileUseCase,
    private readonly createProfileUseCase: CreateProfileUseCase,
    private readonly updateProfileUseCase: UpdateProfileUseCase,
  ) {}

  async getProfile(userId: ID): Promise<IProfileData | null> {
    return this.getProfileUseCase.execute(userId);
  }

  async createProfile(data: ICreateProfileData): Promise<IProfileData> {
    return this.createProfileUseCase.execute(data);
  }

  async updateProfile(userId: ID, data: IUpdateProfileData): Promise<IProfileData> {
    return this.updateProfileUseCase.execute(userId, data);
  }
}
