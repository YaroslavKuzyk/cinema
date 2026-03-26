<template>
  <div class="email-login-form">
    <AuthFormField :label="$t('EMAIL')">
      <AppInput
        v-model="email"
        type="email"
        :placeholder="$t('EMAIL_PLACEHOLDER')"
        autocomplete="email"
      />
    </AuthFormField>

    <AuthFormField :label="$t('PASSWORD')">
      <AppInput
        v-model="password"
        type="password"
        :placeholder="$t('PASSWORD_PLACEHOLDER')"
        autocomplete="current-password"
      />
    </AuthFormField>

    <div class="email-login-form__actions">
      <NuxtLink :to="localePath({ name: routes.forgotPassword })" class="app-link">
        {{ $t("FORGOT_PASSWORD") }}
      </NuxtLink>
    </div>
  </div>
</template>

<script setup lang="ts">
import AuthFormField from "./AuthFormField.vue";
import { routes } from "../pages";

const localePath = useLocalePath();

const email = defineModel<string>("email", { default: "" });
const password = defineModel<string>("password", { default: "" });
</script>

<style lang="scss" scoped>
.email-login-form {
  &__actions {
    @include FluidFontBodyMd;
    display: flex;
    justify-content: flex-end;
    margin-bottom: var(--spacing-xs);
  }
}
</style>
