import { useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'
import { resetPasswordSchema, type ResetPasswordFormValues } from '~/domain'

// Use Case Layer
// - Реалізація конкретного use-case (скидання паролю)
// - Управління формою та локальним UI state

export function useResetPasswordForm(token: Ref<string> | string) {
  const { t } = useI18n()
  const localePath = useLocalePath()
  const router = useRouter()
  const authApi = useAuthApi()

  const tokenValue = isRef(token) ? token : ref(token)

  const isLoading = ref(false)
  const error = ref<string | null>(null)
  const isSuccess = ref(false)

  const form = useForm<ResetPasswordFormValues>({
    validationSchema: toTypedSchema(resetPasswordSchema),
    initialValues: {
      token: toValue(tokenValue),
      password: '',
      confirmPassword: ''
    }
  })

  // Синхронізація токену з формою
  watch(tokenValue, (newToken) => {
    form.setFieldValue('token', newToken)
  })

  const onSubmit = form.handleSubmit(async (values) => {
    isLoading.value = true
    error.value = null

    try {
      await authApi.resetPassword({
        token: values.token,
        password: values.password
      })
      isSuccess.value = true
      setTimeout(() => {
        router.push(localePath('/login'))
      }, 3000)
    } catch (e: any) {
      error.value = e.data?.message || e.message || t('AUTH_RESET_PASSWORD_FAILED')
    } finally {
      isLoading.value = false
    }
  })

  return {
    form,
    token: tokenValue,
    isLoading: readonly(isLoading),
    error: readonly(error),
    isSuccess: readonly(isSuccess),
    onSubmit
  }
}
