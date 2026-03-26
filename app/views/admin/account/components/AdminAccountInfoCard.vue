<template>
  <AppCard :title="$t('ADMIN_ACCOUNT_INFO')">
    <div class="admin-account-info-card">
      <div class="admin-account-info-card__row">
        <span class="admin-account-info-card__label">{{ $t('ADMIN_ACCOUNT_INFO_ROLE') }}</span>
        <span class="admin-account-info-card__value admin-account-info-card__value--primary">
          {{ info.role }}
        </span>
      </div>
      <div class="admin-account-info-card__row">
        <span class="admin-account-info-card__label">{{ $t('ADMIN_ACCOUNT_INFO_STATUS') }}</span>
        <span class="admin-account-info-card__value admin-account-info-card__value--success">
          {{ info.status === 'online' ? $t('ADMIN_ACCOUNT_INFO_STATUS_ONLINE') : 'Offline' }}
        </span>
      </div>
      <div class="admin-account-info-card__row">
        <span class="admin-account-info-card__label">{{ $t('ADMIN_ACCOUNT_INFO_JOINED') }}</span>
        <span class="admin-account-info-card__value">{{ info.joinedAt }}</span>
      </div>
      <div class="admin-account-info-card__row">
        <span class="admin-account-info-card__label">{{ $t('ADMIN_ACCOUNT_INFO_LAST_LOGIN') }}</span>
        <span class="admin-account-info-card__value">
          {{ info.lastLogin === 'now' ? $t('ADMIN_ACCOUNT_INFO_LAST_LOGIN_NOW') : info.lastLogin }}
        </span>
      </div>
      <div class="admin-account-info-card__row">
        <span class="admin-account-info-card__label">{{ $t('ADMIN_ACCOUNT_INFO_2FA') }}</span>
        <span class="admin-account-info-card__value admin-account-info-card__value--success">
          {{ info.is2faEnabled ? $t('ADMIN_ACCOUNT_INFO_2FA_ENABLED') : 'Disabled' }}
        </span>
      </div>
      <div class="admin-account-info-card__row">
        <span class="admin-account-info-card__label">{{ $t('ADMIN_ACCOUNT_INFO_IP') }}</span>
        <span class="admin-account-info-card__value admin-account-info-card__value--mono">
          {{ info.ipAddress }}
        </span>
      </div>
    </div>
  </AppCard>
</template>

<script setup lang="ts">
import type { IAdminAccountInfo } from '../domain'

interface Props {
  info: IAdminAccountInfo
}

defineProps<Props>()
</script>

<style lang="scss" scoped>
.admin-account-info-card {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-md);

  &__row {
    align-items: center;
    display: flex;
    gap: var(--spacing-md);
    justify-content: space-between;
  }

  &__label {
    @include FluidFontBodySm;
    color: var(--color-text-tertiary);
  }

  &__value {
    @include FluidFontBodySm;
    color: var(--color-white);
    font-weight: 600;

    &--success {
      color: var(--color-success);
    }

    &--primary {
      color: var(--color-primary);
    }

    &--mono {
      font-family: monospace;
      letter-spacing: 0.05em;
    }
  }
}
</style>
