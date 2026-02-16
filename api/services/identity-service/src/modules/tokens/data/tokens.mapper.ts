import { UserToken, Prisma } from '@prisma/client';
import { Injectable } from '@nestjs/common';
import { ITokenData, ICreateTokenData, ETokenType } from '@cinema/shared';
import { v4 as uuid } from 'uuid';

@Injectable()
export class TokensMapper {
  toData(data: UserToken): ITokenData {
    return {
      id: data.id,
      userId: data.userId,
      type: data.type as ETokenType,
      token: data.token,
      expiresAt: data.expiresAt,
      createdAt: data.createdAt,
      deviceInfo: data.deviceInfo ?? undefined,
      ipAddress: data.ipAddress ?? undefined,
      lastUsed: data.lastUsed ?? undefined,
    };
  }

  toCreate(data: ICreateTokenData): Prisma.UserTokenCreateInput {
    return {
      id: `token-${uuid()}`,
      user: { connect: { id: data.userId } },
      type: data.type,
      token: data.token,
      expiresAt: data.expiresAt,
      deviceInfo: data.deviceInfo,
      ipAddress: data.ipAddress,
    };
  }
}
