<template>
  <AuthLayout
    :title="$t('RESET_PASSWORD_TITLE')"
    :subtitle="$t('RESET_PASSWORD_SUBTITLE')"
  >
    <template #icon>
      <LockKeyhole :size="28" />
    </template>

    <AppAlert
      v-if="isSuccess"
      variant="success"
      class="reset-password-page__alert"
    >
      {{ $t("RESET_PASSWORD_SUCCESS") }}
    </AppAlert>

    <AppAlert v-if="error" variant="danger" class="reset-password-page__alert">
      {{ error }}
    </AppAlert>

    <AppAlert
      v-if="!token"
      variant="danger"
      class="reset-password-page__alert"
    >
      {{ $t("INVALID_RESET_TOKEN") }}
    </AppAlert>

    <form v-if="!isSuccess && token" class="reset-password-page__form" @submit.prevent="onSubmit">
      <ResetPasswordForm
        v-model:password="form.values.password"
        v-model:confirm-password="form.values.confirmPassword"
      />

      <AppButton
        type="submit"
        class="reset-password-page__submit"
        :loading="isLoading"
      >
        {{ $t("SAVE_PASSWORD") }}
      </AppButton>
    </form>

    <AppButton
      v-if="isSuccess"
      as="nuxt-link"
      :to="localePath('/login')"
      class="reset-password-page__submit"
    >
      {{ $t("GO_TO_LOGIN") }}
    </AppButton>
  </AuthLayout>
</template>

<script setup lang="ts">
import { LockKeyhole } from "lucide-vue-next";
import { AuthLayout, ResetPasswordForm } from "../components";
import { useResetPasswordForm } from "../composables";

const localePath = useLocalePath();
const route = useRoute();

const token = computed(() => (route.query.token as string) || "");

const { form, isLoading, error, isSuccess, onSubmit } =
  useResetPasswordForm(token);
</script>

<style lang="scss" scoped>
.reset-password-page {
  &__alert {
    margin-bottom: var(--spacing-md);
  }

  &__form {
    width: 100%;
  }

  &__submit {
    width: 100%;
  }
}
</style>
