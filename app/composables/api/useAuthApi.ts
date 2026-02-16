import { AuthRepository } from '~/repositories'
import { AuthService } from '@/services'
import type {
  ILoginPayload,
  IRegisterPayload,
  IForgotPasswordPayload,
  IResetPasswordPayload
} from '~/domain'

// Application Layer
// - Адаптація repository та service до Vue runtime
// - НЕ містить UI-логіки, form-state, global state

export function useAuthApi() {
  const { $api } = useNuxtApp()
  const config = useRuntimeConfig()

  const authRepo = new AuthRepository($api)
  const authService = new AuthService({ apiBase: config.public.apiBase as string })

  return {
    login: (payload: ILoginPayload) => authRepo.login(payload),
    register: (payload: IRegisterPayload) => authRepo.register(payload),
    me: () => authRepo.me(),
    logout: () => authRepo.logout(),
    forgotPassword: (payload: IForgotPasswordPayload) => authRepo.forgotPassword(payload),
    resetPassword: (payload: IResetPasswordPayload) => authRepo.resetPassword(payload),
    verifyEmail: (token: string) => authRepo.verifyEmail(token),
    resendVerification: () => authRepo.resendVerification(),
    // SSR-специфічний refresh з cookie forwarding
    refreshTokensSSR: () => authService.refreshTokensSSR()
  }
}
