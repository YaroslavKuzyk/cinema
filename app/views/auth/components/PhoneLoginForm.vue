<template>
  <div class="phone-login-form">
    <AuthFormField :label="$t('PHONE_NUMBER')">
      <AppInput model-value="+380" readonly class="phone-login-form__prefix" />
      <AppInput
        v-model="phoneNumber"
        :placeholder="$t('PHONE_NUMBER_PLACEHOLDER')"
      />
    </AuthFormField>

    <AuthFormField :label="$t('ENTER_SMS_CODE')" class="phone-login-form__code">
      <AppCodeInput v-model="code" @complete="$emit('submit')" />
    </AuthFormField>

    <div class="phone-login-form__actions">
      <template v-if="!codeSent">
        <button class="app-link" @click="$emit('sendCode')">
          {{ $t("SEND_SMS_CODE") }}
        </button>
      </template>
      <template v-else>
        <span>{{
          $t("SMS_CODE_SEND_ON", { phoneNumber: fullPhoneNumber })
        }}</span>
        <button class="app-link" @click="$emit('sendCode')">
          {{ $t("SEND_AGAIN") }}
        </button>
      </template>
    </div>
  </div>
</template>

<script setup lang="ts">
import AuthFormField from "./AuthFormField.vue";

interface Props {
  codeSent?: boolean;
}

withDefaults(defineProps<Props>(), {
  codeSent: false,
});

const phoneNumber = defineModel<string>("phoneNumber", { default: "" });
const code = defineModel<string>("code", { default: "" });

defineEmits<{
  submit: [];
  sendCode: [];
}>();

const fullPhoneNumber = computed(() => `+380${phoneNumber.value}`);
</script>

<style lang="scss" scoped>
.phone-login-form {
  :deep(.phone-login-form__prefix) {
    flex-shrink: 0;
    width: fluid(80px, 120px);
  }

  &__code {
    :deep(.auth-form-field__content) {
      justify-content: center;
    }
  }

  &__actions {
    @include FluidFontBodyMd;
    color: var(--color-text-tertiary);
    display: flex;
    justify-content: flex-end;
    margin-bottom: var(--spacing-xs);

    span {
      margin-right: var(--spacing-2xs);
    }
  }
}
</style>
