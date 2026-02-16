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

definePageMeta({ middleware: 'auth' })

const { t } = useI18n()
const localePath = useLocalePath()

const { form, isLoading, error, success, onSubmit } = useProfileForm()
</script>

<template>
  <div class="container mx-auto p-6">
    <div class="mb-6">
      <NuxtLink
        :to="localePath('/dashboard')"
        class="text-sm text-muted-foreground hover:text-primary"
      >
        &larr; {{ t('COMMON_BACK') }}
      </NuxtLink>
    </div>

    <Card class="max-w-2xl">
      <CardHeader>
        <CardTitle>{{ t('PROFILE_TITLE') }}</CardTitle>
        <CardDescription>{{ t('PROFILE_UPDATE_INFO') }}</CardDescription>
      </CardHeader>

      <CardContent>
        <Alert v-if="success" class="mb-4">
          <AlertDescription>{{ t('PROFILE_UPDATE_SUCCESS') }}</AlertDescription>
        </Alert>

        <Alert v-if="error" variant="destructive" class="mb-4">
          <AlertDescription>{{ error }}</AlertDescription>
        </Alert>

        <form @submit="onSubmit" class="space-y-4">
          <FormField v-slot="{ componentField }" name="firstName">
            <FormItem>
              <FormLabel>{{ t('AUTH_FIRST_NAME') }}</FormLabel>
              <FormControl>
                <Input
                  type="text"
                  v-bind="componentField"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          </FormField>

          <FormField v-slot="{ componentField }" name="lastName">
            <FormItem>
              <FormLabel>{{ t('AUTH_LAST_NAME') }}</FormLabel>
              <FormControl>
                <Input
                  type="text"
                  v-bind="componentField"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          </FormField>

          <FormField v-slot="{ componentField }" name="phoneNumber">
            <FormItem>
              <FormLabel>{{ t('AUTH_PHONE') }}</FormLabel>
              <FormControl>
                <Input
                  type="tel"
                  v-bind="componentField"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          </FormField>

          <div class="flex gap-4 pt-4">
            <Button type="submit" :disabled="isLoading">
              {{ isLoading ? t('COMMON_LOADING') : t('COMMON_SAVE') }}
            </Button>
            <Button type="button" variant="outline" as-child>
              <NuxtLink :to="localePath('/dashboard')">
                {{ t('COMMON_CANCEL') }}
              </NuxtLink>
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  </div>
</template>
