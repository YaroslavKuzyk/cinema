import { Injectable, ConflictException } from '@nestjs/common';
import * as crypto from 'crypto';
import { EUserType, ETokenType, IDENTITY_EVENTS, IUserCreatedEvent } from '@cinema/shared';
import { UsersService } from '@/modules/users/domain/users.service';
import { TokensService } from '@/modules/tokens/domain/tokens.service';
import { KafkaProducerService } from '@/infrastructure/messaging';
import { IJwtTokensGateway } from '../domain/jwt-tokens.gateway';
import { IPasswordGateway } from '../domain/password.gateway';
import { AuthMapper } from '../data/auth.mapper';
import { IRegisterData, IAuthResult } from '../domain/auth.types';

@Injectable()
export class RegisterUseCase {
  private readonly VERIFICATION_TOKEN_EXPIRY_HOURS = 24;
  private readonly REFRESH_TOKEN_EXPIRY_DAYS = 7;

  constructor(
    private readonly usersService: UsersService,
    private readonly tokensService: TokensService,
    private readonly jwtTokensGateway: IJwtTokensGateway,
    private readonly passwordGateway: IPasswordGateway,
    private readonly authMapper: AuthMapper,
    private readonly kafkaProducer: KafkaProducerService,
  ) {}

  private generateVerificationToken(): string {
    return crypto.randomBytes(32).toString('hex');
  }

  private getVerificationTokenExpiry(): Date {
    const expiry = new Date();
    expiry.setHours(expiry.getHours() + this.VERIFICATION_TOKEN_EXPIRY_HOURS);
    return expiry;
  }

  private getRefreshTokenExpiry(): Date {
    const expiry = new Date();
    expiry.setDate(expiry.getDate() + this.REFRESH_TOKEN_EXPIRY_DAYS);
    return expiry;
  }

  async execute(data: IRegisterData): Promise<IAuthResult> {
    // Check if user already exists
    const existingUser = await this.usersService.findByEmail(data.email);
    if (existingUser) {
      throw new ConflictException('User with this email already exists');
    }

    // Hash password
    const hashedPassword = await this.passwordGateway.hash(data.password);

    // Create user
    const user = await this.usersService.create({
      email: data.email,
      phoneNumber: data.phoneNumber,
      firstName: data.firstName,
      lastName: data.lastName,
      userType: EUserType.CUSTOMER,
      password: hashedPassword,
    });

    // Generate email verification token
    const verificationToken = this.generateVerificationToken();
    const verificationTokenExpiry = this.getVerificationTokenExpiry();

    await this.tokensService.create({
      userId: user.id,
      type: ETokenType.EMAIL_VERIFICATION,
      token: verificationToken,
      expiresAt: verificationTokenExpiry,
    });

    // Generate access & refresh tokens
    const tokens = await this.jwtTokensGateway.generateTokens({
      sub: user.id,
      email: user.email,
    });

    await this.tokensService.create({
      userId: user.id,
      type: ETokenType.REFRESH_TOKEN,
      token: tokens.refreshToken,
      expiresAt: this.getRefreshTokenExpiry(),
    });

    // Emit user.created event for email verification (non-blocking)
    try {
      const event: IUserCreatedEvent = {
        userId: user.id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        verificationToken,
      };
      await this.kafkaProducer.emit(IDENTITY_EVENTS.USER_CREATED, event);
    } catch (error) {
      console.error('Failed to emit user.created event:', error);
    }

    return this.authMapper.toAuthResult(tokens, user);
  }
}
