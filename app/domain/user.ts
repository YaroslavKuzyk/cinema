export interface IUser {
  id: string
  email: string
  phoneNumber: string
  firstName: string
  lastName: string
  emailVerified: boolean
  avatarKey?: string | null
  createdAt?: Date
  updatedAt?: Date
}

export interface IAuthResponse {
  accessToken: string
  user: IUser
  // refreshToken встановлюється як httpOnly cookie бекендом
}

export interface IAccessTokenResponse {
  accessToken: string
}

export interface IMessageResponse {
  message: string
}

export interface IRegisterPayload {
  email: string
  phoneNumber: string
  firstName: string
  lastName: string
  password: string
}

export interface ILoginPayload {
  email: string
  password: string
}

export interface IForgotPasswordPayload {
  email: string
}

export interface IResetPasswordPayload {
  token: string
  password: string
}

export interface IAuthRepository {
  register(payload: IRegisterPayload): Promise<IAuthResponse>
  login(payload: ILoginPayload): Promise<IAuthResponse>
  refresh(): Promise<IAuthResponse>
  logout(): Promise<IMessageResponse>
  logoutAll(): Promise<IMessageResponse>
  me(): Promise<IUser>
  resendVerification(): Promise<IMessageResponse>
  verifyEmail(token: string): Promise<IMessageResponse>
  forgotPassword(payload: IForgotPasswordPayload): Promise<IMessageResponse>
  resetPassword(payload: IResetPasswordPayload): Promise<IMessageResponse>
}
