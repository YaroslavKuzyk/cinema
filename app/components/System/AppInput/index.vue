<template>
  <div class="app-input" :style="width ? { width, flexShrink: 0 } : undefined">
    <label v-if="label" :for="inputId" class="app-input__label">{{
      label
    }}</label>
    <input
      :id="inputId"
      v-model="value"
      v-bind="$attrs"
      :name="inputId"
      :readonly="readonly"
      class="app-input__field"
      :class="{ 'app-input__field--readonly': readonly }"
    >
  </div>
</template>

<script lang="ts" setup>
import { useId } from "vue";
import type { IProps } from "./index.types";

const props = withDefaults(defineProps<IProps>(), {
  label: "",
  readonly: false,
});

const inputId = useId();
const value = useModel(props, "modelValue");
</script>

<style lang="scss" scoped>
.app-input {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-xs);
  width: 100%;

  &__label {
    @include FluidFontLabel;
    color: var(--color-text-secondary);
  }

  &__field {
    @include FluidFontBodySm;
    background-color: var(--color-divider);
    border: 2px solid var(--color-border);
    border-radius: var(--radius-md);
    color: var(--color-white);
    height: var(--input-field-height);
    outline: 3px solid transparent;
    padding: 0 var(--spacing-base);
    transition: background-color 0.3s ease;

    &::placeholder {
      color: var(--color-placeholder);
    }

    &:hover:not(:disabled, &--readonly) {
      color: var(--color-white);
      outline: 3px solid var(--color-white);
    }

    &:focus:not(&--readonly) {
      border-color: var(--color-primary);
    }

    &:disabled {
      cursor: default;
      opacity: 0.5;
    }

    &--readonly {
      cursor: default;
    }

    &::-webkit-outer-spin-button,
    &::-webkit-inner-spin-button {
      appearance: none;
      margin: 0;
    }

    &[type="number"] {
      appearance: textfield;
    }
  }
}
</style>
