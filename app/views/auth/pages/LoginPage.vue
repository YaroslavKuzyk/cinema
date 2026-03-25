<template>
  <AuthLayout :title="$t('LOGIN')" :subtitle="$t('LOGIN_SUBTITLE')">
    <AuthVariantSwitcher
      :model-value="'login'"
      :options="[
        { value: 'login', label: $t('LOGIN') },
        { value: 'register', label: $t('REGISTER') },
      ]"
      active-variant="primary"
      @update:model-value="onAuthTypeChange"
    />

    <AuthVariantSwitcher
      v-model="loginVariant"
      :options="[
        { value: 'phone', label: $t('PHONE_NUMBER') },
        { value: 'email', label: $t('EMAIL') },
      ]"
    />

    <PhoneLoginForm
      v-if="loginVariant === 'phone'"
      v-model:phone-number="form.values.phoneNumber"
      v-model:code="form.values.code"
      :code-sent="codeSent"
      @submit="onSubmit"
      @send-code="sendCode"
    />

    <EmailLoginForm
      v-else
      v-model:email="form.values.email"
      v-model:password="form.values.password"
    />

    <AppButton
      class="login-page__submit"
      :loading="isLoading"
      @click="onSubmit"
    >
      {{ $t("LOGIN") }}
    </AppButton>

    <template #footer>
      <span>{{ $t("HAVE_NO_ACCOUNT") }}</span>
      <NuxtLink :to="localePath('/register')" class="app-link">
        {{ $t("REGISTERATION") }}
      </NuxtLink>
    </template>
  </AuthLayout>
</template>

<script setup lang="ts">
import {
  AuthLayout,
  AuthVariantSwitcher,
  PhoneLoginForm,
  EmailLoginForm,
} from "../components";
import { useLoginForm } from "../composables";

const localePath = useLocalePath();
const router = useRouter();

const { form, isLoading, codeSent, sendCode, onSubmit } = useLoginForm();

const loginVariant = ref<"phone" | "email">("phone");

const onAuthTypeChange = (value: string) => {
  if (value === "register") {
    router.push(localePath("/register"));
  }
};
</script>

<style lang="scss" scoped>
.login-page {
  &__submit {
    width: 100%;
  }
}
</style>
