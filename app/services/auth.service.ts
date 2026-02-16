import { appendResponseHeader } from 'h3'
import type { IAuthResponse } from '~/domain'

// Infrastructure Layer
// - SSR-специфічна логіка для refresh токенів
// - Cookie forwarding між browser ↔ Nuxt SSR ↔ Backend
// - НЕ містить Vue реактивності

export interface IAuthServiceConfig {
  apiBase: string
}

export class AuthService {
  constructor(private readonly config: IAuthServiceConfig) {}

  async refreshTokensSSR(): Promise<IAuthResponse | null> {
    try {
      const headers: HeadersInit = {}

      // ВАЖЛИВО: отримуємо event ДО async операції, поки є доступ до Nuxt context
      const event = import.meta.server ? useRequestEvent() : null

      // Додаємо Accept-Language з поточної локалі i18n
      const { $i18n } = useNuxtApp()
      const locale = ($i18n as { locale: { value: string } }).locale.value
      headers['Accept-Language'] = locale

      if (import.meta.server) {
        const requestHeaders = useRequestHeaders(['cookie', 'user-agent', 'origin', 'host'])
        if (requestHeaders.cookie) {
          headers.Cookie = requestHeaders.cookie
        }
        if (requestHeaders['user-agent']) {
          headers['User-Agent'] = requestHeaders['user-agent']
        }
        if (requestHeaders.origin) {
          headers.Origin = requestHeaders.origin
        } else if (requestHeaders.host) {
          const protocol = process.env.NODE_ENV === 'production' ? 'https' : 'http'
          headers.Origin = `${protocol}://${requestHeaders.host}`
        }
      }

      const response = await $fetch.raw<IAuthResponse>('/auth/refresh', {
        baseURL: this.config.apiBase,
        method: 'POST',
        credentials: import.meta.client ? 'include' : undefined,
        headers,
        retry: false
      })

      // Пересилаємо Set-Cookie від backend до browser
      if (event) {
        const setCookieHeader = response.headers.getSetCookie()
        if (setCookieHeader.length > 0) {
          for (const cookie of setCookieHeader) {
            appendResponseHeader(event, 'set-cookie', cookie)
          }
        }
      }

      return response._data || null
    } catch {
      return null
    }
  }
}
