import { ID, ITokenData, ICreateTokenData, IUpdateTokenData, ETokenType } from '@cinema/shared';
export declare abstract class ITokensGateway {
    abstract create(data: ICreateTokenData): Promise<ITokenData>;
    abstract findByToken(token: string): Promise<ITokenData | null>;
    abstract findValidByToken(token: string): Promise<ITokenData | null>;
    abstract findAllByUserIdAndType(userId: ID, type: ETokenType): Promise<ITokenData[]>;
    abstract updateByToken(token: string, data: IUpdateTokenData): Promise<ITokenData>;
    abstract deleteByToken(token: string): Promise<void>;
    abstract deleteExpired(): Promise<number>;
    abstract deleteByUserIdAndType(userId: ID, type: ETokenType): Promise<number>;
    abstract deleteAllByUserId(userId: ID): Promise<number>;
}
