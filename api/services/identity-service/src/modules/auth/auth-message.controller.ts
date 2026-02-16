import { Controller, Logger } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import {
  IDENTITY_PATTERNS,
  IKafkaRequest,
  IKafkaResponse,
  createKafkaSuccess,
  createKafkaError,
} from '@cinema/shared';
import { AuthService } from './domain/auth.service';
import { RegisterDto } from './dtos/register.dto';
import { LoginDto } from './dtos/login.dto';
import { ForgotPasswordDto } from './dtos/forgot-password.dto';
import { ResetPasswordDto } from './dtos/reset-password.dto';
import {
  getRefreshTokenCookieOptions,
  REFRESH_TOKEN_COOKIE_NAME,
} from './utils/cookie.helper';

@Controller()
export class AuthMessageController {
  private readonly logger = new Logger(AuthMessageController.name);

  constructor(private readonly authService: AuthService) {}

  @MessagePattern(IDENTITY_PATTERNS.AUTH_REGISTER)
  async register(
    @Payload() payload: IKafkaRequest<RegisterDto>,
  ): Promise<IKafkaResponse> {
    try {
      const result = await this.authService.register(payload.data);

      return createKafkaSuccess(
        { accessToken: result.accessToken, user: result.user },
        [
          {
            action: 'set',
            name: REFRESH_TOKEN_COOKIE_NAME,
            value: result.refreshToken,
            options: getRefreshTokenCookieOptions(),
          },
        ],
      );
    } catch (error: any) {
      this.logger.error(`Register error: ${error.message}`);
      return createKafkaError(
        error.status || 500,
        error.message,
        error.name,
      );
    }
  }

  @MessagePattern(IDENTITY_PATTERNS.AUTH_LOGIN)
  async login(
    @Payload() payload: IKafkaRequest<LoginDto>,
  ): Promise<IKafkaResponse> {
    try {
      const result = await this.authService.login(payload.data);

      return createKafkaSuccess(
        { accessToken: result.accessToken, user: result.user },
        [
          {
            action: 'set',
            name: REFRESH_TOKEN_COOKIE_NAME,
            value: result.refreshToken,
            options: getRefreshTokenCookieOptions(),
          },
        ],
      );
    } catch (error: any) {
      this.logger.error(`Login error: ${error.message}`);
      return createKafkaError(error.status || 401, error.message, error.name);
    }
  }

  @MessagePattern(IDENTITY_PATTERNS.AUTH_REFRESH)
  async refresh(
    @Payload() payload: IKafkaRequest<void>,
  ): Promise<IKafkaResponse> {
    try {
      const refreshToken = payload.context.cookies?.[REFRESH_TOKEN_COOKIE_NAME];

      if (!refreshToken) {
        return createKafkaError(401, 'Refresh token not found', 'Unauthorized');
      }

      if (!payload.context.userId) {
        return createKafkaError(401, 'User ID not found', 'Unauthorized');
      }

      const result = await this.authService.refresh(
        payload.context.userId,
        refreshToken,
      );

      return createKafkaSuccess(
        { accessToken: result.accessToken, user: result.user },
        [
          {
            action: 'set',
            name: REFRESH_TOKEN_COOKIE_NAME,
            value: result.refreshToken,
            options: getRefreshTokenCookieOptions(),
          },
        ],
      );
    } catch (error: any) {
      this.logger.error(`Refresh error: ${error.message}`);
      return createKafkaError(error.status || 401, error.message, error.name);
    }
  }

  @MessagePattern(IDENTITY_PATTERNS.AUTH_LOGOUT)
  async logout(
    @Payload() payload: IKafkaRequest<void>,
  ): Promise<IKafkaResponse> {
    try {
      const refreshToken = payload.context.cookies?.[REFRESH_TOKEN_COOKIE_NAME];

      if (refreshToken) {
        await this.authService.logout(refreshToken);
      }

      return createKafkaSuccess(
        { message: 'Logged out successfully' },
        [{ action: 'clear', name: REFRESH_TOKEN_COOKIE_NAME }],
      );
    } catch (error: any) {
      this.logger.error(`Logout error: ${error.message}`);
      return createKafkaError(error.status || 500, error.message);
    }
  }

