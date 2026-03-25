<template>
  <VueFinalModal
    v-model="isOpen"
    class="app-modal"
    content-class="app-modal__container"
    overlay-class="app-modal__overlay"
    :click-to-close="props.closeOnOverlay"
    :esc-to-close="props.closable"
    @closed="emit('closed')"
  >
    <div class="app-modal__content" :class="[`app-modal__content--${props.size}`]">
      <button
        v-if="props.closable"
        class="app-modal__close"
        type="button"
        @click="isOpen = false"
      >
        <X :size="20" />
      </button>

      <div v-if="$slots.icon" class="app-modal__icon">
        <slot name="icon" />
      </div>

      <h2 v-if="props.title" class="app-modal__title">{{ props.title }}</h2>

      <p v-if="props.description" class="app-modal__description">{{ props.description }}</p>

      <div v-if="$slots.default" class="app-modal__body">
        <slot />
      </div>

      <div v-if="$slots.footer" class="app-modal__footer">
        <slot name="footer" />
      </div>
    </div>
  </VueFinalModal>
</template>

<script setup lang="ts">
import { VueFinalModal } from "vue-final-modal";
import type { IProps } from "./index.types";
import { X } from "lucide-vue-next";

const props = withDefaults(defineProps<IProps>(), {
  size: "medium",
  closable: true,
  closeOnOverlay: true,
});

const emit = defineEmits<{
  "update:modelValue": [value: boolean];
  closed: [];
}>();

const isOpen = computed({
  get: () => props.modelValue,
  set: (value) => emit("update:modelValue", value),
});
</script>

<style lang="scss">
.app-modal {
  align-items: center;
  display: flex;
  justify-content: center;

  &__overlay {
    backdrop-filter: blur(4px);
    background: rgba($color: $backgroundColor, $alpha: 0.8);
  }

  &__container {
    align-items: center;
    display: flex;
    justify-content: center;
    padding: 24px;
  }

  &__content {
    background: $surfaceColor;
    border: 1px solid $borderColor;
    border-radius: $radiusXl;
    max-height: 90vh;
    overflow-y: auto;
    padding: 24px;
    position: relative;
    width: 100%;

    &--small {
      max-width: 400px;
    }

    &--medium {
      max-width: 500px;
    }

    &--large {
      max-width: 700px;
    }
  }

  &__close {
    align-items: center;
    background: transparent;
    border: none;
    border-radius: $radiusXs;
    color: $textSecondaryColor;
    cursor: pointer;
    display: flex;
    height: 32px;
    justify-content: center;
    position: absolute;
    right: 16px;
    top: 16px;
    transition: all 0.2s ease;
    width: 32px;

    &:hover {
      background: $backgroundHoverColor;
      color: $textPrimaryColor;
    }
  }

  &__icon {
    margin-bottom: 16px;
  }

  &__title {
    color: $whiteColor;
    font-size: 20px;
    font-weight: 600;
    margin: 0 0 8px;
  }

  &__description {
    color: $textSecondaryColor;
    font-size: 14px;
    line-height: 1.5;
    margin: 0;
  }

  &__body {
    margin-top: 20px;
  }

  &__footer {
    display: flex;
    gap: 12px;
    justify-content: flex-end;
    margin-top: 24px;
  }
}
</style>
