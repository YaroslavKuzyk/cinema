<template>
  <div class="admin-plans-stats">
    <div class="admin-plans-stats__card"><div class="admin-plans-stats__icon admin-plans-stats__icon--red"><CreditCard :size="20" /></div><div class="admin-plans-stats__data"><span class="admin-plans-stats__number">{{ stats.total }}</span><span class="admin-plans-stats__label">{{ $t('ADMIN_PLANS_STATS_TOTAL') }}</span></div></div>
    <div class="admin-plans-stats__card"><div class="admin-plans-stats__icon admin-plans-stats__icon--green"><CheckCircle :size="20" /></div><div class="admin-plans-stats__data"><span class="admin-plans-stats__number">{{ stats.active }}</span><span class="admin-plans-stats__label">{{ $t('ADMIN_PLANS_STATS_ACTIVE') }}</span></div></div>
    <div class="admin-plans-stats__card"><div class="admin-plans-stats__icon admin-plans-stats__icon--blue"><Users :size="20" /></div><div class="admin-plans-stats__data"><span class="admin-plans-stats__number">{{ formatNumber(stats.totalSubscribers) }}</span><span class="admin-plans-stats__label">{{ $t('ADMIN_PLANS_STATS_SUBSCRIBERS') }}</span></div></div>
    <div class="admin-plans-stats__card"><div class="admin-plans-stats__icon admin-plans-stats__icon--gold"><DollarSign :size="20" /></div><div class="admin-plans-stats__data"><span class="admin-plans-stats__number">{{ stats.monthlyRevenue }}</span><span class="admin-plans-stats__label">{{ $t('ADMIN_PLANS_STATS_REVENUE') }}</span></div></div>
  </div>
</template>
<script setup lang="ts">
import { CreditCard, CheckCircle, Users, DollarSign } from 'lucide-vue-next'
import type { IPlanStats } from '../domain'
defineProps<{ stats: IPlanStats }>()
const formatNumber = (n: number) => n.toLocaleString('uk-UA')
</script>
<style lang="scss" scoped>
.admin-plans-stats {
  display: grid;
  gap: var(--spacing-md);
  grid-template-columns: repeat(4, minmax(0, 1fr));

  &__card { align-items: center;
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
