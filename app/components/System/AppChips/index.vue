<template>
  <button
    class="app-chips"
    :class="[
      { 'app-chips--active': isActive },
      { 'app-chips--disabled': disabled },
    ]"
    :disabled="disabled"
  >
    <slot/>
  </button>
</template>

<script lang="ts" setup>
import type { IProps } from "./index.types";

const props = withDefaults(defineProps<IProps>(), {
  disabled: false,
});

const isActive = useModel(props, "modelValue");
</script>

<style lang="scss" scoped>
.app-chips {
  @include FluidFontBodySm;
  background-color: var(--color-divider);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-3xl);
  color: var(--color-text-primary);
  cursor: pointer;
  outline: 3px solid transparent;
  padding: var(--spacing-xs) var(--spacing-lg);
  transition: background-color 0.3s ease;

  &:hover:not(:disabled) {
    color: var(--color-white);
    outline: 3px solid var(--color-white);
  }

  &--active {
    background-color: var(--color-primary);
    color: var(--color-white);
  }

  &--disabled {
    cursor: default;
    opacity: 0.5;
  }
}
</style>
