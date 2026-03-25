<template>
  <div class="app-alert" :class="[`app-alert--${props.variant}`]">
    <component :is="iconComponent" :size="18" class="app-alert__icon" />
    <span class="app-alert__text">
      <slot />
    </span>
  </div>
</template>

<script setup lang="ts">
import type { IProps } from "./index.types";
import { AlertTriangle, Info, AlertCircle, CheckCircle } from "lucide-vue-next";

const props = withDefaults(defineProps<IProps>(), {
  variant: "info",
});

const iconComponent = computed(() => {
  switch (props.variant) {
    case "warning":
      return AlertTriangle;
    case "danger":
      return AlertCircle;
    case "success":
      return CheckCircle;
    default:
      return Info;
  }
});
</script>

<style lang="scss" scoped>
.app-alert {
  align-items: flex-start;
  border-radius: $radiusXs;
  display: flex;
  font-size: 14px;
  gap: 12px;
  padding: 12px 16px;

  &__icon {
    flex-shrink: 0;
    margin-top: 1px;
  }

  &__text {
    flex: 1;
    line-height: 1.5;
  }

  &--info {
    background: rgba($color: $infoColor, $alpha: 0.1);
    color: $infoColor;
  }

  &--warning {
    background: rgba($color: $warningColor, $alpha: 0.1);
    color: $warningColor;
  }

  &--danger {
    background: rgba($color: $dangerColor, $alpha: 0.1);
    color: $dangerColor;
  }

  &--success {
    background: rgba($color: $successColor, $alpha: 0.1);
    color: $successColor;
  }
}
</style>
