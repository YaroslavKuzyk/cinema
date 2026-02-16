import { Injectable } from '@nestjs/common';
import { IPresignedUrl, IStorageResult } from '@cinema/shared';
import { IStorageGateway } from './storage.gateway';

@Injectable()
export class StorageService {
  constructor(private readonly storageGateway: IStorageGateway) {}

  async getUploadUrl(
    key: string,
    contentType: string,
    expiresIn?: number,
  ): Promise<IPresignedUrl> {
    return this.storageGateway.getUploadUrl(key, contentType, expiresIn);
  }

  async getDownloadUrl(key: string, expiresIn?: number): Promise<IPresignedUrl> {
    return this.storageGateway.getDownloadUrl(key, expiresIn);
  }

  getPublicUrl(key: string): string {
    return this.storageGateway.getPublicUrl(key);
  }

  async delete(key: string): Promise<IStorageResult> {
    try {
      await this.storageGateway.delete(key);
      return { success: true, key };
    } catch (error) {
      return {
        success: false,
        key,
        error: error instanceof Error ? error.message : 'Unknown error',
      };
    }
  }
}
