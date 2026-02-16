import { useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'
import { loginSchema, type LoginFormValues } from '~/domain'

// Use Case Layer
// - Реалізація конкретного use-case (логін)
// - Управління формою та локальним UI state
// - Оркестрація API composables та store

export function useLoginForm() {
  const { t } = useI18n()
  const localePath = useLocalePath()
  const router = useRouter()
  const authStore = useAuthStore()
  const authApi = useAuthApi()

  const isLoading = ref(false)
  const error = ref<string | null>(null)

  const form = useForm<LoginFormValues>({
    validationSchema: toTypedSchema(loginSchema),
    initialValues: {
      email: '',
      password: ''
    }
  })

  const onSubmit = form.handleSubmit(async (values) => {
    isLoading.value = true
    error.value = null

    try {
      const response = await authApi.login(values)
      authStore.setAuth(response.accessToken, response.user)
      router.push(localePath('/dashboard'))
    } catch (e: any) {
      error.value = e.data?.message || e.message || t('AUTH_LOGIN_FAILED')
    } finally {
      isLoading.value = false
    }
  })

  return {
    form,
    isLoading: readonly(isLoading),
    error: readonly(error),
    onSubmit
  }
}
