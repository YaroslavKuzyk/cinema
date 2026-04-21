<template>
  <div class="dash-stats">
    <div class="dash-stats__card">
      <div class="dash-stats__header"><div class="dash-stats__icon dash-stats__icon--red"><Users :size="20" /></div><span class="dash-stats__change dash-stats__change--up">↑ {{ stats.activeUsersChange }}%</span></div>
      <span class="dash-stats__number">{{ formatNumber(stats.activeUsers) }}</span>
      <span class="dash-stats__label">{{ $t('ADMIN_DASH_STAT_USERS') }}</span>
    </div>
    <div class="dash-stats__card">
      <div class="dash-stats__header"><div class="dash-stats__icon dash-stats__icon--green"><DollarSign :size="20" /></div><span class="dash-stats__change dash-stats__change--up">↑ {{ stats.revenueChange }}%</span></div>
      <span class="dash-stats__number">{{ stats.monthlyRevenue }}</span>
      <span class="dash-stats__label">{{ $t('ADMIN_DASH_STAT_REVENUE') }}</span>
    </div>
    <div class="dash-stats__card">
      <div class="dash-stats__header"><div class="dash-stats__icon dash-stats__icon--blue"><Play :size="20" /></div><span class="dash-stats__change dash-stats__change--up">↑ {{ stats.viewsChange }}%</span></div>
      <span class="dash-stats__number">{{ stats.monthlyViews }}</span>
      <span class="dash-stats__label">{{ $t('ADMIN_DASH_STAT_VIEWS') }}</span>
    </div>
    <div class="dash-stats__card">
      <div class="dash-stats__header"><div class="dash-stats__icon dash-stats__icon--purple"><Film :size="20" /></div><span class="dash-stats__change dash-stats__change--down">↓ {{ stats.contentChange }}%</span></div>
      <span class="dash-stats__number">{{ formatNumber(stats.totalContent) }}</span>
      <span class="dash-stats__label">{{ $t('ADMIN_DASH_STAT_CONTENT') }}</span>
    </div>
  </div>
</template>
<script setup lang="ts">
import { Users, DollarSign, Play, Film } from 'lucide-vue-next'
import type { IDashboardStats } from '../domain'
defineProps<{ stats: IDashboardStats }>()
const formatNumber = (n: number) => n.toLocaleString('uk-UA')
</script>
<style lang="scss" scoped>
.dash-stats {
  display: grid;
  gap: var(--spacing-md);
  grid-template-columns: repeat(4, minmax(0, 1fr));

  &__card { background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-xl);
  display: flex;
  flex-direction: column;
  gap: var(--spacing-xs);
  padding: var(--spacing-lg);
}

  &__header {
    align-items: center;
    display: flex;
    justify-content: space-between;
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

 &--purple { background: var(--color-purple-bg);
      color: var(--color-purple);
      };
    }

  &__change {
    @include FluidFontCaption;

    font-weight: 600;

    &--up { color: var(--color-success);

    }

 &--down { color: var(--color-primary);

    };

  }

  &__number {
    @include FluidFontH2;
    color: var(--color-white);
    font-weight: 800;
  }

  &__label {
    @include FluidFontCaption;
    color: var(--color-text-secondary);
    };
  }
</style>
