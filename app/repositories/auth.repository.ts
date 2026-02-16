import type { $Fetch } from 'ofetch'
import type {
  IAuthRepository,
  IAuthResponse,
  IMessageResponse,
  IRegisterPayload,
  ILoginPayload,
  IForgotPasswordPayload,
  IResetPasswordPayload,
  IUser
} from '~/domain'

// Data Access Layer
// - Єдиний інтерфейс доступу до API
// - Не знає про Vue, реактивність
// - Framework-agnostic

export class AuthRepository implements IAuthRepository {
  constructor(private readonly api: $Fetch) {}

  register(payload: IRegisterPayload) {
    return this.api<IAuthResponse>('/auth/register', {
      method: 'POST',
      body: payload
    })
  }

  login(payload: ILoginPayload) {
    return this.api<IAuthResponse>('/auth/login', {
      method: 'POST',
      body: payload
    })
  }

  refresh() {
    // refreshToken передається автоматично як httpOnly cookie
    return this.api<IAuthResponse>('/auth/refresh', {
      method: 'POST'
    })
  }

  logout() {
    return this.api<IMessageResponse>('/auth/logout', {
      method: 'POST'
    })
  }

  logoutAll() {
    return this.api<IMessageResponse>('/auth/logout-all', {
      method: 'POST'
    })
  }

  me() {
    return this.api<IUser>('/auth/me')
  }

  resendVerification() {
    return this.api<IMessageResponse>('/auth/resend-verification', {
      method: 'POST'
    })
  }

  verifyEmail(token: string) {
    return this.api<IMessageResponse>(`/auth/verify-email?token=${token}`)
  }

  forgotPassword(payload: IForgotPasswordPayload) {
    return this.api<IMessageResponse>('/auth/forgot-password', {
      method: 'POST',
      body: payload
    })
  }

  resetPassword(payload: IResetPasswordPayload) {
    return this.api<IMessageResponse>('/auth/reset-password', {
      method: 'POST',
      body: payload
    })
  }
}
