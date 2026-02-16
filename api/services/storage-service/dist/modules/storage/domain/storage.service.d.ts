import { IPresignedUrl, IStorageResult } from '@cinema/shared';
import { IStorageGateway } from './storage.gateway';
export declare class StorageService {
    private readonly storageGateway;
    constructor(storageGateway: IStorageGateway);
    getUploadUrl(key: string, contentType: string, expiresIn?: number): Promise<IPresignedUrl>;
    getDownloadUrl(key: string, expiresIn?: number): Promise<IPresignedUrl>;
    getPublicUrl(key: string): string;
    delete(key: string): Promise<IStorageResult>;
}
