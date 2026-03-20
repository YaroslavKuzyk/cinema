<script setup lang="ts">
import { Field, ErrorMessage } from 'vee-validate'
import { useResetPasswordForm } from '../composables'

const { t } = useI18n()
const localePath = useLocalePath()
const route = useRoute()

const token = computed(() => route.query.token as string || '')

const { form, isLoading, error, isSuccess, onSubmit } = useResetPasswordForm(token)
</script>

<template>
  <div class="page-center">
    <div class="card container-sm">
      <div class="card-header text-center stack stack-sm">
        <h2 class="card-title text-2xl">{{ t('AUTH_RESET_PASSWORD_TITLE') }}</h2>
        <p class="card-description">{{ t('AUTH_RESET_PASSWORD_DESCRIPTION') }}</p>
      </div>

      <div class="card-content">
        <div v-if="isSuccess" class="alert alert-success mb-md">{{ t('AUTH_RESET_PASSWORD_SUCCESS') }}</div>
        <div v-if="error" class="alert alert-destructive mb-md">{{ error }}</div>
        <div v-if="!token" class="alert alert-destructive mb-md">{{ t('AUTH_INVALID_TOKEN') }}</div>

        <form v-if="!isSuccess && token" @submit="onSubmit" class="stack stack-md">
          <div class="form-group">
            <label class="form-label">{{ t('AUTH_NEW_PASSWORD') }}</label>
            <Field name="password" type="password" class="form-input" />
            <ErrorMessage name="password" class="form-error" />
          </div>

          <div class="form-group">
            <label class="form-label">{{ t('AUTH_CONFIRM_PASSWORD') }}</label>
            <Field name="confirmPassword" type="password" class="form-input" />
            <ErrorMessage name="confirmPassword" class="form-error" />
          </div>

          <button type="submit" class="btn btn-primary btn-block" :disabled="isLoading">
            {{ isLoading ? t('COMMON_LOADING') : t('AUTH_RESET_PASSWORD') }}
          </button>
        </form>

        <p class="mt-md text-center text-sm text-muted">
          <NuxtLink :to="localePath('/login')" class="link-primary">
            {{ t('AUTH_BACK_TO_LOGIN') }}
          </NuxtLink>
        </p>
      </div>
    </div>
  </div>
</template>
