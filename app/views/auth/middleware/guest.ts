export default defineNuxtRouteMiddleware(async () => {
  const authStore = useAuthStore()
  const localePath = useLocalePath()

  await authStore.initialize()

  if (authStore.accessToken) {
    return navigateTo(localePath({ name: 'dashboard' }))
  }
})
