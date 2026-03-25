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
  @include FluidShadowMd;
  align-items: flex-start;
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  display: flex;
  gap: var(--spacing-xs);
  max-width: var(--container-xs);
  min-width: fluid(260px, 360px);
  padding: var(--spacing-sm);

  &__icon {
    flex-shrink: 0;
    margin-top: 2px;
  }

  &__content {
    flex: 1;
  }

  &__title {
    @include FluidFontCaption;
    color: var(--color-white);
    font-weight: 600;
    margin: 0 0 var(--spacing-2xs);
  }

  &__message {
    @include FluidFontCaption;
    color: var(--color-text-secondary);
    line-height: 1.4;
    margin: 0;
  }

  &__close {
    align-items: center;
    background: transparent;
    border: none;
    border-radius: var(--radius-2xs);
    color: var(--color-text-secondary);
    cursor: pointer;
    display: flex;
    flex-shrink: 0;
    height: var(--spacing-lg);
    justify-content: center;
    margin: calc(var(--spacing-2xs) * -1) calc(var(--spacing-2xs) * -1) calc(var(--spacing-2xs) * -1) 0;
    transition: all 0.2s ease;
    width: var(--spacing-lg);

    &:hover {
      background: var(--color-background-hover);
      color: var(--color-text-primary);
    }
  }

  &--info {
    border-left: 3px solid var(--color-info);

    .app-toast__icon {
      color: var(--color-info);
    }
  }

  &--success {
    border-left: 3px solid var(--color-success);

    .app-toast__icon {
      color: var(--color-success);
    }
  }

  &--warning {
    border-left: 3px solid var(--color-warning);

    .app-toast__icon {
      color: var(--color-warning);
    }
  }

  &--danger {
    border-left: 3px solid var(--color-danger);

    .app-toast__icon {
      color: var(--color-danger);
    }
  }
}
</style>
