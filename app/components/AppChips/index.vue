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
  background-color: $dividerColor;
  border: 1px solid $borderColor;
  border-radius: $radius3Xl;
  color: $textPrimaryColor;
  cursor: pointer;
  outline: 3px solid transparent;
  padding: 10px 24px;
  transition: background-color 0.3s ease;

  &:hover:not(:disabled) {
    color: $whiteColor;
    outline: 3px solid $whiteColor;
  }

  &--active {
    background-color: $primaryColor;
    color: $whiteColor;
  }

  &--disabled {
    cursor: default;
    opacity: 0.5;
  }
}
</style>
