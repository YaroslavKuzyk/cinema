<template>
  <div class="admin-admins-stats">
    <div class="admin-admins-stats__card">
      <div class="admin-admins-stats__icon admin-admins-stats__icon--red">
        <UserCog :size="20" />
      </div>
      <div class="admin-admins-stats__data">
        <span class="admin-admins-stats__number">{{ stats.total }}</span>
        <span class="admin-admins-stats__label">{{ $t('ADMIN_ADMINS_STATS_TOTAL') }}</span>
      </div>
    </div>

    <div class="admin-admins-stats__card">
      <div class="admin-admins-stats__icon admin-admins-stats__icon--green">
        <CircleDot :size="20" />
      </div>
      <div class="admin-admins-stats__data">
        <span class="admin-admins-stats__number">{{ stats.online }}</span>
        <span class="admin-admins-stats__label">{{ $t('ADMIN_ADMINS_STATS_ONLINE') }}</span>
      </div>
    </div>

    <div class="admin-admins-stats__card">
      <div class="admin-admins-stats__icon admin-admins-stats__icon--purple">
        <Circle :size="20" />
      </div>
      <div class="admin-admins-stats__data">
        <span class="admin-admins-stats__number">{{ stats.roles }}</span>
        <span class="admin-admins-stats__label">{{ $t('ADMIN_ADMINS_STATS_ROLES') }}</span>
      </div>
    </div>

    <div class="admin-admins-stats__card">
      <div class="admin-admins-stats__icon admin-admins-stats__icon--yellow">
        <Mail :size="20" />
      </div>
      <div class="admin-admins-stats__data">
        <span class="admin-admins-stats__number">{{ stats.pendingInvitations }}</span>
        <span class="admin-admins-stats__label">{{ $t('ADMIN_ADMINS_STATS_PENDING') }}</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { UserCog, CircleDot, Circle, Mail } from 'lucide-vue-next'
import type { IAdminStats } from '../domain'

defineProps<{
  stats: IAdminStats
}>()
</script>

<style lang="scss" scoped>
.admin-admins-stats {
  display: grid;
  gap: var(--spacing-md);
  grid-template-columns: repeat(4, minmax(0, 1fr));

  &__card {
    align-items: center;
    background: var(--color-surface);
    border: 1px solid var(--color-border);
    border-radius: var(--radius-xl);
    display: flex;
    gap: var(--spacing-md);
    padding: var(--spacing-lg);
  }

  &__icon {
    align-items: center;
    border-radius: var(--radius-full);
    display: flex;
    flex-shrink: 0;
    height: fluid(40px, 48px);
    justify-content: center;
    width: fluid(40px, 48px);

    &--red {
      background: var(--color-primary-bg);
      color: var(--color-primary);
    }

    &--green {
      background: var(--color-success-bg);
      color: var(--color-success);
    }

    &--purple {
      background: var(--color-purple-bg);
      color: var(--color-purple);
    }

    &--yellow {
      background: var(--color-warning-bg);
      color: var(--color-warning);
    }
  }

  &__data {
    display: flex;
    flex-direction: column;
    gap: var(--spacing-3xs);
  }

  &__number {
    @include FluidFontH3;
    color: var(--color-white);
    font-weight: 700;
  }

  &__label {
    @include FluidFontCaption;
    color: var(--color-text-secondary);
  }
}
</style>
