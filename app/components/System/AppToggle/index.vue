<template>
  <div class="app-toggle">
    <button
      class="app-toggle__button"
      :class="[
        { 'app-toggle__button--active': isActive },
        { 'app-toggle__button--disabled': disabled },
      ]"
      :disabled="disabled"
    />
    <span v-if="label" class="app-toggle__label">{{ label }}</span>
  </div>
</template>

<script lang="ts" setup>
import type { IProps } from "./index.types";

const props = withDefaults(defineProps<IProps>(), {
  label: "",
  disabled: false,
});

const isActive = useModel(props, "modelValue");
</script>

<style lang="scss" scoped>
.app-toggle {
  align-items: center;
  border: none;
  display: flex;
  gap: var(--spacing-lg);
  outline: 3px solid transparent;

  &__button {
    background: var(--color-white-15);
    border: none;
    border-radius: var(--radius-lg);
    height: var(--spacing-lg);
    position: relative;
    transition: background-color 0.3s ease;
    width: var(--spacing-2xl);

    &::before {
      background: var(--color-white);
      border-radius: var(--radius-full);
      content: "";
      height: var(--spacing-md);
      left: 3px;
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
      transition: left 0.3s ease;
      width: var(--spacing-md);
    }

    &:hover:not(:disabled) {
      cursor: pointer;
      outline: 3px solid var(--color-white);
    }
  }

  &__button--active {
    background: var(--color-success);

    &::before {
      left: auto;
      right: 3px;
    }
  }

  &__button--disabled {
    cursor: default;
    opacity: 0.5;
  }

  &__label {
    @include FluidFontLabel;
    color: var(--color-text-secondary);
  }
}
</style>
