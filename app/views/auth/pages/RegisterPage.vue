<template>
  <AuthLayout :title="$t('REGISTER')" :subtitle="$t('REGISTER_SUBTITLE')">
    <AuthVariantSwitcher
      :model-value="'register'"
      :options="[
        { value: 'login', label: $t('LOGIN') },
        { value: 'register', label: $t('REGISTER') },
      ]"
      active-variant="primary"
      @update:model-value="onAuthTypeChange"
    />

    <RegisterForm
      v-model:first-name="form.values.firstName"
      v-model:last-name="form.values.lastName"
      v-model:email="form.values.email"
      v-model:phone-number="form.values.phoneNumber"
      v-model:password="form.values.password"
      v-model:confirm-password="form.values.confirmPassword"
      v-model:terms-accepted="form.values.termsAccepted"
    />

    <AppButton
      class="register-page__submit"
      :loading="isLoading"
      @click="onSubmit"
    >
      {{ $t("REGISTERATION") }}
    </AppButton>

    <template #footer>
      <span>{{ $t("HAVE_ACCOUNT") }}</span>
      <NuxtLink :to="localePath('/login')" class="app-link">
        {{ $t("LOGIN") }}
      </NuxtLink>
    </template>
  </AuthLayout>
</template>

<script setup lang="ts">
import { AuthLayout, AuthVariantSwitcher, RegisterForm } from "../components";
import { useRegisterForm } from "../composables";

const localePath = useLocalePath();
const router = useRouter();

const { form, isLoading, onSubmit } = useRegisterForm();

const onAuthTypeChange = (value: string) => {
  if (value === "login") {
    router.push(localePath("/login"));
  }
};
</script>

<style lang="scss" scoped>
.register-page {
  &__submit {
    width: 100%;
  }
}
</style>
