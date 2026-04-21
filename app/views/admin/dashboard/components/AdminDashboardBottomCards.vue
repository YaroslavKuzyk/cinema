<template>
  <div class="bottom-cards">
    <AppCard :title="$t('ADMIN_DASH_SUBS_TITLE')">
      <div class="subs">
        <div class="subs__row"><span>Basic</span><strong>{{ formatNumber(subscriptions.basic) }}</strong></div>
        <div class="subs__row"><span>Standard</span><strong>{{ formatNumber(subscriptions.standard) }}</strong></div>
        <div class="subs__row"><span>Premium</span><strong>{{ formatNumber(subscriptions.premium) }}</strong></div>
        <div class="subs__divider" />
        <div class="subs__row"><span>{{ $t('ADMIN_DASH_SUBS_CONVERSION') }}</span><strong class="subs__highlight">{{ subscriptions.conversion }}</strong></div>
        <div class="subs__row"><span>{{ $t('ADMIN_DASH_SUBS_CHURN') }}</span><strong class="subs__danger">{{ subscriptions.churn }}</strong></div>
      </div>
    </AppCard>

    <AppCard :title="$t('ADMIN_DASH_TOP_TITLE')">
      <div class="top-content">
        <div v-for="item in topContent" :key="item.id" class="top-content__item">
          <span class="top-content__rank">{{ item.rank }}</span>
          <div class="top-content__poster"><Film :size="16" /></div>
          <div class="top-content__info"><span class="top-content__title">{{ item.title }}</span><span class="top-content__meta">{{ item.meta }}</span></div>
          <span class="top-content__views">{{ item.views }}</span>
        </div>
      </div>
    </AppCard>

    <AppCard :title="$t('ADMIN_DASH_PLATFORMS_TITLE')">
      <div class="platforms">
        <div v-for="p in platforms" :key="p.name" class="platforms__row">
          <span>{{ p.name }}</span><strong>{{ p.percentage }}</strong>
        </div>
      </div>
    </AppCard>
  </div>
</template>
<script setup lang="ts">
import { Film } from 'lucide-vue-next'
import type { ISubscriptionStats, ITopContent, IPlatformStats } from '../domain'
defineProps<{ subscriptions: ISubscriptionStats; topContent: ITopContent[]; platforms: IPlatformStats[] }>()
const formatNumber = (n: number) => n.toLocaleString('uk-UA')
</script>
<style lang="scss" scoped>
.bottom-cards {
  display: grid;
  gap: var(--spacing-lg);
  grid-template-columns: 1fr 1.5fr 1fr;
}

.subs {

  display: flex;

  flex-direction: column;

  gap: var(--spacing-sm);

  &__row { @include FluidFontBodySm;

  display: flex;

  justify-content: space-between;

  span { color: var(--color-text-secondary);

  }

 strong { color: var(--color-white);

  };

}

  &__divider {
    background: var(--color-border);
    height: 1px;
    margin: var(--spacing-xs) 0;
  }
  &__highlight { color: var(--color-success) !important; }

  &__danger {
    color: var(--color-primary) !important;
    };
  }

.top-content {

  display: flex;

  flex-direction: column;

  gap: var(--spacing-sm);

  &__item { align-items: center;

  display: flex;

  gap: var(--spacing-sm);

}

  &__rank {
    @include FluidFontCaption;
    color: var(--color-text-tertiary);
    min-width: 16px;
  }

  &__poster {
    align-items: center;
    background: var(--color-divider);
    border-radius: var(--radius-sm);
    color: var(--color-text-tertiary);
    display: flex;
    flex-shrink: 0;
    height: 36px;
    justify-content: center;
    width: 36px;
  }

  &__info {
    display: flex;
    flex: 1;
    flex-direction: column;
    gap: var(--spacing-3xs);
  }

  &__title {
    @include FluidFontBodySm;
    color: var(--color-white);
    font-weight: 600;
  }

  &__meta {
    @include FluidFontCaption;
    color: var(--color-text-tertiary);
  }

  &__views {
    @include FluidFontBodySm;
    color: var(--color-primary);
    font-weight: 600;
    };
  }

.platforms {

  display: flex;

  flex-direction: column;

  gap: var(--spacing-sm);

  &__row { @include FluidFontBodySm;

  display: flex;

  justify-content: space-between;

  span { color: var(--color-text-secondary);

  }

 strong { color: var(--color-white);

  } };

}
</style>
