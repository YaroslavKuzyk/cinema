import { useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'
import { forgotPasswordSchema, type ForgotPasswordFormValues } from '~/domain'

// Use Case Layer
// - Реалізація конкретного use-case (забув пароль)
// - Управління формою та локальним UI state

export function useForgotPasswordForm() {
  const { t } = useI18n()
  const authApi = useAuthApi()

  const isLoading = ref(false)
  const error = ref<string | null>(null)
  const isSuccess = ref(false)

  const form = useForm<ForgotPasswordFormValues>({
    validationSchema: toTypedSchema(forgotPasswordSchema),
    initialValues: {
      email: ''
    }
  })

  const onSubmit = form.handleSubmit(async (values) => {
    isLoading.value = true
    error.value = null

    try {
      await authApi.forgotPassword(values)
      isSuccess.value = true
    } catch (e: any) {
      error.value = e.data?.message || e.message || t('AUTH_FORGOT_PASSWORD_FAILED')
    } finally {
      isLoading.value = false
    }
  })

  return {
    form,
    isLoading: readonly(isLoading),
    error: readonly(error),
    isSuccess: readonly(isSuccess),
    onSubmit
  }
}
