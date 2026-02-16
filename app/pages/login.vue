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

const { form, isLoading, error, onSubmit } = useLoginForm()
</script>

<template>
  <div class="flex items-center justify-center p-4 min-h-[calc(100vh-4rem)]">
    <Card class="w-full max-w-md">
      <CardHeader class="space-y-1">
        <CardTitle class="text-2xl font-bold text-center">
          {{ t('AUTH_LOGIN_TITLE') }}
        </CardTitle>
        <CardDescription class="text-center">
          {{ t('AUTH_ENTER_CREDENTIALS') }}
        </CardDescription>
      </CardHeader>

      <CardContent>
        <Alert v-if="error" variant="destructive" class="mb-4">
          <AlertDescription>{{ error }}</AlertDescription>
        </Alert>

        <form @submit="onSubmit" class="space-y-4">
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

          <FormField v-slot="{ componentField }" name="password">
            <FormItem>
              <FormLabel>{{ t('AUTH_PASSWORD') }}</FormLabel>
              <FormControl>
                <Input
                  type="password"
                  :placeholder="t('AUTH_PASSWORD_PLACEHOLDER')"
                  v-bind="componentField"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          </FormField>

          <div class="text-right">
            <NuxtLink
              :to="localePath('/forgot-password')"
              class="text-sm text-primary hover:underline"
            >
              {{ t('AUTH_FORGOT_PASSWORD') }}
            </NuxtLink>
          </div>

          <Button type="submit" class="w-full" :disabled="isLoading">
            {{ isLoading ? t('COMMON_LOADING') : t('NAV_LOGIN') }}
          </Button>
        </form>

        <p class="mt-4 text-center text-sm text-muted-foreground">
          {{ t('AUTH_NO_ACCOUNT') }}
          <NuxtLink :to="localePath('/register')" class="text-primary hover:underline">
            {{ t('NAV_REGISTER') }}
          </NuxtLink>
        </p>
      </CardContent>
    </Card>
  </div>
</template>
