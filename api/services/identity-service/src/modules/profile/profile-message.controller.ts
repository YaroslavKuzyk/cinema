import { Controller, Logger } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import {
  IDENTITY_PATTERNS,
  IKafkaRequest,
  IKafkaResponse,
  IUpdateProfileData,
  createKafkaSuccess,
  createKafkaError,
} from '@cinema/shared';
import { ProfileService } from './domain/profile.service';

@Controller()
export class ProfileMessageController {
  private readonly logger = new Logger(ProfileMessageController.name);

  constructor(private readonly profileService: ProfileService) {}

  @MessagePattern(IDENTITY_PATTERNS.PROFILE_GET)
  async getProfile(
    @Payload() payload: IKafkaRequest<void>,
  ): Promise<IKafkaResponse> {
    try {
      if (!payload.context.userId) {
        return createKafkaError(401, 'Unauthorized');
      }

      const profile = await this.profileService.getProfile(payload.context.userId);
      return createKafkaSuccess(profile);
    } catch (error: any) {
      this.logger.error(`Get profile error: ${error.message}`);
      return createKafkaError(error.status || 500, error.message);
    }
  }

  @MessagePattern(IDENTITY_PATTERNS.PROFILE_UPDATE)
  async updateProfile(
    @Payload() payload: IKafkaRequest<IUpdateProfileData>,
  ): Promise<IKafkaResponse> {
    try {
      if (!payload.context.userId) {
        return createKafkaError(401, 'Unauthorized');
      }

      const profile = await this.profileService.updateProfile(
        payload.context.userId,
        payload.data,
      );
      return createKafkaSuccess(profile);
    } catch (error: any) {
      this.logger.error(`Update profile error: ${error.message}`);
      return createKafkaError(error.status || 500, error.message);
    }
  }
}
