<template>
  <component
    :is="componentTag"
    class="app-button"
    :class="[
      `app-button--${props.variant}`,
      `app-button--${props.size}`,
      { 'app-button--loading': props.loading },
      { 'app-button--disabled': props.disabled },
    ]"
    :disabled="isButton ? props.disabled : undefined"
    :to="props.as === 'nuxt-link' ? props.to : undefined"
    :href="props.as === 'a' ? props.href : undefined"
  >
    <span class="app-button__content">
      <slot />
    </span>

    <div v-if="props.loading" class="app-button__loader">
      <AppLoader :size="getLoaderSize" />
    </div>
  </component>
</template>

<script setup lang="ts">
import type { IProps } from "./index.types";
import AppLoader from "../AppLoader/index.vue";

const props = withDefaults(defineProps<IProps>(), {
  variant: "primary",
  size: "medium",
  loading: false,
  disabled: false,
  as: "button",
});

const isButton = computed(() => props.as === "button");

const componentTag = computed(() => {
  if (props.as === "nuxt-link") return resolveComponent("NuxtLink");
  if (props.as === "a") return "a";
  return "button";
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
  @include FluidFontBodySm;
  align-items: center;
  border: 1px solid transparent;
  box-sizing: border-box;
  color: var(--color-white);
  cursor: pointer;
  display: inline-flex;
  font-weight: 600;
  justify-content: center;
  outline: 3px solid transparent;
  position: relative;
  text-decoration: none;
  transition: all 0.3s ease;

  &__content {
    align-items: center;
    display: flex;
    gap: var(--spacing-xs);
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
    background: var(--color-primary);
    border-color: var(--color-primary);
  }

  &--secondary {
    background: var(--color-white-10);
    border-color: var(--color-white-15);
  }

  &--danger {
    background: transparent;
    box-shadow: inset 0 0 0 2px var(--color-primary);
    color: var(--color-primary);
  }

  &--small {
    border-radius: var(--radius-sm);
    padding: var(--spacing-xs) var(--spacing-md);
  }

  &--medium {
    border-radius: var(--radius-md);
    padding: var(--spacing-sm) var(--spacing-xl);
  }

  &--large {
    @include FluidFontBodyMd;
    border-radius: var(--radius-lg);
    padding: var(--spacing-sm) var(--spacing-2xl);
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
    border-color: var(--color-border);
    color: var(--color-text-secondary);
  }

  &--success {
    background: var(--color-success-bg);
    border-color: var(--color-success-border);
    color: var(--color-success);
  }

  &--info {
    background: var(--color-info-bg);
    border-color: var(--color-info-border);
    color: var(--color-info);
  }

  &--purple {
    background: var(--color-purple-bg);
    border-color: var(--color-purple-border);
    color: var(--color-purple);
  }

  &--ghost {
    background: transparent;
    border-color: transparent;
    color: var(--color-text-secondary);
  }

  &:hover:not(:disabled),
  &:focus:not(:disabled) {
    outline: 3px solid var(--color-white);
  }
}
</style>
