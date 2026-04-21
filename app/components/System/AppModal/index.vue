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
    <div
      class="app-modal__content"
      :class="[
        `app-modal__content--${props.size}`,
        { 'app-modal__content--flush': props.flush },
      ]"
    >
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

      <p v-if="props.description" class="app-modal__description">
        {{ props.description }}
      </p>

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
    backdrop-filter: blur(fluid(4px, 8px));
    background: var(--color-background-80);
  }

  &__container {
    align-items: center;
    display: flex;
    justify-content: center;
    padding: var(--spacing-sm);
    width: 100%;
  }

  &__content {
    background: var(--color-surface);
    border: 1px solid var(--color-border);
    border-radius: var(--radius-xl);
    max-height: 80vh;
    overflow-y: auto;
    padding: var(--spacing-md);
    padding-top: var(--spacing-2xl);
    position: relative;
    width: 100%;

    &--small {
      max-width: var(--container-xs);
    }

    &--medium {
      max-width: var(--container-sm);
    }

    &--large {
      max-width: var(--container-md);
    }

    &--xlarge {
      max-width: var(--container-xl);
    }

    &--full {
      max-width: 80vw;
    }

    &--flush {
      padding: 0;

      .app-modal__body {
        margin-top: 0;
      }
    }
  }

  &__close {
    align-items: center;
    background: transparent;
    border: none;
    border-radius: var(--radius-xs);
    color: var(--color-text-secondary);
    cursor: pointer;
    display: flex;
    height: var(--spacing-xl);
    justify-content: center;
    position: absolute;
    right: var(--spacing-sm);
    top: var(--spacing-sm);
    transition: all 0.2s ease;
    width: var(--spacing-xl);
    z-index: 2;

    &:hover {
      background: var(--color-background-hover);
      color: var(--color-text-primary);
    }
  }

  &__icon {
    margin-bottom: var(--spacing-base);
  }

  &__title {
    @include FluidFontBodyMd;
    color: var(--color-white);
    font-weight: 600;
    margin: 0 0 var(--spacing-xs);
  }

  &__description {
    @include FluidFontCaption;
    color: var(--color-text-secondary);
    line-height: 1.5;
    margin: 0;
  }

  &__body {
    margin-top: var(--spacing-md);
  }

  &__footer {
    display: flex;
    gap: var(--spacing-xs);
    justify-content: flex-end;
    margin-top: var(--spacing-lg);
  }
}
</style>
