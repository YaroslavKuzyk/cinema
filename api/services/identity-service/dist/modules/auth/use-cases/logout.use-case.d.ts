import { TokensService } from '@/modules/tokens/domain/tokens.service';
export declare class LogoutUseCase {
    private readonly tokensService;
    constructor(tokensService: TokensService);
    execute(refreshToken: string): Promise<void>;
}
