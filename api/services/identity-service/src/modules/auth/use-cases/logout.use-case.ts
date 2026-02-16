import { Injectable } from '@nestjs/common';
import { ETokenType } from '@cinema/shared';
import { TokensService } from '@/modules/tokens/domain/tokens.service';

@Injectable()
export class LogoutUseCase {
  constructor(private readonly tokensService: TokensService) {}

  async execute(refreshToken: string): Promise<void> {
    const userToken = await this.tokensService.findByToken(refreshToken);

    if (userToken && userToken.type === ETokenType.REFRESH_TOKEN) {
      await this.tokensService.deleteByToken(refreshToken);
    }
  }
}