  @MessagePattern(IDENTITY_PATTERNS.AUTH_LOGOUT_ALL)
  async logoutAll(
    @Payload() payload: IKafkaRequest<void>,
  ): Promise<IKafkaResponse> {
    try {
      if (!payload.context.userId) {
        return createKafkaError(401, 'Unauthorized');
      }

      await this.authService.logoutAll(payload.context.userId);

      return createKafkaSuccess(
        { message: 'Logged out from all devices' },
        [{ action: 'clear', name: REFRESH_TOKEN_COOKIE_NAME }],
      );
    } catch (error: any) {
      this.logger.error(`Logout all error: ${error.message}`);
      return createKafkaError(error.status || 500, error.message);
    }
  }

  @MessagePattern(IDENTITY_PATTERNS.AUTH_ME)
  async getCurrentUser(
    @Payload() payload: IKafkaRequest<void>,
  ): Promise<IKafkaResponse> {
    try {
      if (!payload.context.userId) {
        return createKafkaError(401, 'Unauthorized');
      }

      const user = await this.authService.getCurrentUser(payload.context.userId);
      return createKafkaSuccess(user);
    } catch (error: any) {
      this.logger.error(`Get current user error: ${error.message}`);
      return createKafkaError(error.status || 500, error.message);
    }
  }

  @MessagePattern(IDENTITY_PATTERNS.AUTH_RESEND_VERIFICATION)
  async resendVerification(
    @Payload() payload: IKafkaRequest<void>,
  ): Promise<IKafkaResponse> {
    try {
      if (!payload.context.userId) {
        return createKafkaError(401, 'Unauthorized');
      }

      await this.authService.resendVerificationEmail(payload.context.userId);
      return createKafkaSuccess({ message: 'Verification email sent successfully' });
    } catch (error: any) {
      this.logger.error(`Resend verification error: ${error.message}`);
      return createKafkaError(error.status || 500, error.message);
    }
  }

  @MessagePattern(IDENTITY_PATTERNS.AUTH_VERIFY_EMAIL)
  async verifyEmail(
    @Payload() payload: IKafkaRequest<{ token: string }>,
  ): Promise<IKafkaResponse> {
    try {
      await this.authService.verifyEmail(payload.data.token);
      return createKafkaSuccess({ message: 'Email verified successfully' });
    } catch (error: any) {
      this.logger.error(`Verify email error: ${error.message}`);
      return createKafkaError(error.status || 400, error.message);
    }
  }

  @MessagePattern(IDENTITY_PATTERNS.AUTH_FORGOT_PASSWORD)
  async forgotPassword(
    @Payload() payload: IKafkaRequest<ForgotPasswordDto>,
  ): Promise<IKafkaResponse> {
    try {
      await this.authService.forgotPassword(payload.data);
      return createKafkaSuccess({ message: 'Password reset email sent successfully' });
    } catch (error: any) {
      this.logger.error(`Forgot password error: ${error.message}`);
      return createKafkaError(error.status || 500, error.message);
    }
  }

  @MessagePattern(IDENTITY_PATTERNS.AUTH_RESET_PASSWORD)
  async resetPassword(
    @Payload() payload: IKafkaRequest<ResetPasswordDto>,
  ): Promise<IKafkaResponse> {
    try {
      await this.authService.resetPassword(payload.data);
      return createKafkaSuccess({ message: 'Password reset successfully' });
    } catch (error: any) {
      this.logger.error(`Reset password error: ${error.message}`);
      return createKafkaError(error.status || 400, error.message);
    }
  }
}
