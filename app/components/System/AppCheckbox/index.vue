<template>
  <div class="app-checkbox">
    <button
      class="app-checkbox__button"
      :class="[
        { 'app-checkbox__button--active': isActive },
        { 'app-checkbox__button--disabled': disabled },
      ]"
      :disabled="disabled"
    >
      <Check v-if="isActive" class="app-checkbox__icon" />
    </button>
    <span v-if="label" class="app-checkbox__label">{{ label }}</span>
  </div>
</template>

<script lang="ts" setup>
import type { IProps } from "./index.types";
import { Check } from "lucide-vue-next";

const props = withDefaults(defineProps<IProps>(), {
  label: "",
  disabled: false,
});

const isActive = useModel(props, "modelValue");
</script>

<style lang="scss" scoped>
.app-checkbox {
  align-items: center;
  border: none;
  display: flex;
  gap: var(--spacing-lg);
  outline: 3px solid transparent;

  &__button {
    align-items: center;
    background: var(--color-divider);
    border: 2px solid var(--color-white-15);
    border-radius: var(--radius-2xs);
    color: var(--color-white);
    display: flex;
    height: var(--spacing-lg);
    justify-content: center;
    transition: background-color 0.3s ease;
    width: var(--spacing-lg);

    &:hover:not(:disabled) {
      cursor: pointer;
      outline: 3px solid var(--color-white);
    }
  }

  &__button--active {
    background: var(--color-primary);
    border-color: var(--color-primary);
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
