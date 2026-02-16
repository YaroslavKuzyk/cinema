import { ConfigService } from '@nestjs/config';
import { IPresignedUrl } from '@cinema/shared';
import { IStorageGateway } from '../domain/storage.gateway';
export declare class S3Gateway implements IStorageGateway {
    private readonly configService;
    private readonly client;
    private readonly bucket;
    private readonly region;
    private readonly logger;
    constructor(configService: ConfigService);
    getUploadUrl(key: string, _contentType: string, expiresIn?: number): Promise<IPresignedUrl>;
    getDownloadUrl(key: string, expiresIn?: number): Promise<IPresignedUrl>;
    getPublicUrl(key: string): string;
    delete(key: string): Promise<void>;
}
