<template>
  <div class="register-form">
    <div class="register-form__row">
      <AuthFormField :label="$t('FIRST_NAME')">
        <AppInput
          v-model="firstName"
          :placeholder="$t('FIRST_NAME_PLACEHOLDER')"
          autocomplete="given-name"
        />
      </AuthFormField>

      <AuthFormField :label="$t('LAST_NAME')">
        <AppInput
          v-model="lastName"
          :placeholder="$t('LAST_NAME_PLACEHOLDER')"
          autocomplete="family-name"
        />
      </AuthFormField>
    </div>

    <AuthFormField :label="$t('EMAIL')">
      <AppInput
        v-model="email"
        type="email"
        :placeholder="$t('EMAIL_PLACEHOLDER')"
      />
    </AuthFormField>

    <AuthFormField :label="$t('PHONE_NUMBER')">
      <AppInput model-value="+380" readonly class="register-form__prefix" />
      <AppInput
        v-model="phoneNumber"
        :placeholder="$t('PHONE_NUMBER_PLACEHOLDER')"
        autocomplete="tel"
      />
    </AuthFormField>

    <AuthFormField :label="$t('PASSWORD')">
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

    <div class="register-form__terms">
      <AppCheckbox v-model="termsAccepted">
        {{ $t("TERMS_AGREEMENT") }}
        <NuxtLink to="/terms" class="app-link">{{
          $t("TERMS_OF_SERVICE")
        }}</NuxtLink>
        {{ $t("AND") }}
        <NuxtLink to="/privacy" class="app-link">{{
          $t("PRIVACY_POLICY")
        }}</NuxtLink>
        {{ $t("SERVICE_NAME") }}
      </AppCheckbox>
    </div>
  </div>
</template>

<script setup lang="ts">
import AuthFormField from "./AuthFormField.vue";

const firstName = defineModel<string>("firstName", { default: "" });
const lastName = defineModel<string>("lastName", { default: "" });
const email = defineModel<string>("email", { default: "" });
const phoneNumber = defineModel<string>("phoneNumber", { default: "" });
const password = defineModel<string>("password", { default: "" });
const confirmPassword = defineModel<string>("confirmPassword", { default: "" });
const termsAccepted = defineModel<boolean>("termsAccepted", { default: false });
</script>

<style lang="scss" scoped>
.register-form {
  &__row {
    display: flex;
    gap: var(--spacing-md);

    > * {
      width: calc(50% - var(--spacing-md) / 2);
    }
  }

  :deep(.register-form__prefix) {
    flex-shrink: 0;
    width: fluid(80px, 120px);
  }

  &__terms {
    margin-bottom: var(--spacing-md);
  }
}
</style>
