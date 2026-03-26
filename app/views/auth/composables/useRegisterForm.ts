import { useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'
import { registerSchema, type RegisterFormValues } from '../domain'

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
      firstName: '',
      lastName: '',
      email: '',
      phoneNumber: '',
      password: '',
      confirmPassword: '',
      termsAccepted: false
    }
  })

  const onSubmit = form.handleSubmit(async (values) => {
    isLoading.value = true
    error.value = null

    try {
      const { confirmPassword, termsAccepted, ...payload } = values
      const response = await authApi.register(payload)
      authStore.setAuth(response.accessToken, response.user)
      router.push(localePath({ name: 'dashboard' }))
    } catch (e: unknown) {
      const err = e as { data?: { message?: string }; message?: string }
      error.value = err.data?.message || err.message || t('AUTH_REGISTER_FAILED')
    } finally {
      isLoading.value = false
    }
  })

  return {
    form,
    isLoading: readonly(isLoading),
    error: readonly(error),
    onSubmit,
  }
}
