export declare class CreateProfileDto {
    keyword?: string;
    description?: string;
    state?: string;
}
export declare class UpdateProfileDto {
    keyword?: string;
    description?: string;
    state?: string;
}
export declare class ProfileResponseDto {
    userId: string;
    keyword?: string;
    description?: string;
    state?: string;
    createdAt: Date;
    updatedAt: Date;
}
