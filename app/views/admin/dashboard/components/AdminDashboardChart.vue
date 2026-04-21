<template>
  <AppCard :title="$t('ADMIN_DASH_CHART_TITLE')">
    <template #header-action>
      <div class="chart-periods">
        <button v-for="p in periods" :key="p" class="chart-periods__btn" :class="{ 'chart-periods__btn--active': modelValue === p }" @click="$emit('update:modelValue', p)">{{ periodLabels[p] }}</button>
      </div>
    </template>
    <div class="chart">
      <div class="chart__bars">
        <div v-for="item in data" :key="item.label" class="chart__bar-wrapper">
          <div class="chart__bar" :style="{ height: `${item.value}%` }" />
        </div>
      </div>
      <div class="chart__labels">
        <span v-for="item in data" :key="item.label">{{ item.label }}</span>
      </div>
    </div>
  </AppCard>
</template>
<script setup lang="ts">
import type { IViewsChartData } from '../domain'
defineProps<{ data: IViewsChartData[]; modelValue: string }>()
defineEmits<{ 'update:modelValue': [value: string] }>()
const periods = ['7d', '30d', '90d', 'year'] as const
const periodLabels: Record<string, string> = { '7d': '7д', '30d': '30д', '90d': '90д', year: 'Рік' }
</script>
<style lang="scss" scoped>
.chart-periods { display: flex; gap: var(--spacing-2xs);

  &__btn {
    @include FluidFontCaption;

    background: var(--color-divider);

    border: 1px solid var(--color-border);

    border-radius: var(--radius-sm);

    color: var(--color-text-secondary);

    cursor: pointer;

    padding: var(--spacing-2xs) var(--spacing-sm);

    transition: all 0.2s ease;

    &:hover { color: var(--color-white);

    }

 &--active { background: var(--color-primary);

    border-color: var(--color-primary);

    color: var(--color-white);

    } };

  }

.chart {

  display: flex;

  flex-direction: column;

  gap: var(--spacing-sm);

  min-height: 200px;

  &__bars { align-items: flex-end;

  display: flex;

  flex: 1;

  gap: var(--spacing-xs);

}

  &__bar-wrapper {
    align-items: flex-end;
    display: flex;
    flex: 1;
    justify-content: center;
    min-height: 200px;
  }

  &__bar {
    background: var(--color-primary);
    border-radius: var(--radius-xs) var(--radius-xs) 0 0;
    min-height: 8px;
    transition: height 0.3s ease;
    width: 100%;
  }

  &__labels {
    @include FluidFontCaption;
    color: var(--color-text-tertiary);
    display: flex;
    justify-content: space-around;
    };
  }
</style>
