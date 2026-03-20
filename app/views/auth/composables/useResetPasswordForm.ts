import { useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'
import { resetPasswordSchema, type ResetPasswordFormValues } from '../domain'

export function useResetPasswordForm(token: Ref<string> | ComputedRef<string>) {
  const { t } = useI18n()
  const authApi = useAuthApi()

  const isLoading = ref(false)
  const error = ref<string | null>(null)
  const isSuccess = ref(false)

  const form = useForm<ResetPasswordFormValues>({
    validationSchema: toTypedSchema(resetPasswordSchema),
    initialValues: {
      token: unref(token),
      password: '',
      confirmPassword: ''
    }
  })

  watch(token, (newToken) => {
    form.setFieldValue('token', newToken)
  })

  const onSubmit = form.handleSubmit(async (values) => {
    isLoading.value = true
    error.value = null

    try {
      const { confirmPassword, ...payload } = values
      await authApi.resetPassword(payload)
      isSuccess.value = true
    } catch (e: any) {
      error.value = e.data?.message || e.message || t('AUTH_RESET_PASSWORD_FAILED')
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
