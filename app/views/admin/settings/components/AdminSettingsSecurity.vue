<template>
  <AppCard
    :title="$t('ADMIN_SETTINGS_SECURITY_TITLE')"
    :subtitle="$t('ADMIN_SETTINGS_SECURITY_SUBTITLE')"
  >
    <div class="admin-settings-security">
      <div class="admin-settings-security__section">
        <label class="admin-settings-security__label">{{ $t('ADMIN_SETTINGS_SECURITY_API_PUBLIC') }}</label>
        <div class="admin-settings-security__key-row">
          <AppInput :model-value="api.publicKey" readonly />
          <AppButton variant="ghost" size="small" @click="$emit('copyPublicKey')">
            {{ $t('ADMIN_SETTINGS_SECURITY_COPY') }}
          </AppButton>
        </div>
      </div>

      <div class="admin-settings-security__section">
        <label class="admin-settings-security__label">{{ $t('ADMIN_SETTINGS_SECURITY_API_SECRET') }}</label>
        <div class="admin-settings-security__key-row">
          <AppInput :model-value="api.secretKey" readonly />
          <AppButton variant="ghost" size="small" @click="$emit('toggleSecretKey')">
            {{ $t('ADMIN_SETTINGS_SECURITY_SHOW') }}
          </AppButton>
          <AppButton variant="error" size="small" @click="$emit('regenerateSecretKey')">
            {{ $t('ADMIN_SETTINGS_SECURITY_REGENERATE') }}
          </AppButton>
        </div>
        <span class="admin-settings-security__hint">
          {{ $t('ADMIN_SETTINGS_SECURITY_LAST_GENERATED') }} {{ api.secretKeyLastGenerated }}
        </span>
      </div>

      <div class="admin-settings-security__section">
        <label class="admin-settings-security__label">{{ $t('ADMIN_SETTINGS_SECURITY_WEBHOOK') }}</label>
        <AppInput :model-value="api.webhookUrl" readonly />
      </div>
    </div>
  </AppCard>
</template>

<script setup lang="ts">
import type { ISettingsApi } from '../domain'

defineProps<{
  api: ISettingsApi
}>()

defineEmits<{
  copyPublicKey: []
  toggleSecretKey: []
  regenerateSecretKey: []
}>()
</script>

<style lang="scss" scoped>
.admin-settings-security {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-lg);

  &__label {
    @include FluidFontLabel;
    color: var(--color-text-secondary);
    text-transform: uppercase;
  }

  &__section {
    display: flex;
    flex-direction: column;
    gap: var(--spacing-sm);
  }

  &__key-row {
    align-items: center;
    display: flex;
    gap: var(--spacing-sm);

    > :first-child {

      flex: 1;

      };

    }

  &__hint {
    @include FluidFontCaption;

    color: var(--color-text-tertiary);

  }
}
</style>
