import { Module } from '@nestjs/common';
import { TokensService } from './domain/tokens.service';
import { ITokensGateway } from './domain/tokens.gateway';
import { TokensMapper } from './data/tokens.mapper';
import { TokensGateway } from './data/tokens.gateway';

@Module({
  providers: [
    { provide: ITokensGateway, useClass: TokensGateway },
    TokensService,
    TokensMapper,
  ],
  exports: [
    { provide: ITokensGateway, useClass: TokensGateway },
    TokensService,
    TokensMapper,
  ],
})
export class TokensModule {}
