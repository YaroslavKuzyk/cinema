import type { Request, Response } from 'express';
import { AuthService } from './domain/auth.service';
import { RegisterDto } from './dtos/register.dto';
import { LoginDto } from './dtos/login.dto';
import { AuthResponseDto } from './dtos/auth-response.dto';
import { UserResponseDto } from './dtos/user-response.dto';
import { AccessTokenResponseDto } from './dtos/access-token-response.dto';
import { MessageResponseDto } from './dtos/message-response.dto';
import { ForgotPasswordDto } from './dtos/forgot-password.dto';
import { ResetPasswordDto } from './dtos/reset-password.dto';
import type { ICurrentUser } from './decorators/current-user.decorator';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    register(dto: RegisterDto, res: Response): Promise<AuthResponseDto>;
    login(dto: LoginDto, res: Response): Promise<AuthResponseDto>;
    refresh(user: ICurrentUser, res: Response): Promise<AccessTokenResponseDto>;
    logout(req: Request, res: Response): Promise<void>;
    logoutAll(userId: string, res: Response): Promise<void>;
    getCurrentUser(userId: string): Promise<UserResponseDto>;
    resendVerificationEmail(userId: string): Promise<MessageResponseDto>;
    verifyEmail(token: string): Promise<MessageResponseDto>;
    forgotPassword(dto: ForgotPasswordDto): Promise<MessageResponseDto>;
    resetPassword(dto: ResetPasswordDto): Promise<MessageResponseDto>;
}
