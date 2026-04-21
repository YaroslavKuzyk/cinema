<template>
  <div class="app-date-picker" :class="{ 'app-date-picker--disabled': props.disabled }">
    <label v-if="props.label" class="app-date-picker__label">
      {{ props.label }}
    </label>
    <ClientOnly>
      <VueDatePicker
        v-model="model"
        range
        :enable-time-picker="false"
        :placeholder="props.placeholder"
        :disabled="props.disabled"
        auto-apply
        :dark="true"
        :format="formatDate"
        :format-locale="uk"
        :teleport="true"
      />
    </ClientOnly>
  </div>
</template>

<script setup lang="ts">
import { VueDatePicker } from '@vuepic/vue-datepicker'
import '@vuepic/vue-datepicker/dist/main.css'
import { uk } from 'date-fns/locale'
import type { IProps, IEmits } from './index.types'

const props = withDefaults(defineProps<IProps>(), {
  label: '',
  placeholder: '',
  disabled: false,
})

const emit = defineEmits<IEmits>()

const model = computed({
  get: () => props.modelValue,
  set: (value) => emit('update:modelValue', value as Date[] | null),
})

const formatDate = (dates: Date[]) => {
  if (!dates || dates.length === 0) return ''
  const format = (d: Date) => d.toLocaleDateString('uk-UA', { day: '2-digit', month: '2-digit', year: 'numeric' })
  if (dates.length === 1) return format(dates[0])
  return `${format(dates[0])} — ${format(dates[1])}`
}
</script>

<style lang="scss" scoped>
.app-date-picker {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-xs);

  &--disabled {
    opacity: 0.5;
    pointer-events: none;
  }

  &__label {
    @include FluidFontLabel;
    color: var(--color-text-secondary);
  }

  :deep(.dp__theme_dark) {
    --dp-background-color: var(--color-surface-alt);
    --dp-text-color: var(--color-text-primary);
    --dp-hover-color: var(--color-white-10);
    --dp-hover-text-color: var(--color-white);
    --dp-primary-color: var(--color-primary);
    --dp-primary-disabled-color: var(--color-primary-bg);
    --dp-primary-text-color: var(--color-white);
    --dp-secondary-color: var(--color-text-tertiary);
    --dp-border-color: var(--color-border);
    --dp-menu-border-color: var(--color-border);
    --dp-border-color-hover: var(--color-white-20);
    --dp-disabled-color: var(--color-divider);
    --dp-icon-color: var(--color-text-secondary);
    --dp-danger-color: var(--color-danger);
    --dp-success-color: var(--color-success);
    --dp-highlight-color: var(--color-primary-bg);
    --dp-range-between-dates-background-color: var(--color-primary-bg);
    --dp-range-between-dates-text-color: var(--color-white);
    --dp-range-between-border-color: var(--color-primary-bg);
  }

  :deep(.dp__input) {
    @include FluidFontBodySm;
    background-color: var(--color-divider);
    border: 2px solid var(--color-border);
    border-radius: var(--radius-md);
    color: var(--color-white);
    outline: 3px solid transparent;
    padding: var(--spacing-sm) var(--spacing-base) var(--spacing-sm) calc(var(--spacing-base) + 20px);
    transition: all 0.3s ease;

    &:hover {
      outline: 3px solid var(--color-white);
    }

    &::placeholder {
      color: var(--color-placeholder);
    }
  }

  :deep(.dp__input_focus) {
    border-color: var(--color-primary);
  }

  :deep(.dp__input_icon) {
    color: var(--color-text-secondary);
  }

  :deep(.dp__clear_icon) {
    color: var(--color-text-secondary);
  }

  :deep(.dp__menu) {
    @include FluidShadowMd;
    background-color: var(--color-surface-alt);
    border: 1px solid var(--color-border);
    border-radius: var(--radius-lg);
  }

  :deep(.dp__arrow_top),
  :deep(.dp__arrow_bottom) {
    display: none;
  }

  :deep(.dp__cell_inner) {
    border-radius: var(--radius-sm);
  }

  :deep(.dp__range_start),
  :deep(.dp__range_end) {
    border-radius: var(--radius-sm);
  }

  :deep(.dp__today) {
    border-color: var(--color-primary);
  }

  :deep(.dp__action_row) {
    border-top: 1px solid var(--color-border);
  }

  :deep(.dp__action_button) {
    @include FluidFontCaption;
    border-radius: var(--radius-sm);
  }

  :deep(.dp__month_year_select) {
    @include FluidFontBodySm;
    color: var(--color-white);

    &:hover {
      background-color: var(--color-white-10);
      color: var(--color-white);
    }
  }

  :deep(.dp__calendar_header_item) {
    @include FluidFontCaption;
    color: var(--color-text-tertiary);
  }
}
</style>
