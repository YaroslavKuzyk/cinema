import { ID } from '@cinema/shared';
export interface ICurrentUser {
    id: ID;
    email: string;
    refreshToken?: string;
}
export declare const CurrentUser: (...dataOrPipes: (keyof ICurrentUser | import("@nestjs/common").PipeTransform<any, any> | import("@nestjs/common").Type<import("@nestjs/common").PipeTransform<any, any>> | undefined)[]) => ParameterDecorator;
