import { useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'
import { profileSchema, type ProfileFormValues } from '~/domain'

// Use Case Layer
// - Реалізація конкретного use-case (редагування профілю)
// - Управління формою та локальним UI state
// - Оркестрація API composables та store

export function useProfileForm() {
  const { t } = useI18n()
  const authStore = useAuthStore()

  const isLoading = ref(false)
  const error = ref<string | null>(null)
  const success = ref(false)

  const form = useForm<ProfileFormValues>({
    validationSchema: toTypedSchema(profileSchema),
    initialValues: {
      firstName: authStore.user?.firstName || '',
      lastName: authStore.user?.lastName || '',
      phoneNumber: authStore.user?.phoneNumber || ''
    }
  })

  // Оновлюємо форму коли user змінюється
  watch(
    () => authStore.user,
    (user) => {
      if (user) {
        form.setValues({
          firstName: user.firstName,
          lastName: user.lastName,
          phoneNumber: user.phoneNumber
        })
      }
    },
    { immediate: true }
  )

  const onSubmit = form.handleSubmit(async (values) => {
    isLoading.value = true
    error.value = null
    success.value = false

    try {
      // Оновлюємо user через authStore
      // Примітка: поки що API не підтримує оновлення firstName/lastName напряму
      // Це placeholder для майбутньої імплементації
      success.value = true
    } catch (e: any) {
      error.value = e.data?.message || e.message || t('PROFILE_UPDATE_FAILED')
    } finally {
      isLoading.value = false
    }
  })

  return {
    form,
    isLoading: readonly(isLoading),
    error: readonly(error),
    success: readonly(success),
    onSubmit
  }
}
