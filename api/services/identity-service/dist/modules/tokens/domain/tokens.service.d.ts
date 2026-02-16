import { ITokensGateway } from './tokens.gateway';
import { ID, ITokenData, ICreateTokenData, IUpdateTokenData, ETokenType } from '@cinema/shared';
export declare class TokensService {
    private readonly tokensGateway;
    constructor(tokensGateway: ITokensGateway);
    create(data: ICreateTokenData): Promise<ITokenData>;
    findByToken(token: string): Promise<ITokenData | null>;
    findValidByToken(token: string): Promise<ITokenData | null>;
    findAllByUserIdAndType(userId: ID, type: ETokenType): Promise<ITokenData[]>;
    updateByToken(token: string, data: IUpdateTokenData): Promise<ITokenData>;
    deleteByToken(token: string): Promise<void>;
    deleteExpired(): Promise<number>;
    deleteByUserIdAndType(userId: ID, type: ETokenType): Promise<number>;
    deleteAllByUserId(userId: ID): Promise<number>;
}
