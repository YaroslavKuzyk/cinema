import { ITokenPayload, ITokens } from './auth.types';

export abstract class IJwtTokensGateway {
  abstract generateTokens(payload: ITokenPayload): Promise<ITokens>;
  abstract generateAccessToken(payload: ITokenPayload): Promise<string>;
  abstract generateRefreshToken(payload: ITokenPayload): Promise<string>;
}
