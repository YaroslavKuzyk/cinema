import { Injectable } from '@nestjs/common';
import { ID } from '@cinema/shared';
import { RegisterUseCase } from '../use-cases/register.use-case';
import { LoginUseCase } from '../use-cases/login.use-case';
import { RefreshTokenUseCase } from '../use-cases/refresh-token.use-case';
import { LogoutUseCase } from '../use-cases/logout.use-case';
import { LogoutAllUseCase } from '../use-cases/logout-all.use-case';
import { GetCurrentUserUseCase } from '../use-cases/get-current-user.use-case';
import { VerifyEmailUseCase } from '../use-cases/verify-email.use-case';
import { ResendVerificationUseCase } from '../use-cases/resend-verification.use-case';
import { ForgotPasswordUseCase } from '../use-cases/forgot-password.use-case';
import { ResetPasswordUseCase } from '../use-cases/reset-password.use-case';
import {
  IRegisterData,
  ILoginData,
  IAuthResult,
  IUserInfo,
  IForgotPasswordData,
  IResetPasswordData,
} from './auth.types';

@Injectable()
export class AuthService {
  constructor(
    private readonly registerUseCase: RegisterUseCase,
    private readonly loginUseCase: LoginUseCase,
    private readonly refreshTokenUseCase: RefreshTokenUseCase,
    private readonly logoutUseCase: LogoutUseCase,
    private readonly logoutAllUseCase: LogoutAllUseCase,
    private readonly getCurrentUserUseCase: GetCurrentUserUseCase,
    private readonly verifyEmailUseCase: VerifyEmailUseCase,
    private readonly resendVerificationUseCase: ResendVerificationUseCase,
    private readonly forgotPasswordUseCase: ForgotPasswordUseCase,
    private readonly resetPasswordUseCase: ResetPasswordUseCase,
  ) {}

  async register(data: IRegisterData): Promise<IAuthResult> {
    return this.registerUseCase.execute(data);
  }

  async login(data: ILoginData): Promise<IAuthResult> {
    return this.loginUseCase.execute(data);
  }

  async refresh(userId: ID, refreshToken: string): Promise<IAuthResult> {
    return this.refreshTokenUseCase.execute(userId, refreshToken);
  }

  async logout(refreshToken: string): Promise<void> {
    return this.logoutUseCase.execute(refreshToken);
  }

  async logoutAll(userId: ID): Promise<void> {
    return this.logoutAllUseCase.execute(userId);
  }

  async getCurrentUser(userId: ID): Promise<IUserInfo> {
    return this.getCurrentUserUseCase.execute(userId);
  }

  async resendVerificationEmail(userId: ID): Promise<void> {
    return this.resendVerificationUseCase.execute(userId);
  }

  async verifyEmail(token: string): Promise<void> {
    return this.verifyEmailUseCase.execute(token);
  }

  async forgotPassword(data: IForgotPasswordData): Promise<void> {
    return this.forgotPasswordUseCase.execute(data);
  }

  async resetPassword(data: IResetPasswordData): Promise<void> {
    return this.resetPasswordUseCase.execute(data);
  }
}
