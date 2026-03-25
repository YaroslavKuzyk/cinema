<template>
  <div class="reset-password-form">
    <input
      type="text"
      name="username"
      autocomplete="username"
      class="reset-password-form__hidden-username"
    >

    <AuthFormField :label="$t('NEW_PASSWORD')">
      <AppInput
        v-model="password"
        type="password"
        :placeholder="$t('PASSWORD_PLACEHOLDER')"
        autocomplete="new-password"
      />
    </AuthFormField>

    <AuthFormField :label="$t('CONFIRM_PASSWORD')">
      <AppInput
        v-model="confirmPassword"
        type="password"
        :placeholder="$t('CONFIRM_PASSWORD_PLACEHOLDER')"
        autocomplete="new-password"
      />
    </AuthFormField>
  </div>
</template>

<script setup lang="ts">
import AuthFormField from "./AuthFormField.vue";

const password = defineModel<string>("password", { default: "" });
const confirmPassword = defineModel<string>("confirmPassword", { default: "" });
</script>

<style lang="scss" scoped>
.reset-password-form {
  margin-bottom: var(--spacing-xs);

  &__hidden-username {
    height: 0;
    opacity: 0;
    position: absolute;
    width: 0;
  }
}
</style>
