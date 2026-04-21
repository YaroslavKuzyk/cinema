<template>
  <div class="admin-tx-stats">
    <div class="admin-tx-stats__card"><div class="admin-tx-stats__icon admin-tx-stats__icon--green"><DollarSign :size="20" /></div><div class="admin-tx-stats__data"><span class="admin-tx-stats__number">{{ stats.totalRevenue }}</span><span class="admin-tx-stats__label">{{ $t('ADMIN_TX_STATS_TOTAL_REV') }}</span></div></div>
    <div class="admin-tx-stats__card"><div class="admin-tx-stats__icon admin-tx-stats__icon--blue"><TrendingUp :size="20" /></div><div class="admin-tx-stats__data"><span class="admin-tx-stats__number">{{ stats.monthlyRevenue }}</span><span class="admin-tx-stats__label">{{ $t('ADMIN_TX_STATS_MONTHLY') }}</span></div></div>
    <div class="admin-tx-stats__card"><div class="admin-tx-stats__icon admin-tx-stats__icon--purple"><Receipt :size="20" /></div><div class="admin-tx-stats__data"><span class="admin-tx-stats__number">{{ stats.totalTransactions }}</span><span class="admin-tx-stats__label">{{ $t('ADMIN_TX_STATS_TOTAL') }}</span></div></div>
    <div class="admin-tx-stats__card"><div class="admin-tx-stats__icon admin-tx-stats__icon--gold"><CheckCircle :size="20" /></div><div class="admin-tx-stats__data"><span class="admin-tx-stats__number">{{ stats.successRate }}</span><span class="admin-tx-stats__label">{{ $t('ADMIN_TX_STATS_SUCCESS') }}</span></div></div>
    <div class="admin-tx-stats__card"><div class="admin-tx-stats__icon admin-tx-stats__icon--red"><RotateCcw :size="20" /></div><div class="admin-tx-stats__data"><span class="admin-tx-stats__number">{{ stats.refunds }}</span><span class="admin-tx-stats__label">{{ $t('ADMIN_TX_STATS_REFUNDS') }}</span></div></div>
    <div class="admin-tx-stats__card"><div class="admin-tx-stats__icon admin-tx-stats__icon--yellow"><Wallet :size="20" /></div><div class="admin-tx-stats__data"><span class="admin-tx-stats__number">{{ stats.avgCheck }}</span><span class="admin-tx-stats__label">{{ $t('ADMIN_TX_STATS_AVG') }}</span></div></div>
  </div>
</template>
<script setup lang="ts">
import { DollarSign, TrendingUp, Receipt, CheckCircle, RotateCcw, Wallet } from 'lucide-vue-next'
import type { ITransactionStats } from '../domain'
defineProps<{ stats: ITransactionStats }>()
</script>
<style lang="scss" scoped>
.admin-tx-stats {
  display: grid;
  gap: var(--spacing-md);
  grid-template-columns: repeat(6, minmax(0, 1fr));

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

    &--green { background: var(--color-success-bg);

    color: var(--color-success);

    }

 &--blue { background: var(--color-info-bg);

    color: var(--color-info);

  }

    &--purple {
      background: var(--color-purple-bg);
      color: var(--color-purple);
      }

 &--gold { background: var(--color-warning-bg);
      color: var(--color-warning);
    }

    &--red {
      background: var(--color-primary-bg);
      color: var(--color-primary);
      }

 &--yellow { background: var(--color-warning-bg);
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
