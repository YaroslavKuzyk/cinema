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
    background: rgba($color: $primaryColor, $alpha: 0.12);
    color: $primaryColor;
  }

  &--danger {
    background: rgba($color: $dangerColor, $alpha: 0.15);
    color: $dangerColor;
  }

  &--success {
    background: rgba($color: $successColor, $alpha: 0.15);
    color: $successColor;
  }

  &--info {
    background: rgba($color: $infoColor, $alpha: 0.15);
    color: $infoColor;
  }

  &--purple {
    background: rgba($color: $purpleColor, $alpha: 0.12);
    color: $purpleColor;
  }

  &--warning {
    background: rgba($color: $warningColor, $alpha: 0.15);
    color: $warningColor;
  }
}
</style>
