import { Injectable } from '@nestjs/common';
import { PrismaService } from '@/infrastructure/database/prisma.service';
import { ITokensGateway } from '../domain/tokens.gateway';
import { ID, ITokenData, ICreateTokenData, IUpdateTokenData, ETokenType } from '@cinema/shared';
import { TokensMapper } from './tokens.mapper';

@Injectable()
export class TokensGateway implements ITokensGateway {
  constructor(
    private readonly prisma: PrismaService,
    private readonly tokensMapper: TokensMapper,
  ) {}

  async create(data: ICreateTokenData): Promise<ITokenData> {
    const token = await this.prisma.userToken.create({
      data: this.tokensMapper.toCreate(data),
    });
    return this.tokensMapper.toData(token);
  }

  async findByToken(token: string): Promise<ITokenData | null> {
    const result = await this.prisma.userToken.findUnique({ where: { token } });
    return result ? this.tokensMapper.toData(result) : null;
  }

  async findValidByToken(token: string): Promise<ITokenData | null> {
    const result = await this.prisma.userToken.findFirst({
      where: { token, expiresAt: { gt: new Date() } },
    });
    return result ? this.tokensMapper.toData(result) : null;
  }

  async findAllByUserIdAndType(userId: ID, type: ETokenType): Promise<ITokenData[]> {
    const results = await this.prisma.userToken.findMany({
      where: { userId, type },
    });
    return results.map((r) => this.tokensMapper.toData(r));
  }

  async updateByToken(token: string, data: IUpdateTokenData): Promise<ITokenData> {
    const result = await this.prisma.userToken.update({
      where: { token },
      data,
    });
    return this.tokensMapper.toData(result);
  }

  async deleteByToken(token: string): Promise<void> {
    await this.prisma.userToken.delete({ where: { token } });
  }

  async deleteExpired(): Promise<number> {
    const result = await this.prisma.userToken.deleteMany({
      where: { expiresAt: { lt: new Date() } },
    });
    return result.count;
  }

  async deleteByUserIdAndType(userId: ID, type: ETokenType): Promise<number> {
    const result = await this.prisma.userToken.deleteMany({
      where: { userId, type },
    });
    return result.count;
  }

  async deleteAllByUserId(userId: ID): Promise<number> {
    const result = await this.prisma.userToken.deleteMany({
      where: { userId },
    });
    return result.count;
  }
}
