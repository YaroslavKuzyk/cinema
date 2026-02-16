import { Injectable } from '@nestjs/common';
import { ITokensGateway } from './tokens.gateway';
import { ID, ITokenData, ICreateTokenData, IUpdateTokenData, ETokenType } from '@cinema/shared';

@Injectable()
export class TokensService {
  constructor(private readonly tokensGateway: ITokensGateway) {}

  async create(data: ICreateTokenData): Promise<ITokenData> {
    return this.tokensGateway.create(data);
  }

  async findByToken(token: string): Promise<ITokenData | null> {
    return this.tokensGateway.findByToken(token);
  }

  async findValidByToken(token: string): Promise<ITokenData | null> {
    return this.tokensGateway.findValidByToken(token);
  }

  async findAllByUserIdAndType(userId: ID, type: ETokenType): Promise<ITokenData[]> {
    return this.tokensGateway.findAllByUserIdAndType(userId, type);
  }

  async updateByToken(token: string, data: IUpdateTokenData): Promise<ITokenData> {
    return this.tokensGateway.updateByToken(token, data);
  }

  async deleteByToken(token: string): Promise<void> {
    return this.tokensGateway.deleteByToken(token);
  }

  async deleteExpired(): Promise<number> {
    return this.tokensGateway.deleteExpired();
  }

  async deleteByUserIdAndType(userId: ID, type: ETokenType): Promise<number> {
    return this.tokensGateway.deleteByUserIdAndType(userId, type);
  }

  async deleteAllByUserId(userId: ID): Promise<number> {
    return this.tokensGateway.deleteAllByUserId(userId);
  }
}
