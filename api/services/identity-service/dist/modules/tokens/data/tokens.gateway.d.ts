import { PrismaService } from '@/infrastructure/database/prisma.service';
import { ITokensGateway } from '../domain/tokens.gateway';
import { ID, ITokenData, ICreateTokenData, IUpdateTokenData, ETokenType } from '@cinema/shared';
import { TokensMapper } from './tokens.mapper';
export declare class TokensGateway implements ITokensGateway {
    private readonly prisma;
    private readonly tokensMapper;
    constructor(prisma: PrismaService, tokensMapper: TokensMapper);
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
