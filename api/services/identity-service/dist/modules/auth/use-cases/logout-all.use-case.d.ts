import { ID } from '@cinema/shared';
import { TokensService } from '@/modules/tokens/domain/tokens.service';
export declare class LogoutAllUseCase {
    private readonly tokensService;
    constructor(tokensService: TokensService);
    execute(userId: ID): Promise<void>;
}
