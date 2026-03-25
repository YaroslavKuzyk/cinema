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
  gap: 24px;
  outline: 3px solid transparent;

  &__button {
    align-items: center;
    background: $dividerColor;
    border: 2px solid rgba($whiteColor, 0.15);
    border-radius: $radius2Xs;
    color: $whiteColor;
    display: flex;
    height: 24px;
    justify-content: center;
    transition: background-color 0.3s ease;
    width: 24px;

    &:hover:not(:disabled) {
      cursor: pointer;
      outline: 3px solid $whiteColor;
    }
  }

  &__button--active {
    background: $primaryColor;
    border-color: $primaryColor;
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
