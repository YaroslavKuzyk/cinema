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
  @include FluidFontCaption;
  align-items: flex-start;
  border-radius: var(--radius-xs);
  display: flex;
  gap: var(--spacing-xs);
  padding: var(--spacing-xs) var(--spacing-sm);

  &__icon {
    flex-shrink: 0;
    margin-top: fluid(1px, 2px);
  }

  &__text {
    flex: 1;
    line-height: 1.5;
  }

  &--info {
    background: var(--color-info-bg);
    color: var(--color-info);
  }

  &--warning {
    background: var(--color-warning-bg);
    color: var(--color-warning);
  }

  &--danger {
    background: var(--color-danger-bg);
    color: var(--color-danger);
  }

  &--success {
    background: var(--color-success-bg);
    color: var(--color-success);
  }
}
</style>
