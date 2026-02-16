import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AuthController } from './auth.controller';
import { AuthMessageController } from './auth-message.controller';
import { AuthService } from './domain/auth.service';
import { IJwtTokensGateway } from './domain/jwt-tokens.gateway';
import { IPasswordGateway } from './domain/password.gateway';
import { JwtTokensGateway } from './data/jwt-tokens.gateway';
import { PasswordGateway } from './data/password.gateway';
import { AuthMapper } from './data/auth.mapper';
import { JwtAccessStrategy } from './strategies/jwt-access.strategy';
import { JwtRefreshStrategy } from './strategies/jwt-refresh.strategy';
import {
  RegisterUseCase,
  LoginUseCase,
  RefreshTokenUseCase,
  LogoutUseCase,
  LogoutAllUseCase,
  GetCurrentUserUseCase,
  VerifyEmailUseCase,
  ResendVerificationUseCase,
  ForgotPasswordUseCase,
  ResetPasswordUseCase,
} from './use-cases';
import { UsersModule } from '@/modules/users/users.module';
import { TokensModule } from '@/modules/tokens/tokens.module';
import { KafkaModule } from '@/infrastructure/messaging';

@Module({
  imports: [
    PassportModule,
    JwtModule.register({}),
    UsersModule,
    TokensModule,
    KafkaModule,
  ],
  controllers: [AuthController, AuthMessageController],
  providers: [
    // Gateways
    { provide: IJwtTokensGateway, useClass: JwtTokensGateway },
    { provide: IPasswordGateway, useClass: PasswordGateway },

    // Main service
    AuthService,

    // Mappers
    AuthMapper,

    // Strategies
    JwtAccessStrategy,
    JwtRefreshStrategy,

    // Use Cases
    RegisterUseCase,
    LoginUseCase,
    RefreshTokenUseCase,
    LogoutUseCase,
    LogoutAllUseCase,
    GetCurrentUserUseCase,
    VerifyEmailUseCase,
    ResendVerificationUseCase,
    ForgotPasswordUseCase,
    ResetPasswordUseCase,
  ],
  exports: [AuthService],
})
export class AuthModule {}
