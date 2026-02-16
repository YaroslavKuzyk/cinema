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
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar'

definePageMeta({ middleware: 'auth' })

const { t } = useI18n()
const localePath = useLocalePath()
const router = useRouter()
const authStore = useAuthStore()
const authApi = useAuthApi()
const storageApi = useStorageApi()
const profileApi = useProfileApi()

const isResending = ref(false)
const resendSuccess = ref(false)
const resendError = ref<string | null>(null)

const isLoggingOut = ref(false)
const isUploadingAvatar = ref(false)
const avatarUrl = ref<string | null>(null)
const avatarError = ref<string | null>(null)

const fileInput = ref<HTMLInputElement | null>(null)

const userInitials = computed(() => {
  const first = authStore.user?.firstName?.charAt(0) || ''
  const last = authStore.user?.lastName?.charAt(0) || ''
  return (first + last).toUpperCase()
})

async function loadAvatarUrl() {
  if (authStore.user?.avatarKey) {
    try {
      avatarUrl.value = await storageApi.getFileUrl(authStore.user.avatarKey)
    } catch {
      avatarUrl.value = null
    }
  }
}

onMounted(() => {
  loadAvatarUrl()
})

async function resendVerification() {
  isResending.value = true
  resendError.value = null
  resendSuccess.value = false

  try {
    await authApi.resendVerification()
    resendSuccess.value = true
  } catch (e: any) {
    resendError.value = e.data?.message || e.message || t('COMMON_ERROR')
  } finally {
    isResending.value = false
  }
}

async function logout() {
  isLoggingOut.value = true
  try {
    await authApi.logout()
  } catch {
    // Ignore logout errors
  } finally {
    authStore.logout()
    router.push(localePath('/login'))
  }
}

function triggerFileInput() {
  fileInput.value?.click()
}

async function handleAvatarUpload(event: Event) {
  const target = event.target as HTMLInputElement
  const file = target.files?.[0]

  if (!file) return

  if (!file.type.startsWith('image/')) {
    avatarError.value = 'Please select an image file'
    return
  }

  if (file.size > 5 * 1024 * 1024) {
    avatarError.value = 'File size must be less than 5MB'
    return
  }

  isUploadingAvatar.value = true
  avatarError.value = null

  try {
    const key = await storageApi.uploadFile(file, 'avatars')

    await profileApi.update({ avatarKey: key })

    if (authStore.user) {
      authStore.setUser({ ...authStore.user, avatarKey: key })
    }

    avatarUrl.value = await storageApi.getFileUrl(key)
  } catch (e: any) {
    avatarError.value = e.data?.message || e.message || t('AVATAR_UPLOAD_FAILED')
  } finally {
    isUploadingAvatar.value = false
    if (target) target.value = ''
  }
}
</script>

<template>
  <div class="container mx-auto p-6">
    <div class="flex items-center justify-between mb-6">
      <h1 class="text-3xl font-bold">{{ t('DASHBOARD_TITLE') }}</h1>
      <Button
        variant="outline"
        :disabled="isLoggingOut"
        @click="logout"
      >
        {{ isLoggingOut ? t('COMMON_LOADING') : t('NAV_LOGOUT') }}
      </Button>
    </div>

    <div class="grid gap-6 md:grid-cols-2">
      <Card>
        <CardHeader>
          <div class="flex items-center gap-4">
            <div class="relative group">
              <Avatar class="h-16 w-16">
                <AvatarImage v-if="avatarUrl" :src="avatarUrl" :alt="authStore.user?.firstName" />
                <AvatarFallback class="text-lg">{{ userInitials }}</AvatarFallback>
              </Avatar>
              <button
                class="absolute inset-0 flex items-center justify-center bg-black/50 rounded-full opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
                :disabled="isUploadingAvatar"
                @click="triggerFileInput"
              >
                <span class="text-white text-xs">
                  {{ isUploadingAvatar ? '...' : t('COMMON_EDIT') }}
                </span>
              </button>
              <input
                ref="fileInput"
                type="file"
                accept="image/*"
                class="hidden"
                @change="handleAvatarUpload"
              />
            </div>
            <div>
              <CardTitle>{{ t('DASHBOARD_WELCOME') }}, {{ authStore.user?.firstName }}!</CardTitle>
              <CardDescription>{{ t('DASHBOARD_USER_INFO') }}</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent class="space-y-4">
          <Alert v-if="avatarError" variant="destructive" class="mb-4">
            <AlertDescription>{{ avatarError }}</AlertDescription>
          </Alert>

          <div>
            <span class="text-muted-foreground">{{ t('DASHBOARD_NAME') }}:</span>
            <span class="ml-2 font-medium">{{ authStore.user?.firstName }} {{ authStore.user?.lastName }}</span>
          </div>
          <div>
            <span class="text-muted-foreground">{{ t('AUTH_EMAIL') }}:</span>
            <span class="ml-2 font-medium">{{ authStore.user?.email }}</span>
          </div>
          <div>
            <span class="text-muted-foreground">{{ t('AUTH_PHONE') }}:</span>
            <span class="ml-2 font-medium">{{ authStore.user?.phoneNumber }}</span>
          </div>
          <div class="flex items-center gap-2">
            <span class="text-muted-foreground">{{ t('DASHBOARD_EMAIL_VERIFIED') }}:</span>
            <span
              class="ml-2 font-medium"
              :class="authStore.isEmailVerified ? 'text-green-600' : 'text-yellow-600'"
            >
              {{ authStore.isEmailVerified ? t('COMMON_YES') : t('COMMON_NO') }}
            </span>
          </div>

          <div v-if="!authStore.isEmailVerified" class="pt-4 border-t">
            <Alert v-if="resendSuccess" class="mb-4">
              <AlertDescription>{{ t('VERIFY_EMAIL_RESENT') }}</AlertDescription>
            </Alert>
            <Alert v-if="resendError" variant="destructive" class="mb-4">
              <AlertDescription>{{ resendError }}</AlertDescription>
            </Alert>
            <Button
              variant="outline"
              size="sm"
              :disabled="isResending"
              @click="resendVerification"
            >
              {{ isResending ? t('COMMON_LOADING') : t('VERIFY_EMAIL_RESEND') }}
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>{{ t('NAV_PROFILE') }}</CardTitle>
          <CardDescription>{{ t('PROFILE_UPDATE_INFO') }}</CardDescription>
        </CardHeader>
        <CardContent>
          <Button as-child>
            <NuxtLink :to="localePath('/profile')">
              {{ t('COMMON_EDIT') }} {{ t('NAV_PROFILE') }}
            </NuxtLink>
          </Button>
        </CardContent>
      </Card>
    </div>
  </div>
</template>
