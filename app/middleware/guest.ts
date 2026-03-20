// Middleware для гостей (незалогінених)
// Використання: definePageMeta({ middleware: 'guest' })
// Приклад: сторінки /login, /register

export default defineNuxtRouteMiddleware(async () => {
  const authStore = useAuthStore()
  const localePath = useLocalePath()

  // Ініціалізуємо store (відновлюємо сесію з cookie)
  await authStore.initialize()

  // Якщо користувач залогінений - редірект на dashboard
  if (authStore.accessToken) {
    return navigateTo(localePath('/dashboard'))
  }
})
