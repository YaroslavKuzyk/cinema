<template>
  <button
    class="app-badge"
    :class="[
      `app-badge--${props.variant}`,
      { 'app-badge--read-only': props.readOnly },
    ]"
  >
    <slot/>
  </button>
</template>

<script lang="ts" setup>
import type { IProps } from "./index.types";

const props = withDefaults(defineProps<IProps>(), {
  variant: "basic",
  readOnly: true,
});
</script>

<style lang="scss" scoped>
.app-badge {
  @include FluidFontCaption;
  align-items: center;
  border: none;
  border-radius: var(--radius-2xs);
  cursor: pointer;
  display: flex;
  font-weight: 500;
  justify-content: center;
  outline: 3px solid transparent;
  padding: var(--spacing-2xs) var(--spacing-xs);
  transition: all 0.3s ease;

  &:hover {
    outline: 3px solid var(--color-white);
  }

  &--read-only {
    cursor: default;

    &:hover {
      outline: 3px solid transparent;
    }
  }

  &--basic {
    background: var(--color-border);
    color: var(--color-text-secondary);
  }

  &--primary {
    background: var(--color-primary-bg);
    color: var(--color-primary);
  }

  &--danger {
    background: var(--color-danger-bg);
    color: var(--color-danger);
  }

  &--success {
    background: var(--color-success-bg);
    color: var(--color-success);
  }

  &--info {
    background: var(--color-info-bg);
    color: var(--color-info);
  }

  &--purple {
    background: var(--color-purple-bg);
    color: var(--color-purple);
  }

  &--warning {
    background: var(--color-warning-bg);
    color: var(--color-warning);
  }
}
</style>
