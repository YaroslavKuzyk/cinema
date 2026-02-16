import { ID, EUserType } from '@cinema/shared';
export declare class UserResponseDto {
    id: ID;
    email: string;
    phoneNumber: string;
    firstName: string;
    lastName: string;
    userType: EUserType;
    emailVerified: boolean;
}
