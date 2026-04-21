<template>
  <AppCard :title="$t('ADMIN_PLAN_FORM_FEATURES')" :subtitle="$t('ADMIN_PLAN_FORM_FEATURES_DESC')">
    <template #icon>✅</template>
    <div class="plan-features">
      <div v-for="cat in featureCategories" :key="cat.key" class="plan-features__category">
        <h4 class="plan-features__category-title">{{ cat.label }}</h4>
        <div class="plan-features__list">
          <div
            v-for="feature in cat.features"
            :key="feature.id"
            class="plan-features__item"
            :class="{ 'plan-features__item--enabled': getFeatureValue(feature.id)?.enabled }"
          >
            <div class="plan-features__item-left">
              <AppCheckbox
                :model-value="getFeatureValue(feature.id)?.enabled || false"
                :disabled="readonly"
                @update:model-value="$emit('toggleFeature', feature.id)"
              />
              <div class="plan-features__item-info">
                <span class="plan-features__item-label">{{ feature.label }}</span>
                <span class="plan-features__item-desc">{{ feature.description }}</span>
              </div>
            </div>
            <div v-if="feature.valueType === 'number' && getFeatureValue(feature.id)?.enabled" class="plan-features__item-value">
              <AppInput
                :model-value="String(getFeatureValue(feature.id)?.value || '')"
                :readonly="readonly"
                width="80px"
                @update:model-value="$emit('updateFeatureValue', feature.id, Number($event))"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </AppCard>
</template>

<script setup lang="ts">
import type { ISystemFeature, IPlanFeatureValue } from '../domain'

defineProps<{
  featureCategories: { key: string; label: string; features: ISystemFeature[] }[]
  getFeatureValue: (featureId: string) => IPlanFeatureValue | undefined
  readonly: boolean
}>()

defineEmits<{
  toggleFeature: [featureId: string]
  updateFeatureValue: [featureId: string, value: number]
}>()
</script>

<style lang="scss" scoped>
.plan-features {
  display: flex; flex-direction: column; gap: var(--spacing-lg);

  &__category-title {
    @include FluidFontLabel;

    border-bottom: 1px solid var(--color-border);

    color: var(--color-text-secondary);

    margin-bottom: var(--spacing-sm);

    padding-bottom: var(--spacing-sm);

    text-transform: uppercase;

  }

  &__list {

    display: flex;

    flex-direction: column;

    gap: var(--spacing-xs);

  }

  &__item {
    align-items: center; border: 1px solid transparent; border-radius: var(--radius-md);
    display: flex; justify-content: space-between; padding: var(--spacing-sm) var(--spacing-md); transition: all 0.2s ease;

    &--enabled {
      background: var(--color-success-bg);
      border-color: var(--color-success-border);
      };
    }

  &__item-left {

    align-items: center;

    display: flex;

    gap: var(--spacing-sm);

  }

  &__item-info {
    display: flex;
    flex-direction: column;
    gap: var(--spacing-3xs);
  }

  &__item-label {
    @include FluidFontBodySm;
    color: var(--color-white);
    font-weight: 500;
  }

  &__item-desc {
    @include FluidFontCaption;
    color: var(--color-text-tertiary);
  }

  &__item-value {
    flex-shrink: 0;
    };
  }
</style>
