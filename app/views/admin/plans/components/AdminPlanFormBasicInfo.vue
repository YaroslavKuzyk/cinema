<!-- eslint-disable vue/no-mutating-props -->
<template>
  <AppCard :title="$t('ADMIN_PLAN_FORM_BASIC')" :subtitle="$t('ADMIN_PLAN_FORM_BASIC_DESC')">
    <template #icon>💳</template>
    <div class="plan-basic">
      <div class="plan-basic__row"><AppInput v-model="form.name" :label="$t('ADMIN_PLAN_FORM_NAME') + ' *'" :readonly="readonly" /><AppInput v-model="form.slug" :label="$t('ADMIN_PLAN_FORM_SLUG')" :readonly="readonly" /></div>
      <AppTextarea v-model="form.description" :label="$t('ADMIN_PLAN_FORM_DESCRIPTION')" :readonly="readonly" :rows="2" />
      <div class="plan-basic__row">
        <AppInput v-model="form.price" :label="$t('ADMIN_PLAN_FORM_PRICE') + ' *'" :readonly="readonly" />
        <AppSelect v-model="form.currency" :options="currencyOptions" item-title="title" item-value="value" :label="$t('ADMIN_PLAN_FORM_CURRENCY')" :disabled="readonly" />
        <AppSelect v-model="form.interval" :options="intervalOptions" item-title="title" item-value="value" :label="$t('ADMIN_PLAN_FORM_INTERVAL')" :disabled="readonly" />
        <AppInput v-model="form.trialDays" :label="$t('ADMIN_PLAN_FORM_TRIAL')" :readonly="readonly" />
      </div>
      <div class="plan-basic__row-icon">
        <label class="plan-basic__label">{{ $t('ADMIN_PLAN_FORM_ICON') }}</label>
        <div class="plan-basic__icons">
          <button v-for="icon in iconOptions" :key="icon" class="plan-basic__icon-btn" :class="{ 'plan-basic__icon-btn--active': form.icon === icon }" :disabled="readonly" @click="form.icon = icon">{{ icon }}</button>
        </div>
      </div>
      <AppColorPicker v-model="form.color" :colors="colorPresets" :label="$t('ADMIN_PLAN_FORM_COLOR')" :disabled="readonly" show-input />
    </div>
  </AppCard>
</template>
<script setup lang="ts">
import type { IPlanForm } from '../domain'
defineProps<{ form: IPlanForm; readonly: boolean; iconOptions: string[]; colorPresets: string[]; intervalOptions: { title: string; value: string }[]; currencyOptions: { title: string; value: string }[] }>()
</script>
<style lang="scss" scoped>
.plan-basic {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-md);

  &__row { display: flex;
  gap: var(--spacing-md);

  > * { flex: 1;
  };
}

  &__row-icon {
    display: flex;
    flex-direction: column;
    gap: var(--spacing-sm);
  }

  &__label {
    @include FluidFontLabel;
    color: var(--color-text-secondary);
    text-transform: uppercase;
  }

  &__icons {
    display: flex;
    flex-wrap: wrap;
    gap: var(--spacing-xs);
  }

  &__icon-btn {

    align-items: center;

    background: var(--color-divider);

    border: 2px solid transparent;

    border-radius: var(--radius-md);

    cursor: pointer;

    display: flex;

    font-size: fluid(18px, 24px);

    height: fluid(38px, 46px);

    justify-content: center;

    transition: all 0.2s ease;

    width: fluid(38px, 46px);

    &:hover:not(:disabled) { border-color: var(--color-text-tertiary);

    }

 &--active { background: var(--color-primary-bg);

    border-color: var(--color-primary);

    }

 &:disabled { cursor: default;

    opacity: 0.6;

    } };

  }
</style>
