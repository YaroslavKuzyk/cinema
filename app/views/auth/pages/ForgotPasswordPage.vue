<script setup lang="ts">
import { Field, ErrorMessage } from 'vee-validate'
import { useForgotPasswordForm } from '../composables'

const { t } = useI18n()
const localePath = useLocalePath()

const { form, isLoading, error, isSuccess, onSubmit } = useForgotPasswordForm()
</script>

<template>
  <div class="page-center">
    <div class="card container-sm">
      <div class="card-header text-center stack stack-sm">
        <h2 class="card-title text-2xl">{{ t('AUTH_FORGOT_PASSWORD_TITLE') }}</h2>
        <p class="card-description">{{ t('AUTH_FORGOT_PASSWORD_DESCRIPTION') }}</p>
      </div>

      <div class="card-content">
        <div v-if="isSuccess" class="alert alert-success mb-md">{{ t('AUTH_FORGOT_PASSWORD_SUCCESS') }}</div>
        <div v-if="error" class="alert alert-destructive mb-md">{{ error }}</div>

        <form v-if="!isSuccess" @submit="onSubmit" class="stack stack-md">
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

          <button type="submit" class="btn btn-primary btn-block" :disabled="isLoading">
            {{ isLoading ? t('COMMON_LOADING') : t('AUTH_SEND_RESET_LINK') }}
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
