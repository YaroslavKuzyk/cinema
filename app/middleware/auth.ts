// Middleware для авторизованих користувачів
// Використання: definePageMeta({ middleware: 'auth' })

export default defineNuxtRouteMiddleware(async () => {
  const authStore = useAuthStore()
  const localePath = useLocalePath()

  // Ініціалізуємо store (відновлюємо сесію з cookie)
  await authStore.initialize()

  // Якщо не авторизований - редірект на логін
  if (!authStore.accessToken) {
    return navigateTo(localePath('/login'))
  }
})
