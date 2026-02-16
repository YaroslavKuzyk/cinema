import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {
  S3Client,
  PutObjectCommand,
  DeleteObjectCommand,
  GetObjectCommand,
} from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { IPresignedUrl } from '@cinema/shared';
import { IStorageGateway } from '../domain/storage.gateway';

@Injectable()
export class S3Gateway implements IStorageGateway {
  private readonly client: S3Client;
  private readonly bucket: string;
  private readonly region: string;
  private readonly logger = new Logger(S3Gateway.name);

  constructor(private readonly configService: ConfigService) {
    this.region = this.configService.getOrThrow('AWS_REGION');
    this.bucket = this.configService.getOrThrow('AWS_S3_BUCKET');

    this.client = new S3Client({
      region: this.region,
      credentials: {
        accessKeyId: this.configService.getOrThrow('AWS_ACCESS_KEY_ID'),
        secretAccessKey: this.configService.getOrThrow('AWS_SECRET_ACCESS_KEY'),
      },
      requestChecksumCalculation: 'WHEN_REQUIRED',
      responseChecksumValidation: 'WHEN_REQUIRED',
    });
  }

  async getUploadUrl(
    key: string,
    _contentType: string,
    expiresIn: number = 3600,
  ): Promise<IPresignedUrl> {
    const command = new PutObjectCommand({
      Bucket: this.bucket,
      Key: key,
    });

    const url = await getSignedUrl(this.client, command, { expiresIn });
    const expiresAt = new Date(Date.now() + expiresIn * 1000);

    this.logger.log(`Generated upload URL for key: ${key}`);

    return { url, key, expiresAt };
  }

  async getDownloadUrl(key: string, expiresIn: number = 3600): Promise<IPresignedUrl> {
    const command = new GetObjectCommand({
      Bucket: this.bucket,
      Key: key,
    });

    const url = await getSignedUrl(this.client, command, { expiresIn });
    const expiresAt = new Date(Date.now() + expiresIn * 1000);

    this.logger.log(`Generated download URL for key: ${key}`);

    return { url, key, expiresAt };
  }

  getPublicUrl(key: string): string {
    return `https://${this.bucket}.s3.${this.region}.amazonaws.com/${key}`;
  }

  async delete(key: string): Promise<void> {
    const command = new DeleteObjectCommand({
      Bucket: this.bucket,
      Key: key,
    });

    await this.client.send(command);

    this.logger.log(`Deleted file: ${key}`);
  }
}
