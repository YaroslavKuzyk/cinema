import { UserToken, Prisma } from '@prisma/client';
import { ITokenData, ICreateTokenData } from '@cinema/shared';
export declare class TokensMapper {
    toData(data: UserToken): ITokenData;
    toCreate(data: ICreateTokenData): Prisma.UserTokenCreateInput;
}
