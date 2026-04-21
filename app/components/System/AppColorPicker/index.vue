<template>
  <div class="app-color-picker">
    <label v-if="props.label" class="app-color-picker__label">{{ props.label }}</label>
    <div class="app-color-picker__row">
      <div class="app-color-picker__colors">
        <button
          v-for="color in props.colors"
          :key="color"
          class="app-color-picker__btn"
          :class="{ 'app-color-picker__btn--active': props.modelValue === color }"
          :style="{ background: color }"
          :disabled="props.disabled"
          @click="emit('update:modelValue', color)"
        />
      </div>
      <AppInput
        v-if="props.showInput"
        :model-value="props.modelValue"
        width="120px"
        @update:model-value="emit('update:modelValue', $event)"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import type { IProps, IEmits } from './index.types'

const props = withDefaults(defineProps<IProps>(), {
  label: '',
  disabled: false,
  showInput: false,
})

const emit = defineEmits<IEmits>()
</script>

<style lang="scss" scoped>
.app-color-picker {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-sm);

  &__label {
    @include FluidFontLabel;
    color: var(--color-text-secondary);
    text-transform: uppercase;
  }

  &__row {
    align-items: center;
    display: flex;
    gap: var(--spacing-sm);
  }

  &__colors {
    display: flex;
    gap: var(--spacing-xs);
  }

  &__btn {
    border: 2px solid transparent;
    border-radius: var(--radius-full);
    cursor: pointer;
    height: fluid(32px, 40px);
    outline: 3px solid transparent;
    transition: all 0.3s ease;
    width: fluid(32px, 40px);

    &:hover:not(:disabled) {
      outline: 3px solid var(--color-white-20);
    }

    &:disabled {
      cursor: default;
    }

    &--active {
      outline: 3px solid var(--color-white);
    }
  }
}
</style>
