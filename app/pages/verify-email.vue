<script setup lang="ts">
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Alert, AlertDescription } from '@/components/ui/alert'

const { t } = useI18n()
const localePath = useLocalePath()
const route = useRoute()
const router = useRouter()
const authApi = useAuthApi()
const authStore = useAuthStore()

const isLoading = ref(true)
const error = ref<string | null>(null)
const success = ref(false)

onMounted(async () => {
  const token = route.query.token as string

  if (!token) {
    error.value = t('AUTH_INVALID_TOKEN')
    isLoading.value = false
    return
  }

  try {
    await authApi.verifyEmail(token)
    success.value = true

    // Оновлюємо user якщо залогінений
    if (authStore.isAuthenticated) {
      await authStore.fetchUser()
    }

    // Редірект на dashboard через 3 секунди
    setTimeout(() => {
      router.push(localePath('/dashboard'))
    }, 3000)
  } catch (e: any) {
    error.value = e.data?.message || e.message || t('AUTH_INVALID_TOKEN')
  } finally {
    isLoading.value = false
  }
})
</script>

<template>
  <div class="flex items-center justify-center p-4 min-h-[calc(100vh-4rem)]">
    <Card class="w-full max-w-md">
      <CardHeader class="space-y-1">
        <CardTitle class="text-2xl font-bold text-center">
          {{ t('VERIFY_EMAIL_TITLE') }}
        </CardTitle>
        <CardDescription class="text-center">
          {{ t('VERIFY_EMAIL_DESCRIPTION') }}
        </CardDescription>
      </CardHeader>

      <CardContent class="text-center">
        <div v-if="isLoading" class="py-8">
          <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
          <p class="mt-4 text-muted-foreground">{{ t('COMMON_LOADING') }}</p>
        </div>

        <div v-else-if="success" class="py-8">
          <Alert class="mb-4">
            <AlertDescription>{{ t('VERIFY_EMAIL_SUCCESS') }}</AlertDescription>
          </Alert>
          <p class="text-sm text-muted-foreground">{{ t('VERIFY_EMAIL_REDIRECTING') }}</p>
        </div>

        <div v-else class="py-8">
          <Alert variant="destructive" class="mb-4">
            <AlertDescription>{{ error }}</AlertDescription>
          </Alert>
          <Button as-child class="mt-4">
            <NuxtLink :to="localePath('/login')">
              {{ t('AUTH_BACK_TO_LOGIN') }}
            </NuxtLink>
          </Button>
        </div>
      </CardContent>
    </Card>
  </div>
</template>
