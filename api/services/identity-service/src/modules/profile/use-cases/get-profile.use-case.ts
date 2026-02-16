import { Injectable } from '@nestjs/common';
import { ID, IProfileData } from '@cinema/shared';
import { IProfileGateway } from '../domain/profile.gateway';

@Injectable()
export class GetProfileUseCase {
  constructor(private readonly profileGateway: IProfileGateway) {}

  async execute(userId: ID): Promise<IProfileData | null> {
    return this.profileGateway.findByUserId(userId);
  }
}
