import type { IUser } from '~/domain'

// Domain State
// - Зберігання глобальних даних автентифікації
// - Source of truth
// - НЕ містить UI state, НЕ містить прямих HTTP викликів

export const useAuthStore = defineStore('auth', () => {
  const authApi = useAuthApi()

  const user = ref<IUser | null>(null)
  const accessToken = ref<string | null>(null)
  const isReady = ref(false)

  // Для дедуплікації паралельних викликів
  let refreshPromise: Promise<boolean> | null = null
  let initPromise: Promise<void> | null = null

  const hasSession = useCookie('hasSession', {
    path: '/',
    maxAge: 60 * 60 * 24 * 7
  })

  const isAuthenticated = computed(() => !!accessToken.value && !!user.value)
  const isEmailVerified = computed(() => user.value?.emailVerified ?? false)

  function setAuth(token: string, userData: IUser) {
    accessToken.value = token
    user.value = userData
    hasSession.value = 'true'
  }

  function setUser(userData: IUser) {
    user.value = userData
  }

  async function fetchUser(): Promise<IUser | null> {
    if (!accessToken.value) return null

    try {
      user.value = await authApi.me()
      return user.value
    } catch {
      user.value = null
      return null
    }
  }

  async function refreshTokens(): Promise<boolean> {
    if (refreshPromise) {
      return refreshPromise
    }

    refreshPromise = doRefreshTokens()
    try {
      return await refreshPromise
    } finally {
      refreshPromise = null
    }
  }

  async function doRefreshTokens(): Promise<boolean> {
    try {
      const response = await authApi.refreshTokensSSR()
      if (response) {
        accessToken.value = response.accessToken
        user.value = response.user
        return true
      }
      return false
    } catch {
      return false
    }
  }

  async function initialize(): Promise<void> {
    if (isReady.value) return

    if (initPromise) {
      return initPromise
    }

    initPromise = doInitialize()
    try {
      return await initPromise
    } finally {
      initPromise = null
    }
  }

  async function doInitialize(): Promise<void> {
    if (accessToken.value && user.value) {
      isReady.value = true
      return
    }

    if (hasSession.value) {
      const ok = await refreshTokens()
      if (!ok && import.meta.client) {
        hasSession.value = null
      }
    }

    isReady.value = true
  }

  function logout() {
    user.value = null
    accessToken.value = null
    hasSession.value = null
  }

  return {
    user,
    accessToken,
    isAuthenticated,
    isEmailVerified,
    isReady,
    hasSession,
    setAuth,
    setUser,
    fetchUser,
    refreshTokens,
    initialize,
    logout
  }
})
