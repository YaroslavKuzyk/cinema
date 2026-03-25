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
  gap: 24px;
  outline: 3px solid transparent;

  &__button {
    background: rgba($whiteColor, 0.15);
    border: none;
    border-radius: $radiusLg;
    height: 26px;
    position: relative;
    transition: background-color 0.3s ease;
    width: 48px;

    &::before {
      background: $whiteColor;
      border-radius: $radiusFull;
      content: "";
      height: 20px;
      left: 3px;
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
      transition: left 0.3s ease;
      width: 20px;
    }

    &:hover:not(:disabled) {
      cursor: pointer;
      outline: 3px solid $whiteColor;
    }
  }

  &__button--active {
    background: $successColor;

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
    @include FontLabel;
    color: $textSecondaryColor;
  }
}
</style>
