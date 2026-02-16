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

const { form, isLoading, error, isSuccess, onSubmit } = useForgotPasswordForm()
</script>

<template>
  <div class="flex items-center justify-center p-4 min-h-[calc(100vh-4rem)]">
    <Card class="w-full max-w-md">
      <CardHeader class="space-y-1">
        <CardTitle class="text-2xl font-bold text-center">
          {{ t('AUTH_FORGOT_PASSWORD_TITLE') }}
        </CardTitle>
        <CardDescription class="text-center">
          {{ t('AUTH_FORGOT_PASSWORD_DESCRIPTION') }}
        </CardDescription>
      </CardHeader>

      <CardContent>
        <Alert v-if="isSuccess" class="mb-4">
          <AlertDescription>{{ t('AUTH_FORGOT_PASSWORD_SUCCESS') }}</AlertDescription>
        </Alert>

        <Alert v-if="error" variant="destructive" class="mb-4">
          <AlertDescription>{{ error }}</AlertDescription>
        </Alert>

        <form v-if="!isSuccess" @submit="onSubmit" class="space-y-4">
          <FormField v-slot="{ componentField }" name="email">
            <FormItem>
              <FormLabel>{{ t('AUTH_EMAIL') }}</FormLabel>
              <FormControl>
                <Input
                  type="email"
                  :placeholder="t('AUTH_EMAIL_PLACEHOLDER')"
                  v-bind="componentField"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          </FormField>

          <Button type="submit" class="w-full" :disabled="isLoading">
            {{ isLoading ? t('COMMON_LOADING') : t('AUTH_SEND_RESET_LINK') }}
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
