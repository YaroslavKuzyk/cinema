<template>
  <div class="admin-account-header">
    <div class="admin-account-header__content">
      <div class="admin-account-header__info">
        <div class="admin-account-header__avatar">
          <AppAvatar size="large" :initials="initials" />
        </div>
        <div class="admin-account-header__details">
          <div class="admin-account-header__name">
            <div class="admin-account-header__name-row">
              <h1>{{ fullName }}</h1>
              <AppBadge variant="primary">{{ role }}</AppBadge>
            </div>
            <div class="admin-account-header__name-row">
              <span>{{ email }} · {{ $t('ADMIN_ACCOUNT_INFO_JOINED') }} {{ joinedAt }}</span>
            </div>
          </div>
          <div class="admin-account-header__stats">
            <div class="admin-account-header__stats-col">
              <p>{{ formatNumber(stats.actionsPerMonth) }}</p>
              <span>{{ $t('ADMIN_ACCOUNT_ACTIONS_PER_MONTH') }}</span>
            </div>
            <div class="admin-account-header__stats-col">
              <p>{{ stats.contentAdded }}</p>
              <span>{{ $t('ADMIN_ACCOUNT_CONTENT_ADDED') }}</span>
            </div>
            <div class="admin-account-header__stats-col">
              <p>{{ stats.daysActive }}</p>
              <span>{{ $t('ADMIN_ACCOUNT_DAYS_ACTIVE') }}</span>
            </div>
          </div>
        </div>
      </div>
      <div class="admin-account-header__actions">
        <AppButton size="small" :icon-left="SquarePen" @click="$emit('edit')">
          {{ $t('ADMIN_ACCOUNT_EDIT') }}
        </AppButton>
      </div>
    </div>
    <div class="admin-account-header__navigation">
      <AppTabs :model-value="activeTab" :tabs="tabs" variant="underline" @update:model-value="$emit('update:activeTab', $event)" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { SquarePen } from 'lucide-vue-next'
import type { IAdminAccountStats, IAdminAccountTab } from '../domain'

interface Props {
  fullName: string
  email: string
  role: string
  joinedAt: string
  stats: IAdminAccountStats
  tabs: IAdminAccountTab[]
  activeTab: string
}

const props = defineProps<Props>()

defineEmits<{
  edit: []
  'update:activeTab': [value: string]
}>()

const initials = computed(() => {
  const names = props.fullName.split(' ')
  return names.map((n) => n[0]).join('').toUpperCase().slice(0, 2)
})

const formatNumber = (num: number) => {
  return num.toLocaleString('uk-UA').replace(',', ' ')
}
</script>

<style lang="scss" scoped>
.admin-account-header {
  background-color: var(--color-background);
  display: flex;
  flex-direction: column;
  gap: var(--spacing-md);
  padding-bottom: var(--spacing-md);
  padding-top: var(--spacing-sm);
  position: sticky;
  top: 0;
  z-index: 10;

  &__content {
    align-items: flex-end;
    display: flex;
    gap: var(--spacing-md);
    justify-content: space-between;
  }

  &__info {
    align-items: center;
    display: flex;
    gap: var(--spacing-md);
  }

  &__name {
    display: flex;
    flex-direction: column;
    gap: var(--spacing-2xs);
  }

  &__name-row {
    align-items: center;
    display: flex;
    gap: var(--spacing-md);

    span {

      color: var(--color-text-tertiary);

      };

    }

  &__stats {
    align-items: center;
    display: flex;
    gap: var(--spacing-md);
    margin-top: var(--spacing-sm);
  }

  &__stats-col {
    display: flex;
    flex-direction: column;

    p {
      @include FluidShadowLg;

      font-weight: 900;

    }

    span {
      @include FluidFontBodySm;

      color: var(--color-text-tertiary);

    }
  }
}
</style>
