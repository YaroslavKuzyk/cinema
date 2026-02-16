import { Controller, Logger } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import {
  IDENTITY_PATTERNS,
  IKafkaRequest,
  IKafkaResponse,
  createKafkaSuccess,
  createKafkaError,
} from '@cinema/shared';
import { UsersService } from './domain/users.service';

@Controller()
export class UsersMessageController {
  private readonly logger = new Logger(UsersMessageController.name);

  constructor(private readonly usersService: UsersService) {}

  @MessagePattern(IDENTITY_PATTERNS.USER_GET_BY_ID)
  async getUserById(
    @Payload() payload: IKafkaRequest<{ id: string }>,
  ): Promise<IKafkaResponse> {
    try {
      const user = await this.usersService.findById(payload.data.id);

      if (!user) {
        return createKafkaError(404, 'User not found');
      }

      // Remove password from response
      const { password, ...userData } = user;
      return createKafkaSuccess(userData);
    } catch (error: any) {
      this.logger.error(`Get user by ID error: ${error.message}`);
      return createKafkaError(error.status || 500, error.message);
    }
  }
}
