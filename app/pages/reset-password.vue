<script setup lang="ts">
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form'
import { Alert, AlertDescription } from '@/components/ui/alert'

definePageMeta({ middleware: 'guest' })

const { t } = useI18n()
const localePath = useLocalePath()
const route = useRoute()

const token = computed(() => route.query.token as string || '')

const { form, isLoading, error, isSuccess, onSubmit } = useResetPasswordForm(token)
</script>

<template>
  <div class="flex items-center justify-center p-4 min-h-[calc(100vh-4rem)]">
    <Card class="w-full max-w-md">
      <CardHeader class="space-y-1">
        <CardTitle class="text-2xl font-bold text-center">
          {{ t('AUTH_RESET_PASSWORD_TITLE') }}
        </CardTitle>
        <CardDescription class="text-center">
          {{ t('AUTH_RESET_PASSWORD_DESCRIPTION') }}
        </CardDescription>
      </CardHeader>

      <CardContent>
        <Alert v-if="isSuccess" class="mb-4">
          <AlertDescription>{{ t('AUTH_RESET_PASSWORD_SUCCESS') }}</AlertDescription>
        </Alert>

        <Alert v-if="error" variant="destructive" class="mb-4">
          <AlertDescription>{{ error }}</AlertDescription>
        </Alert>

        <Alert v-if="!token" variant="destructive" class="mb-4">
          <AlertDescription>{{ t('AUTH_INVALID_TOKEN') }}</AlertDescription>
        </Alert>

        <form v-if="!isSuccess && token" @submit="onSubmit" class="space-y-4">
          <FormField v-slot="{ componentField }" name="password">
            <FormItem>
              <FormLabel>{{ t('AUTH_NEW_PASSWORD') }}</FormLabel>
              <FormControl>
                <Input type="password" v-bind="componentField" />
              </FormControl>
              <FormMessage />
            </FormItem>
          </FormField>

          <FormField v-slot="{ componentField }" name="confirmPassword">
            <FormItem>
              <FormLabel>{{ t('AUTH_CONFIRM_PASSWORD') }}</FormLabel>
              <FormControl>
                <Input type="password" v-bind="componentField" />
              </FormControl>
              <FormMessage />
            </FormItem>
          </FormField>

          <Button type="submit" class="w-full" :disabled="isLoading">
            {{ isLoading ? t('COMMON_LOADING') : t('AUTH_RESET_PASSWORD') }}
          </Button>
        </form>

        <p class="mt-4 text-center text-sm text-muted-foreground">
          <NuxtLink :to="localePath('/login')" class="text-primary hover:underline">
            {{ t('AUTH_BACK_TO_LOGIN') }}
          </NuxtLink>
        </p>
      </CardContent>
    </Card>
  </div>
</template>
