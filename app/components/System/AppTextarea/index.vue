<template>
  <div class="app-textarea">
    <label v-if="label" :for="textareaId" class="app-textarea__label">
      {{ label }}
    </label>
    <textarea
      :id="textareaId"
      v-model="value"
      v-bind="$attrs"
      :name="textareaId"
      :readonly="readonly"
      :rows="rows"
      :placeholder="placeholder"
      class="app-textarea__field"
      :class="{ 'app-textarea__field--readonly': readonly }"
    />
  </div>
</template>

<script lang="ts" setup>
import { useId } from "vue";
import type { IProps } from "./index.types";

const props = withDefaults(defineProps<IProps>(), {
  label: "",
  readonly: false,
  rows: 3,
  placeholder: "",
});

const textareaId = useId();
const value = useModel(props, "modelValue");
</script>

<style lang="scss" scoped>
.app-textarea {
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
    font-family: inherit;
    outline: 3px solid transparent;
    padding: var(--spacing-sm) var(--spacing-base);
    resize: vertical;
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
      resize: none;
    }
  }
}
</style>
