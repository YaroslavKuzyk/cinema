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

const { form, isLoading, error, onSubmit } = useRegisterForm()
</script>

<template>
  <div class="flex items-center justify-center p-4 py-8">
    <Card class="w-full max-w-md">
      <CardHeader class="space-y-1">
        <CardTitle class="text-2xl font-bold text-center">
          {{ t('AUTH_REGISTER_TITLE') }}
        </CardTitle>
        <CardDescription class="text-center">
          {{ t('AUTH_CREATE_ACCOUNT') }}
        </CardDescription>
      </CardHeader>

      <CardContent>
        <Alert v-if="error" variant="destructive" class="mb-4">
          <AlertDescription>{{ error }}</AlertDescription>
        </Alert>

        <form @submit="onSubmit" class="space-y-4">
          <div class="grid grid-cols-2 gap-4">
            <FormField v-slot="{ componentField }" name="firstName">
              <FormItem>
                <FormLabel>{{ t('AUTH_FIRST_NAME') }}</FormLabel>
                <FormControl>
                  <Input v-bind="componentField" />
                </FormControl>
                <FormMessage />
              </FormItem>
            </FormField>

            <FormField v-slot="{ componentField }" name="lastName">
              <FormItem>
                <FormLabel>{{ t('AUTH_LAST_NAME') }}</FormLabel>
                <FormControl>
                  <Input v-bind="componentField" />
                </FormControl>
                <FormMessage />
              </FormItem>
            </FormField>
          </div>

          <FormField v-slot="{ componentField }" name="email">
            <FormItem>
              <FormLabel>{{ t('AUTH_EMAIL') }}</FormLabel>
              <FormControl>
                <Input type="email" v-bind="componentField" />
              </FormControl>
              <FormMessage />
            </FormItem>
          </FormField>

          <FormField v-slot="{ componentField }" name="phoneNumber">
            <FormItem>
              <FormLabel>{{ t('AUTH_PHONE') }}</FormLabel>
              <FormControl>
                <Input type="tel" v-bind="componentField" />
              </FormControl>
              <FormMessage />
            </FormItem>
          </FormField>

          <FormField v-slot="{ componentField }" name="password">
            <FormItem>
              <FormLabel>{{ t('AUTH_PASSWORD') }}</FormLabel>
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
            {{ isLoading ? t('COMMON_LOADING') : t('NAV_REGISTER') }}
          </Button>
        </form>

        <p class="mt-4 text-center text-sm text-muted-foreground">
          {{ t('AUTH_HAS_ACCOUNT') }}
          <NuxtLink :to="localePath('/login')" class="text-primary hover:underline">
            {{ t('NAV_LOGIN') }}
          </NuxtLink>
        </p>
      </CardContent>
    </Card>
  </div>
</template>
