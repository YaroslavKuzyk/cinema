import {
  Controller,
  Post,
  Get,
  Patch,
  Body,
  Param,
  Query,
  Req,
  Res,
  HttpCode,
  HttpStatus,
  HttpException,
  Logger,
  UseGuards,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiUnauthorizedResponse,
  ApiConflictResponse,
  ApiBadRequestResponse,
} from '@nestjs/swagger';
import type { Request, Response } from 'express';
import { IDENTITY_PATTERNS, IKafkaResponse } from '@cinema/shared';
import { KafkaProxyService } from '../../infrastructure/kafka/kafka-proxy.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { JwtRefreshGuard } from '../auth/guards/jwt-refresh.guard';
import { CurrentUser, ICurrentUser } from '../auth/decorators/current-user.decorator';
import { Public } from '../auth/decorators/public.decorator';
import {
  RegisterDto,
  LoginDto,
  ForgotPasswordDto,
  ResetPasswordDto,
  UpdateProfileDto,
} from './dtos';

@ApiTags('Identity')
@Controller()
export class IdentityController {
  private readonly logger = new Logger(IdentityController.name);

  constructor(private readonly kafkaProxy: KafkaProxyService) {}

  private handleResponse<T>(
    res: Response,
    response: IKafkaResponse<T>,
    successStatus = HttpStatus.OK,
  ): T {
    this.kafkaProxy.applyResponseMetadata(res, response);

    if (!response.success) {
      throw new HttpException(
        {
          statusCode: response.error?.statusCode || 500,
          message: response.error?.message || 'Internal server error',
          error: response.error?.error,
        },
        response.error?.statusCode || 500,
      );
    }

    res.status(successStatus);
    return response.data as T;
  }

  // ========== AUTH ENDPOINTS ==========

  @Public()
  @Post('auth/register')
  @ApiOperation({ summary: 'Register a new user' })
  @ApiCreatedResponse({ description: 'User successfully registered' })
  @ApiConflictResponse({ description: 'User with this email already exists' })
  async register(
    @Body() dto: RegisterDto,
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response,
  ) {
    const context = this.kafkaProxy.buildContext(req);
    const response = await this.kafkaProxy.sendToIdentity(
      IDENTITY_PATTERNS.AUTH_REGISTER,
      dto,
      context,
    );
    return this.handleResponse(res, response, HttpStatus.CREATED);
  }

  @Public()
  @Post('auth/login')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Login user' })
  @ApiOkResponse({ description: 'User successfully logged in' })
  @ApiUnauthorizedResponse({ description: 'Invalid credentials' })
  async login(
    @Body() dto: LoginDto,
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response,
  ) {
    const context = this.kafkaProxy.buildContext(req);
    const response = await this.kafkaProxy.sendToIdentity(
      IDENTITY_PATTERNS.AUTH_LOGIN,
      dto,
      context,
    );
    return this.handleResponse(res, response);
  }

  @Public()
  @Post('auth/refresh')
  @UseGuards(JwtRefreshGuard)
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Refresh access token' })
  @ApiOkResponse({ description: 'Access token successfully refreshed' })
  @ApiUnauthorizedResponse({ description: 'Invalid or expired refresh token' })
  async refresh(
    @CurrentUser() user: ICurrentUser,
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response,
  ) {
    const context = this.kafkaProxy.buildContext(req, user.id);
    const response = await this.kafkaProxy.sendToIdentity(
      IDENTITY_PATTERNS.AUTH_REFRESH,
      null,
      context,
    );
    return this.handleResponse(res, response);
  }

