<template>
  <div class="app-input">
    <label v-if="label" :for="inputId" class="app-input__label">{{
      label
    }}</label>
    <input
      :id="inputId"
      v-model="value"
      v-bind="$attrs"
      :name="inputId"
      class="app-input__field"
    >
  </div>
</template>

<script lang="ts" setup>
import { useId } from "vue";
import type { IProps } from "./index.types";

const props = withDefaults(defineProps<IProps>(), {
  label: "",
});

const inputId = useId();
const value = useModel(props, "modelValue");
</script>

<style lang="scss" scoped>
.app-input {
  display: flex;
  flex-direction: column;
  gap: 8px;

  &__label {
    @include FontLabel;
    color: $textSecondaryColor;
  }

  &__field {
    background-color: $dividerColor;
    border: 2px solid $borderColor;
    border-radius: $radiusMd;
    color: $whiteColor;
    outline: 3px solid transparent;
    padding: 16.5px 18px;
    transition: background-color 0.3s ease;

    @include FontBodySm;

    &::placeholder {
      color: $placeholderColor;
    }

    &:hover:not(:disabled) {
      color: $whiteColor;
      outline: 3px solid $whiteColor;
    }

    &:focus {
      border-color: $primaryColor;
    }

    &:disabled {
      cursor: default;
      opacity: 0.5;
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
