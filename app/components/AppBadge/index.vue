<template>
  <button
    class="app-badge"
    :class="[
      `app-badge--${props.variant}`,
      { 'app-badge--read-only': props.readOnly },
    ]"
  >
    <slot/>
  </button>
</template>

<script lang="ts" setup>
import type { IProps } from "./index.types";

const props = withDefaults(defineProps<IProps>(), {
  variant: "basic",
  readOnly: true,
});
</script>

<style lang="scss" scoped>
.app-badge {
  align-items: center;
  border: none;
  border-radius: $radius2Xs;
  cursor: pointer;
  display: flex;
  font-size: 12px;
  font-weight: 500;
  justify-content: center;
  outline: 3px solid transparent;
  padding: 4px 12px;
  transition: all 0.3s ease;

  &:hover {
    outline: 3px solid $whiteColor;
  }

  &--read-only {
    cursor: default;

    &:hover {
      outline: 3px solid transparent;
    }
  }

  &--basic {
    background: $borderColor;
    color: $textSecondaryColor;
  }

  &--primary {
    background: $primaryBgColor;
    color: $primaryColor;
  }

  &--danger {
    background: $dangerBgColor;
    color: $dangerColor;
  }

  &--success {
    background: $successBgColor;
    color: $successColor;
  }

  &--info {
    background: $infoBgColor;
    color: $infoColor;
  }

  &--purple {
    background: $purpleBgColor;
    color: $purpleColor;
  }

  &--warning {
    background: $warningBgColor;
    color: $warningColor;
  }
}
</style>
