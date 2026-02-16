import { IPresignedUrl } from '@cinema/shared';

export abstract class IStorageGateway {
  abstract getUploadUrl(
    key: string,
    contentType: string,
    expiresIn?: number,
  ): Promise<IPresignedUrl>;

  abstract getDownloadUrl(key: string, expiresIn?: number): Promise<IPresignedUrl>;

  abstract getPublicUrl(key: string): string;

  abstract delete(key: string): Promise<void>;
}
