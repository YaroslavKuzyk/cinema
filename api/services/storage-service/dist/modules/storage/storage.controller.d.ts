import { IStorageResult } from '@cinema/shared';
import { StorageService } from './domain/storage.service';
import { GetUploadUrlDto, UploadUrlResponseDto, GetDownloadUrlDto, DownloadUrlResponseDto } from './dtos';
export declare class StorageController {
    private readonly storageService;
    constructor(storageService: StorageService);
    getUploadUrl(dto: GetUploadUrlDto): Promise<UploadUrlResponseDto>;
    getDownloadUrl(dto: GetDownloadUrlDto): Promise<DownloadUrlResponseDto>;
    delete(key: string): Promise<IStorageResult>;
}
