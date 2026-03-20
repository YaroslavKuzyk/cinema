<script setup lang="ts">
import { Field, ErrorMessage } from 'vee-validate'
import { useRegisterForm } from '../composables'

const { t } = useI18n()
const localePath = useLocalePath()

const { form, isLoading, error, onSubmit, EUserType } = useRegisterForm()
</script>

<template>
  <div class="page-center" style="padding-top: 2rem; padding-bottom: 2rem;">
    <div class="card container-sm">
      <div class="card-header text-center stack stack-sm">
        <h2 class="card-title text-2xl">{{ t('AUTH_REGISTER_TITLE') }}</h2>
        <p class="card-description">{{ t('AUTH_CREATE_ACCOUNT') }}</p>
      </div>

      <div class="card-content">
        <div v-if="error" class="alert alert-destructive mb-md">{{ error }}</div>

        <form @submit="onSubmit" class="stack stack-md">
          <div class="grid-2">
            <div class="form-group">
              <label class="form-label">{{ t('AUTH_FIRST_NAME') }}</label>
              <Field name="firstName" class="form-input" />
              <ErrorMessage name="firstName" class="form-error" />
            </div>

            <div class="form-group">
              <label class="form-label">{{ t('AUTH_LAST_NAME') }}</label>
              <Field name="lastName" class="form-input" />
              <ErrorMessage name="lastName" class="form-error" />
            </div>
          </div>

          <div class="form-group">
            <label class="form-label">{{ t('AUTH_EMAIL') }}</label>
            <Field name="email" type="email" class="form-input" />
            <ErrorMessage name="email" class="form-error" />
          </div>

          <div class="form-group">
            <label class="form-label">{{ t('AUTH_PHONE') }}</label>
            <Field name="phoneNumber" type="tel" class="form-input" />
            <ErrorMessage name="phoneNumber" class="form-error" />
          </div>

          <div class="form-group">
            <label class="form-label">{{ t('AUTH_USER_TYPE') }}</label>
            <Field name="userType" as="select" class="form-select">
              <option value="" disabled>{{ t('AUTH_SELECT_USER_TYPE') }}</option>
              <option :value="EUserType.CUSTOMER">{{ t('AUTH_CUSTOMER') }}</option>
              <option :value="EUserType.SERVICE_PROVIDER">{{ t('AUTH_SERVICE_PROVIDER') }}</option>
            </Field>
            <ErrorMessage name="userType" class="form-error" />
          </div>

          <div class="form-group">
            <label class="form-label">{{ t('AUTH_PASSWORD') }}</label>
            <Field name="password" type="password" class="form-input" />
            <ErrorMessage name="password" class="form-error" />
          </div>

          <div class="form-group">
            <label class="form-label">{{ t('AUTH_CONFIRM_PASSWORD') }}</label>
            <Field name="confirmPassword" type="password" class="form-input" />
            <ErrorMessage name="confirmPassword" class="form-error" />
          </div>

          <button type="submit" class="btn btn-primary btn-block" :disabled="isLoading">
            {{ isLoading ? t('COMMON_LOADING') : t('NAV_REGISTER') }}
          </button>
        </form>

        <p class="mt-md text-center text-sm text-muted">
          {{ t('AUTH_HAS_ACCOUNT') }}
          <NuxtLink :to="localePath('/login')" class="link-primary">
            {{ t('NAV_LOGIN') }}
          </NuxtLink>
        </p>
      </div>
    </div>
  </div>
</template>
