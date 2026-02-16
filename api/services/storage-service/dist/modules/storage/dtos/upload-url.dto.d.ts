export declare class GetUploadUrlDto {
    key: string;
    contentType: string;
    expiresIn?: number;
}
export declare class UploadUrlResponseDto {
    url: string;
    key: string;
    expiresAt: Date;
}
