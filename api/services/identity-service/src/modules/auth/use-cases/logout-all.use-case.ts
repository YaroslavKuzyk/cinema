import { Injectable } from '@nestjs/common';
import { ID, ETokenType } from '@cinema/shared';
import { TokensService } from '@/modules/tokens/domain/tokens.service';

@Injectable()
export class LogoutAllUseCase {
  constructor(private readonly tokensService: TokensService) {}

  async execute(userId: ID): Promise<void> {
    await this.tokensService.deleteByUserIdAndType(
      userId,
      ETokenType.REFRESH_TOKEN,
    );
  }
}
