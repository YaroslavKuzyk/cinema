<template>
  <div class="forgot-password-form">
    <AuthFormField :label="$t('EMAIL')">
      <AppInput
        v-model="email"
        type="email"
        :placeholder="$t('EMAIL_PLACEHOLDER')"
      />
    </AuthFormField>
  </div>
</template>

<script setup lang="ts">
import AuthFormField from "./AuthFormField.vue";

const email = defineModel<string>("email", { default: "" });
</script>

<style lang="scss" scoped>
.forgot-password-form {
  margin-bottom: var(--spacing-xs);
}
</style>
