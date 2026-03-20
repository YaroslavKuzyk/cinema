<script setup lang="ts">
import { Field, ErrorMessage } from 'vee-validate'
import { useLoginForm } from '../composables'

const { t } = useI18n()
const localePath = useLocalePath()

const { form, isLoading, error, onSubmit } = useLoginForm()
</script>

<template>
  <div class="page-center">
    <div class="card container-sm">
      <div class="card-header text-center stack stack-sm">
        <h2 class="card-title text-2xl">{{ t('AUTH_LOGIN_TITLE') }}</h2>
        <p class="card-description">{{ t('AUTH_ENTER_CREDENTIALS') }}</p>
      </div>

      <div class="card-content">
        <div v-if="error" class="alert alert-destructive mb-md">{{ error }}</div>

        <form @submit="onSubmit" class="stack stack-md">
          <div class="form-group">
            <label class="form-label">{{ t('AUTH_EMAIL') }}</label>
            <Field
              name="email"
              type="email"
              class="form-input"
              :placeholder="t('AUTH_EMAIL_PLACEHOLDER')"
            />
            <ErrorMessage name="email" class="form-error" />
          </div>

          <div class="form-group">
            <label class="form-label">{{ t('AUTH_PASSWORD') }}</label>
            <Field
              name="password"
              type="password"
              class="form-input"
              :placeholder="t('AUTH_PASSWORD_PLACEHOLDER')"
            />
            <ErrorMessage name="password" class="form-error" />
          </div>

          <div class="text-right">
            <NuxtLink :to="localePath('/forgot-password')" class="text-sm link-primary">
              {{ t('AUTH_FORGOT_PASSWORD') }}
            </NuxtLink>
          </div>

          <button type="submit" class="btn btn-primary btn-block" :disabled="isLoading">
            {{ isLoading ? t('COMMON_LOADING') : t('NAV_LOGIN') }}
          </button>
        </form>

        <p class="mt-md text-center text-sm text-muted">
          {{ t('AUTH_NO_ACCOUNT') }}
          <NuxtLink :to="localePath('/register')" class="link-primary">
            {{ t('NAV_REGISTER') }}
          </NuxtLink>
        </p>
      </div>
    </div>
  </div>
</template>
