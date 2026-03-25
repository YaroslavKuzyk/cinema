<template>
  <button
    class="app-button"
    :class="[
      `app-button--${props.variant}`,
      `app-button--${props.size}`,
      { 'app-button--loading': props.loading },
      { 'app-button--disabled': props.disabled },
    ]"
    :disabled="props.disabled"
  >
    <span class="app-button__content">
      <slot />
    </span>

    <div v-if="props.loading" class="app-button__loader">
      <AppLoader :size="getLoaderSize" />
    </div>
  </button>
</template>

<script setup lang="ts">
import type { IProps } from "./index.types";
import AppLoader from "../AppLoader/index.vue";

const props = withDefaults(defineProps<IProps>(), {
  variant: "primary",
  size: "medium",
  loading: false,
  disabled: false,
});

const getLoaderSize = computed(() => {
  switch (props.size) {
    case "small":
      return 20;
    case "large":
      return 30;
    default:
      return 25;
  }
});
</script>

<style scoped lang="scss">
.app-button {
  border: 1px solid transparent;
  box-sizing: border-box;
  color: $whiteColor;
  cursor: pointer;
  font-size: 16px;
  font-weight: 600;
  outline: 3px solid transparent;
  position: relative;
  transition: all 0.3s ease;

  &__content {
    transition: opacity 0.2s ease;
  }

  &__loader {
    display: flex;
    left: 50%;
    position: absolute;
    top: 50%;
    transform: translate(-50%, -50%);
  }

  &--primary {
    background: $primaryColor;
    border-color: $primaryColor;
  }

  &--secondary {
    background: rgba($whiteColor, 0.1);
    border-color: rgba($whiteColor, 0.15);
  }

  &--danger {
    background: transparent;
    box-shadow: inset 0 0 0 2px $primaryColor;
    color: $primaryColor;
  }

  &--small {
    border-radius: $radiusSm;
    padding: 10px 22px;
  }

  &--medium {
    border-radius: $radiusMd;
    padding: 14.5px 32px;
  }

  &--large {
    border-radius: $radiusLg;
    font-size: 18px;
    padding: 15.5px 40px;
  }

  &--disabled {
    cursor: default;
    opacity: 0.5;
  }

  &--loading {
    .app-button__content {
      opacity: 0;
    }
  }

  &--transparent {
    background: transparent;
    border-color: $borderColor;
    color: $textSecondaryColor;
  }

  &--success {
    background: $successBgColor;
    border-color: rgba($successColor, 0.2);
    color: $successColor;
  }

  &--info {
    background: $infoBgColor;
    border-color: rgba($infoColor, 0.2);
    color: $infoColor;
  }

  &--purple {
    background: $purpleBgColor;
    border-color: rgba($purpleColor, 0.2);
    color: $purpleColor;
  }

  &:hover:not(:disabled),
  &:focus:not(:disabled) {
    outline: 3px solid $whiteColor;
  }
}
</style>
