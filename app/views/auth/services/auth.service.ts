import { appendResponseHeader } from 'h3'
import type { IAuthResponse } from '../domain'

export interface IAuthServiceConfig {
  apiBase: string
}

export class AuthService {
  constructor(private readonly config: IAuthServiceConfig) {}

  async refreshTokensSSR(): Promise<IAuthResponse | null> {
    try {
      const headers: HeadersInit = {}

      const event = import.meta.server ? useRequestEvent() : null

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
