import { useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'
import { loginSchema, type LoginFormValues } from '../domain'

export function useLoginForm() {
  const { t } = useI18n()
  const localePath = useLocalePath()
  const router = useRouter()
  const authStore = useAuthStore()
  const authApi = useAuthApi()

  const isLoading = ref(false)
  const error = ref<string | null>(null)
  const codeSent = ref(false)
  const isSendingCode = ref(false)

  const form = useForm<LoginFormValues>({
    validationSchema: toTypedSchema(loginSchema),
    initialValues: {
      phoneNumber: '',
      code: '',
      email: '',
      password: '',
    }
  })

  const sendCode = async () => {
    if (!form.values.phoneNumber) return

    isSendingCode.value = true
    error.value = null

    try {
      // TODO: Implement authApi.sendCode when backend is ready
      // await authApi.sendCode({ phoneNumber: `+380${form.values.phoneNumber}` })
      await new Promise(resolve => setTimeout(resolve, 1000))
      codeSent.value = true
    } catch (e: unknown) {
      const err = e as { data?: { message?: string }; message?: string }
      error.value = err.data?.message || err.message || t('AUTH_SEND_CODE_FAILED')
    } finally {
      isSendingCode.value = false
    }
  }

  const onSubmit = form.handleSubmit(async (values) => {
    isLoading.value = true
    error.value = null

    try {
      const response = await authApi.login(values)
      authStore.setAuth(response.accessToken, response.user)
      router.push(localePath('/dashboard'))
    } catch (e: unknown) {
      const err = e as { data?: { message?: string }; message?: string }
      error.value = err.data?.message || err.message || t('AUTH_LOGIN_FAILED')
    } finally {
      isLoading.value = false
    }
  })

  return {
    form,
    isLoading: readonly(isLoading),
    isSendingCode: readonly(isSendingCode),
    codeSent: readonly(codeSent),
    error: readonly(error),
    sendCode,
    onSubmit,
  }
}
