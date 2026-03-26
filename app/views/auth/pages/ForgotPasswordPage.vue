<template>
  <AuthLayout
    :title="$t('FORGOT_PASSWORD_TITLE')"
    :subtitle="$t('FORGOT_PASSWORD_SUBTITLE')"
  >
    <template #icon>
      <LockKeyhole :size="28" />
    </template>

    <AppAlert
      v-if="isSuccess"
      variant="success"
      class="forgot-password-page__alert"
    >
      {{ $t("FORGOT_PASSWORD_SUCCESS") }}
    </AppAlert>

    <AppAlert v-if="error" variant="danger" class="forgot-password-page__alert">
      {{ error }}
    </AppAlert>

    <form v-if="!isSuccess" class="forgot-password-page__form" @submit.prevent="onSubmit">
      <ForgotPasswordForm v-model:email="form.values.email" />

      <div class="forgot-password-page__actions">
        <AppButton
          type="submit"
          class="forgot-password-page__submit"
          :loading="isLoading"
        >
          {{ $t("SEND_RESET_LINK") }}
        </AppButton>

        <AppButton
          as="nuxt-link"
          :to="localePath({ name: routes.login, query: { method: 'email' } })"
          variant="secondary"
          size="small"
          class="forgot-password-page__back"
        >
          <ArrowLeft :size="16" />
          {{ $t("BACK_TO_LOGIN") }}
        </AppButton>
      </div>
    </form>

    <AppButton
      v-else
      as="nuxt-link"
      :to="localePath({ name: routes.login, query: { method: 'email' } })"
      variant="secondary"
      size="small"
      class="forgot-password-page__back"
    >
      <ArrowLeft :size="16" />
      {{ $t("BACK_TO_LOGIN") }}
    </AppButton>
  </AuthLayout>
</template>

<script setup lang="ts">
import { LockKeyhole, ArrowLeft } from "lucide-vue-next";
import { AuthLayout, ForgotPasswordForm } from "../components";
import { useForgotPasswordForm } from "../composables";
import { routes } from ".";

const localePath = useLocalePath();

const { form, isLoading, error, isSuccess, onSubmit } = useForgotPasswordForm();
</script>

<style lang="scss" scoped>
.forgot-password-page {
  &__alert {
    margin-bottom: var(--spacing-md);
  }

  &__actions {
    align-items: center;
    display: flex;
    flex-direction: column;
    gap: var(--spacing-md);
  }

  &__submit {
    width: 100%;
  }

  &__back {
    align-self: center;
    gap: var(--spacing-2xs);
  }
}
</style>
