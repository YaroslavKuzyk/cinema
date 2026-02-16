export interface IUploadUrlOptions {
    key: string;
    contentType: string;
    expiresIn?: number;
}
export interface IDownloadUrlOptions {
    key: string;
    expiresIn?: number;
}
export interface IPresignedUrl {
    url: string;
    key: string;
    expiresAt: Date;
}
export interface IStorageResult {
    success: boolean;
    key?: string;
    url?: string;
    error?: string;
}
