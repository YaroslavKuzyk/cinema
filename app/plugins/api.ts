import type { $Fetch } from 'ofetch'

export default defineNuxtPlugin(() => {
  const config = useRuntimeConfig()

  const api = $fetch.create({
    baseURL: config.public.apiBase as string,
    credentials: import.meta.client ? 'include' : undefined,

    onRequest({ options }) {
      const authStore = useAuthStore()
      const { $i18n } = useNuxtApp()
      const locale = ($i18n as { locale: { value: string } }).locale.value

      options.headers = new Headers(options.headers)
      options.headers.set('Accept-Language', locale)

      if (authStore.accessToken) {
        options.headers.set('Authorization', `Bearer ${authStore.accessToken}`)
      }
    },

    async onResponseError({ response, request }) {
      // 401 handling тільки на клієнті
      if (import.meta.client && response.status === 401) {
        const authStore = useAuthStore()
        const url = typeof request === 'string' ? request : request.url

        if (url?.includes('/auth/refresh') || !authStore.isReady) {
          return
        }

        const refreshed = await authStore.refreshTokens()
        if (!refreshed) {
          authStore.logout()
          const localePath = useLocalePath()
          navigateTo(localePath('/login'))
        }
      }
    }
  })

  return {
    provide: { api: api as $Fetch }
  }
})
