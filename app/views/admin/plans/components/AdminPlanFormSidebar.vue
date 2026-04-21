<!-- eslint-disable vue/no-mutating-props -->
<template>
  <div class="plan-sidebar">
    <div class="plan-sidebar__preview" :style="{ borderColor: form.color }">
      <span class="plan-sidebar__icon">{{ form.icon || '💳' }}</span>
      <h3>{{ form.name || $t('ADMIN_PLAN_FORM_UNTITLED') }}</h3>
      <span class="plan-sidebar__price">{{ form.price ? `${form.price} ${form.currency}` : '—' }}<span v-if="form.interval !== 'lifetime'"> / {{ getIntervalShort(form.interval) }}</span></span>
      <div v-if="enabledFeatures.length" class="plan-sidebar__features">
        <div v-for="f in enabledFeatures" :key="f.featureId" class="plan-sidebar__feature">
          <CheckCircle :size="14" class="plan-sidebar__feature--yes" />
          <span>{{ f.label }}{{ f.value ? ` (${f.value})` : '' }}</span>
        </div>
      </div>
    </div>
    <AppCard :title="$t('ADMIN_PLAN_FORM_PUBLICATION')">
      <div class="plan-sidebar__pub">
        <AppSelect v-model="form.status" :options="statusOptions" item-title="title" item-value="value" :label="$t('ADMIN_PLANS_COL_STATUS')" :disabled="readonly" />
        <div class="plan-sidebar__pub-row"><span>{{ $t('ADMIN_PLAN_FORM_IS_FEATURED') }}</span><AppToggle v-model="form.isFeatured" :disabled="readonly" /></div>
      </div>
      <div v-if="!readonly" class="plan-sidebar__actions">
        <AppButton size="medium" variant="primary" @click="$emit('save')">{{ $t('ADMIN_PLAN_FORM_SAVE') }}</AppButton>
      </div>
    </AppCard>
  </div>
</template>
<script setup lang="ts">
import { CheckCircle } from 'lucide-vue-next'
import type { IPlanForm, ISystemFeature } from '../domain'
const { t } = useI18n()
const props = defineProps<{ form: IPlanForm; readonly: boolean; statusOptions: { title: string; value: string }[]; systemFeatures: ISystemFeature[] }>()

const enabledFeatures = computed(() => {
  return props.form.featureValues
    .filter((fv) => fv.enabled)
    .map((fv) => {
      const sf = props.systemFeatures.find((f) => f.id === fv.featureId)
      return { featureId: fv.featureId, label: sf?.label || fv.featureId, value: fv.value }
    })
})
defineEmits<{ save: [] }>()
const getIntervalShort = (i: string) => ({ month: t('ADMIN_PLANS_INTERVAL_MONTH_SHORT'), year: t('ADMIN_PLANS_INTERVAL_YEAR_SHORT'), lifetime: '' }[i] || '')
</script>
<style lang="scss" scoped>
.plan-sidebar { display: flex; flex-direction: column; gap: var(--spacing-lg); width: var(--container-md);

  &__preview {

    background: var(--color-surface);

    border: 2px solid var(--color-border);

    border-radius: var(--radius-xl);

    display: flex;

    flex-direction: column;

    gap: var(--spacing-md);

    padding: var(--spacing-xl);

    text-align: center;

    h3 { @include FluidFontH3;

    color: var(--color-white);

    font-weight: 700;

    };

  }
  &__icon { font-size: 40px; }

  &__price {
    @include FluidFontBodyMd;
    color: var(--color-text-secondary);

    span { @include FluidFontCaption;
    };
  }

  &__features {
    display: flex;
    flex-direction: column;
    gap: var(--spacing-xs);
    text-align: left;
  }

  &__feature {
    @include FluidFontCaption;

    align-items: center;

    color: var(--color-text-primary);

    display: flex;

    gap: var(--spacing-xs);

    &--yes { color: var(--color-success);

    }

 &--no { color: var(--color-text-tertiary);

    };

  }

  &__pub {
    display: flex;
    flex-direction: column;
    gap: var(--spacing-md);
  }

  &__pub-row {
    align-items: center;
    display: flex;
    justify-content: space-between;

    span { @include FluidFontBodySm;
    color: var(--color-text-primary);
    };
  }

  &__actions {
    display: flex;
    flex-direction: column;
    gap: var(--spacing-xs);
    margin-top: var(--spacing-md);
    };
  }
</style>
