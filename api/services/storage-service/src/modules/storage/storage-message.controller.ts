import { Controller, Logger } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import {
  STORAGE_PATTERNS,
  IKafkaRequest,
  IKafkaResponse,
  createKafkaSuccess,
  createKafkaError,
} from '@cinema/shared';
import { StorageService } from './domain/storage.service';
import { GetUploadUrlDto, GetDownloadUrlDto } from './dtos';

@Controller()
export class StorageMessageController {
  private readonly logger = new Logger(StorageMessageController.name);

  constructor(private readonly storageService: StorageService) {}

  @MessagePattern(STORAGE_PATTERNS.GET_UPLOAD_URL)
  async getUploadUrl(
    @Payload() payload: IKafkaRequest<GetUploadUrlDto>,
  ): Promise<IKafkaResponse> {
    try {
      const result = await this.storageService.getUploadUrl(
        payload.data.key,
        payload.data.contentType,
        payload.data.expiresIn,
      );
      return createKafkaSuccess(result);
    } catch (error: any) {
      this.logger.error(`GetUploadUrl error: ${error.message}`);
      return createKafkaError(error.status || 500, error.message);
    }
  }

  @MessagePattern(STORAGE_PATTERNS.GET_DOWNLOAD_URL)
  async getDownloadUrl(
    @Payload() payload: IKafkaRequest<GetDownloadUrlDto>,
  ): Promise<IKafkaResponse> {
    try {
      const result = await this.storageService.getDownloadUrl(
        payload.data.key,
        payload.data.expiresIn,
      );
      return createKafkaSuccess(result);
    } catch (error: any) {
      this.logger.error(`GetDownloadUrl error: ${error.message}`);
      return createKafkaError(error.status || 500, error.message);
    }
  }

  @MessagePattern(STORAGE_PATTERNS.DELETE)
  async delete(
    @Payload() payload: IKafkaRequest<{ key: string }>,
  ): Promise<IKafkaResponse> {
    try {
      const result = await this.storageService.delete(payload.data.key);
      return createKafkaSuccess(result);
    } catch (error: any) {
      this.logger.error(`Delete error: ${error.message}`);
      return createKafkaError(error.status || 500, error.message);
    }
  }
}
