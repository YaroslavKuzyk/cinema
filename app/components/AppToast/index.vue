<template>
  <div class="app-toast" :class="[`app-toast--${props.toast.variant}`]">
    <component :is="iconComponent" :size="20" class="app-toast__icon" />
    <div class="app-toast__content">
      <p v-if="props.toast.title" class="app-toast__title">{{ props.toast.title }}</p>
      <p class="app-toast__message">{{ props.toast.message }}</p>
    </div>
    <button class="app-toast__close" type="button" @click="emit('close')">
      <X :size="18" />
    </button>
  </div>
</template>

<script setup lang="ts">
import type { IProps } from "./index.types";
import { X, CheckCircle, AlertCircle, AlertTriangle, Info } from "lucide-vue-next";

const props = defineProps<IProps>();

const emit = defineEmits<{
  close: [];
}>();

const iconComponent = computed(() => {
  switch (props.toast.variant) {
    case "success":
      return CheckCircle;
    case "danger":
      return AlertCircle;
    case "warning":
      return AlertTriangle;
    default:
      return Info;
  }
});
</script>

<style lang="scss" scoped>
.app-toast {
  align-items: flex-start;
  background: $surfaceColor;
  border: 1px solid $borderColor;
  border-radius: $radiusMd;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.4);
  display: flex;
  gap: 12px;
  max-width: 400px;
  min-width: 300px;
  padding: 16px;

  &__icon {
    flex-shrink: 0;
    margin-top: 2px;
  }

  &__content {
    flex: 1;
  }

  &__title {
    color: $whiteColor;
    font-size: 14px;
    font-weight: 600;
    margin: 0 0 4px;
  }

  &__message {
    color: $textSecondaryColor;
    font-size: 14px;
    line-height: 1.4;
    margin: 0;
  }

  &__close {
    align-items: center;
    background: transparent;
    border: none;
    border-radius: $radius2Xs;
    color: $textSecondaryColor;
    cursor: pointer;
    display: flex;
    flex-shrink: 0;
    height: 28px;
    justify-content: center;
    margin: -4px -4px -4px 0;
    transition: all 0.2s ease;
    width: 28px;

    &:hover {
      background: $backgroundHoverColor;
      color: $textPrimaryColor;
    }
  }

  &--info {
    border-left: 3px solid $infoColor;

    .app-toast__icon {
      color: $infoColor;
    }
  }

  &--success {
    border-left: 3px solid $successColor;

    .app-toast__icon {
      color: $successColor;
    }
  }

  &--warning {
    border-left: 3px solid $warningColor;

    .app-toast__icon {
      color: $warningColor;
    }
  }

  &--danger {
    border-left: 3px solid $dangerColor;

    .app-toast__icon {
      color: $dangerColor;
    }
  }
}
</style>
