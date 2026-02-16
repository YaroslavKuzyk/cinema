<script setup lang="ts">
import { Button } from '@/components/ui/button'

const { t } = useI18n()
const authStore = useAuthStore()
const localePath = useLocalePath()
</script>

<template>
  <div class="flex items-center justify-center min-h-[calc(100vh-4rem)]">
    <div class="text-center">
      <h1 class="text-4xl font-bold mb-6">{{ t('PAGE_HOME_TITLE') }}</h1>

      <div v-if="authStore.isAuthenticated" class="space-x-4">
        <Button as-child>
          <NuxtLink :to="localePath('/dashboard')">
            {{ t('PAGE_HOME_GO_TO_DASHBOARD') }}
          </NuxtLink>
        </Button>
      </div>

      <div v-else class="space-x-4">
        <Button as-child>
          <NuxtLink :to="localePath('/login')">
            {{ t('NAV_LOGIN') }}
          </NuxtLink>
        </Button>
        <Button variant="outline" as-child>
          <NuxtLink :to="localePath('/register')">
            {{ t('NAV_REGISTER') }}
          </NuxtLink>
        </Button>
      </div>
    </div>
  </div>
</template>
