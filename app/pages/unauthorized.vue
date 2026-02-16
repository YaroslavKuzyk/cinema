<script setup lang="ts">
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle
} from '@/components/ui/card'

const { t } = useI18n()
const localePath = useLocalePath()
</script>

<template>
  <div class="flex items-center justify-center p-4 min-h-[calc(100vh-4rem)]">
    <Card class="w-full max-w-md text-center">
      <CardHeader>
        <div class="text-6xl font-bold text-destructive mb-2">
          {{ t('PAGE_UNAUTHORIZED_CODE') }}
        </div>
        <CardTitle class="text-2xl">{{ t('PAGE_UNAUTHORIZED_TITLE') }}</CardTitle>
      </CardHeader>
      <CardContent class="space-y-4">
        <p class="text-muted-foreground">{{ t('PAGE_UNAUTHORIZED_DESCRIPTION') }}</p>
        <Button as-child>
          <NuxtLink :to="localePath('/dashboard')">
            {{ t('NAV_DASHBOARD') }}
          </NuxtLink>
        </Button>
      </CardContent>
    </Card>
  </div>
</template>
