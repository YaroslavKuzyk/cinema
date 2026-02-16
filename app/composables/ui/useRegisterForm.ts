import { useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'
import { registerSchema, type RegisterFormValues } from '~/domain'

// Use Case Layer
// - Реалізація конкретного use-case (реєстрація)
// - Управління формою та локальним UI state
// - Оркестрація API composables та store

export function useRegisterForm() {
  const { t } = useI18n()
  const localePath = useLocalePath()
  const router = useRouter()
  const authStore = useAuthStore()
  const authApi = useAuthApi()

  const isLoading = ref(false)
  const error = ref<string | null>(null)

  const form = useForm<RegisterFormValues>({
    validationSchema: toTypedSchema(registerSchema),
    initialValues: {
      email: '',
      phoneNumber: '',
      firstName: '',
      lastName: '',
      password: '',
      confirmPassword: ''
    }
  })

  const onSubmit = form.handleSubmit(async (values) => {
    isLoading.value = true
    error.value = null

    try {
      const { confirmPassword, ...payload } = values
      const response = await authApi.register(payload)
      authStore.setAuth(response.accessToken, response.user)
      router.push(localePath('/dashboard'))
    } catch (e: any) {
      error.value = e.data?.message || e.message || t('AUTH_REGISTER_FAILED')
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