  @Post('auth/logout')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Logout from current device' })
  @ApiOkResponse({ description: 'User successfully logged out' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  async logout(
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response,
  ) {
    const context = this.kafkaProxy.buildContext(req);
    const response = await this.kafkaProxy.sendToIdentity(
      IDENTITY_PATTERNS.AUTH_LOGOUT,
      null,
      context,
    );
    return this.handleResponse(res, response);
  }

  @Post('auth/logout-all')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Logout from all devices' })
  @ApiOkResponse({ description: 'User successfully logged out from all devices' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  async logoutAll(
    @CurrentUser('id') userId: string,
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response,
  ) {
    const context = this.kafkaProxy.buildContext(req, userId);
    const response = await this.kafkaProxy.sendToIdentity(
      IDENTITY_PATTERNS.AUTH_LOGOUT_ALL,
      null,
      context,
    );
    return this.handleResponse(res, response);
  }

  @Get('auth/me')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get current authenticated user' })
  @ApiOkResponse({ description: 'Current user data' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  async getCurrentUser(
    @CurrentUser('id') userId: string,
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response,
  ) {
    const context = this.kafkaProxy.buildContext(req, userId);
    const response = await this.kafkaProxy.sendToIdentity(
      IDENTITY_PATTERNS.AUTH_ME,
      null,
      context,
    );
    return this.handleResponse(res, response);
  }

  @Post('auth/resend-verification')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Resend email verification' })
  @ApiOkResponse({ description: 'Verification email sent successfully' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @ApiBadRequestResponse({ description: 'Email already verified' })
  async resendVerification(
    @CurrentUser('id') userId: string,
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response,
  ) {
    const context = this.kafkaProxy.buildContext(req, userId);
    const response = await this.kafkaProxy.sendToIdentity(
      IDENTITY_PATTERNS.AUTH_RESEND_VERIFICATION,
      null,
      context,
    );
    return this.handleResponse(res, response);
  }

  @Public()
  @Get('auth/verify-email')
  @ApiOperation({ summary: 'Verify email address' })
  @ApiOkResponse({ description: 'Email verified successfully' })
  @ApiBadRequestResponse({ description: 'Invalid or expired verification token' })
  async verifyEmail(
    @Query('token') token: string,
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response,
  ) {
    const context = this.kafkaProxy.buildContext(req);
    const response = await this.kafkaProxy.sendToIdentity(
      IDENTITY_PATTERNS.AUTH_VERIFY_EMAIL,
      { token },
      context,
    );
    return this.handleResponse(res, response);
  }

  @Public()
  @Post('auth/forgot-password')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Forgot password' })
  @ApiOkResponse({ description: 'Password reset email sent successfully' })
  async forgotPassword(
    @Body() dto: ForgotPasswordDto,
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response,
  ) {
    const context = this.kafkaProxy.buildContext(req);
    const response = await this.kafkaProxy.sendToIdentity(
      IDENTITY_PATTERNS.AUTH_FORGOT_PASSWORD,
      dto,
      context,
    );
    return this.handleResponse(res, response);
  }

  @Public()
  @Post('auth/reset-password')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Reset password' })
  @ApiOkResponse({ description: 'Password reset successfully' })
  @ApiBadRequestResponse({ description: 'Invalid or expired reset token' })
  async resetPassword(
    @Body() dto: ResetPasswordDto,
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response,
  ) {
    const context = this.kafkaProxy.buildContext(req);
    const response = await this.kafkaProxy.sendToIdentity(
      IDENTITY_PATTERNS.AUTH_RESET_PASSWORD,
      dto,
      context,
    );
    return this.handleResponse(res, response);
  }

  // ========== PROFILE ENDPOINTS ==========

  @Get('profile')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get current user profile' })
  @ApiOkResponse({ description: 'Profile retrieved successfully' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  async getProfile(
    @CurrentUser('id') userId: string,
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response,
  ) {
    const context = this.kafkaProxy.buildContext(req, userId);
    const response = await this.kafkaProxy.sendToIdentity(
      IDENTITY_PATTERNS.PROFILE_GET,
      null,
      context,
    );
    return this.handleResponse(res, response);
  }

  @Patch('profile')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update current user profile' })
  @ApiOkResponse({ description: 'Profile updated successfully' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  async updateProfile(
    @CurrentUser('id') userId: string,
    @Body() dto: UpdateProfileDto,
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response,
  ) {
    const context = this.kafkaProxy.buildContext(req, userId);
    const response = await this.kafkaProxy.sendToIdentity(
      IDENTITY_PATTERNS.PROFILE_UPDATE,
      dto,
      context,
    );
    return this.handleResponse(res, response);
  }

  // ========== USERS ENDPOINTS ==========

  @Get('users/:id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get user by ID' })
  @ApiOkResponse({ description: 'User data' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  async getUserById(
    @Param('id') id: string,
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response,
  ) {
    const context = this.kafkaProxy.buildContext(req);
    const response = await this.kafkaProxy.sendToIdentity(
      IDENTITY_PATTERNS.USER_GET_BY_ID,
      { id },
      context,
    );
    return this.handleResponse(res, response);
  }
}
