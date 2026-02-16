import { Injectable } from '@nestjs/common';
import { Profile } from '@prisma/client';
import { IProfileData } from '@cinema/shared';

@Injectable()
export class ProfileMapper {
  toProfileData(profile: Profile): IProfileData {
    return {
      userId: profile.userId,
      keyword: profile.keyword ?? undefined,
      description: profile.description ?? undefined,
      state: profile.state ?? undefined,
      createdAt: profile.createdAt,
      updatedAt: profile.updatedAt,
    };
  }
}
