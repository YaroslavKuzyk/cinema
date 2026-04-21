<template>
  <div class="admin-users-stats">
    <div class="admin-users-stats__card"><div class="admin-users-stats__icon admin-users-stats__icon--red"><Users :size="20" /></div><div class="admin-users-stats__data"><span class="admin-users-stats__number">{{ stats.total }}</span><span class="admin-users-stats__label">{{ $t('ADMIN_USERS_STATS_TOTAL') }}</span></div></div>
    <div class="admin-users-stats__card"><div class="admin-users-stats__icon admin-users-stats__icon--green"><UserCheck :size="20" /></div><div class="admin-users-stats__data"><span class="admin-users-stats__number">{{ stats.active }}</span><span class="admin-users-stats__label">{{ $t('ADMIN_USERS_STATS_ACTIVE') }}</span></div></div>
    <div class="admin-users-stats__card"><div class="admin-users-stats__icon admin-users-stats__icon--yellow"><Ban :size="20" /></div><div class="admin-users-stats__data"><span class="admin-users-stats__number">{{ stats.banned }}</span><span class="admin-users-stats__label">{{ $t('ADMIN_USERS_STATS_BANNED') }}</span></div></div>
    <div class="admin-users-stats__card"><div class="admin-users-stats__icon admin-users-stats__icon--blue"><UserPlus :size="20" /></div><div class="admin-users-stats__data"><span class="admin-users-stats__number">{{ stats.newThisMonth }}</span><span class="admin-users-stats__label">{{ $t('ADMIN_USERS_STATS_NEW') }}</span></div></div>
    <div class="admin-users-stats__card"><div class="admin-users-stats__icon admin-users-stats__icon--gold"><Clock :size="20" /></div><div class="admin-users-stats__data"><span class="admin-users-stats__number">{{ stats.totalWatchHours }}</span><span class="admin-users-stats__label">{{ $t('ADMIN_USERS_STATS_HOURS') }}</span></div></div>
  </div>
</template>
<script setup lang="ts">
import { Users, UserCheck, Ban, UserPlus, Clock } from 'lucide-vue-next'
import type { IUserStats } from '../domain'
defineProps<{ stats: IUserStats }>()
</script>
<style lang="scss" scoped>
.admin-users-stats {
  display: grid;
  gap: var(--spacing-md);
  grid-template-columns: repeat(5, minmax(0, 1fr));

  @media (width <= 1400px) { grid-template-columns: repeat(3, minmax(0, 1fr));
}

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

    &--red { background: var(--color-primary-bg);

    color: var(--color-primary);

    }

 &--green { background: var(--color-success-bg);

    color: var(--color-success);

  }

    &--yellow {
      background: var(--color-warning-bg);
      color: var(--color-warning);
    }

    &--blue {
      background: var(--color-info-bg);
      color: var(--color-info);
      }

 &--gold { background: var(--color-warning-bg);
      color: var(--color-warning);
      };
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
    };
  }
</style>
