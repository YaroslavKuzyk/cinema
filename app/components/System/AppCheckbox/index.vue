<template>
  <div class="app-checkbox">
    <button
      class="app-checkbox__button"
      :class="[
        isActive && `app-checkbox__button--${props.variant}`,
        { 'app-checkbox__button--disabled': disabled },
      ]"
      :disabled="disabled"
      @click="isActive = !isActive"
    >
      <Check v-if="isActive" class="app-checkbox__icon" />
    </button>
    <span v-if="label || $slots.default" class="app-checkbox__label">
      <slot>{{ label }}</slot>
    </span>
  </div>
</template>

<script lang="ts" setup>
import type { IProps } from "./index.types";
import { Check } from "lucide-vue-next";

const props = withDefaults(defineProps<IProps>(), {
  label: "",
  disabled: false,
  variant: "primary",
});

const isActive = useModel(props, "modelValue");
</script>

<style lang="scss" scoped>
.app-checkbox {
  align-items: center;
  border: none;
  display: flex;
  gap: var(--spacing-sm);
  outline: 3px solid transparent;

  &__button {
    align-items: center;
    background: var(--color-divider);
    border: 2px solid var(--color-white-15);
    border-radius: var(--radius-2xs);
    color: var(--color-white);
    display: flex;
    flex-shrink: 0;
    height: var(--spacing-lg);
    justify-content: center;
    transition: background-color 0.3s ease;
    width: var(--spacing-lg);

    &:hover:not(:disabled) {
      cursor: pointer;
      outline: 3px solid var(--color-white);
    }
  }

  &__button--primary {
    background: var(--color-primary);
    border-color: var(--color-primary);
  }

  &__button--success {
    background: var(--color-success);
    border-color: var(--color-success);
  }

  &__button--danger {
    background: var(--color-danger);
    border-color: var(--color-danger);
  }

  &__button--warning {
    background: var(--color-warning);
    border-color: var(--color-warning);
  }

  &__button--info {
    background: var(--color-info);
    border-color: var(--color-info);
  }

  &__button--purple {
    background: var(--color-purple);
    border-color: var(--color-purple);
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
