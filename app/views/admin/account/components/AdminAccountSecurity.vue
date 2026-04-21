<template>
  <AppCard
    :title="$t('ADMIN_ACCOUNT_SECURITY')"
    :subtitle="$t('ADMIN_ACCOUNT_SECURITY_SUBTITLE')"
  >
    <div class="admin-account-security">
      <div class="admin-account-security__row">
        <AppInput
          :label="$t('ADMIN_ACCOUNT_CURRENT_PASSWORD')"
          :model-value="modelValue.currentPassword"
          :placeholder="$t('ADMIN_ACCOUNT_CURRENT_PASSWORD_PLACEHOLDER')"
          :disabled="readonly"
          type="password"
          @update:model-value="updateField('currentPassword', $event)"
        />
        <AppInput
          :label="$t('ADMIN_ACCOUNT_NEW_PASSWORD')"
          :model-value="modelValue.newPassword"
          :placeholder="$t('ADMIN_ACCOUNT_NEW_PASSWORD_PLACEHOLDER')"
          :disabled="readonly"
          type="password"
          @update:model-value="updateField('newPassword', $event)"
        />
      </div>

      <div class="admin-account-security__toggle-row">
        <div class="admin-account-security__toggle-left">
          <div>
            <p>{{ $t('ADMIN_ACCOUNT_2FA') }}</p>
            <span>{{ $t('ADMIN_ACCOUNT_2FA_DESCRIPTION') }}</span>
          </div>
        </div>
        <div class="admin-account-security__toggle-action">
          <AppToggle
            :model-value="modelValue.is2faEnabled"
            :disabled="readonly"
            @update:model-value="updateField('is2faEnabled', $event)"
          />
        </div>
      </div>

      <div class="admin-account-security__toggle-row">
        <div class="admin-account-security__toggle-left">
          <div>
            <p>{{ $t('ADMIN_ACCOUNT_EMAIL_LOGIN') }}</p>
            <span>{{ $t('ADMIN_ACCOUNT_EMAIL_LOGIN_DESCRIPTION') }}</span>
          </div>
        </div>
        <div class="admin-account-security__toggle-action">
          <AppToggle
            :model-value="modelValue.isEmailLoginEnabled"
            :disabled="readonly"
            @update:model-value="updateField('isEmailLoginEnabled', $event)"
          />
        </div>
      </div>

      <div v-if="!readonly" class="admin-account-security__actions">
        <AppButton size="small" :icon-left="Check" @click="$emit('save')">
          {{ $t('ADMIN_ACCOUNT_SAVE') }}
        </AppButton>
      </div>
    </div>
  </AppCard>
</template>

<script setup lang="ts">
import { Check } from 'lucide-vue-next'
import type { IAdminAccountSecurity } from '../domain'

interface Props {
  modelValue: IAdminAccountSecurity
  readonly?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  readonly: true,
})

const emit = defineEmits<{
  'update:modelValue': [value: IAdminAccountSecurity]
  save: []
}>()

const updateField = <K extends keyof IAdminAccountSecurity>(
  field: K,
  value: IAdminAccountSecurity[K]
) => {
  emit('update:modelValue', { ...props.modelValue, [field]: value })
}
</script>

<style lang="scss" scoped>
.admin-account-security {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-md);

  &__row {

    display: flex;

    gap: var(--spacing-md);

  }

  &__toggle-row {
    align-items: center;
    display: flex;
    gap: var(--spacing-md);
    justify-content: space-between;
  }

  &__toggle-left {
    align-items: center;
    display: flex;
    gap: var(--spacing-sm);

    div {
      display: flex;
      flex-direction: column;
      gap: var(--spacing-3xs);
    }

    span {
      @include FluidFontBodySm;

      color: var(--color-text-tertiary);

    }
  }

  &__actions {
    display: flex;
    gap: var(--spacing-md);
    justify-content: flex-end;
  }
}
</style>
