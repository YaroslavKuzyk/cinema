<template>
  <div class="app-tabs">
    <div
      class="app-tabs__header"
      :class="[`app-tabs__header--${props.variant}`]"
    >
      <!-- Pill variant with AppButton -->
      <template v-if="props.variant === 'pill'">
        <AppButton
          v-for="tab in props.tabs"
          :key="tab.value"
          :variant="isActive(tab.value) ? 'primary' : 'secondary'"
          :disabled="tab.disabled"
          v-bind="props.buttonProps"
          class="app-tabs__pill-button"
          @click="selectTab(tab.value)"
        >
          <span class="app-tabs__pill-button-content">
            <span>{{ tab.title }}</span>
            <span v-if="tab.badge !== undefined" class="app-tabs__pill-button-badge">
              {{ tab.badge }}
            </span>
          </span>
        </AppButton>
      </template>

      <!-- Underline variant with custom buttons -->
      <template v-else>
        <button
          v-for="tab in props.tabs"
          :key="tab.value"
          type="button"
          class="app-tabs__underline-button"
          :class="{
            'app-tabs__underline-button--active': isActive(tab.value),
            'app-tabs__underline-button--disabled': tab.disabled,
          }"
          :disabled="tab.disabled"
          @click="selectTab(tab.value)"
        >
          <span class="app-tabs__underline-button-title">{{ tab.title }}</span>
          <span
            v-if="tab.badge !== undefined"
            class="app-tabs__underline-button-badge"
          >
            {{ tab.badge }}
          </span>
        </button>
      </template>
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { IProps, IEmits } from "./index.types";
import { APP_TABS_INJECTION_KEY } from "./index.constants";
import AppButton from "../AppButton/index.vue";

const props = withDefaults(defineProps<IProps>(), {
  variant: "pill",
  buttonProps: () => ({}),
});

const emit = defineEmits<IEmits>();

const isActive = (value: string | number): boolean => {
  return props.modelValue === value;
};

const selectTab = (value: string | number) => {
  emit("update:modelValue", value);
};

provide(APP_TABS_INJECTION_KEY, toRef(() => props.modelValue));
</script>

<style lang="scss" scoped>
.app-tabs {
  &__header {
    align-items: center;
    display: flex;

    &--pill {
      gap: var(--spacing-2xs);
    }

    &--underline {
      border-bottom: 1px solid var(--color-divider);
    }
  }

  &__pill-button-content {
    align-items: center;
    display: flex;
    gap: var(--spacing-xs);
  }

  &__pill-button-badge {
    @include FluidFontCaption;
    background: var(--color-white-20);
    border-radius: var(--radius-2xs);
    font-weight: 500;
    padding: var(--spacing-2xs) var(--spacing-xs);
  }

  &__underline-button {
    align-items: center;
    background: none;
    border: none;
    border-bottom: 2px solid transparent;
    cursor: pointer;
    display: flex;
    gap: var(--spacing-xs);
    justify-content: center;
    margin-bottom: -1px;
    outline: none;
    padding: var(--spacing-sm) var(--spacing-lg);
    transition: all 0.2s ease-in-out;

    &:hover:not(:disabled) {
      border-bottom-color: var(--color-white);
    }

    &--active {
      border-bottom-color: var(--color-primary);

      &:hover:not(:disabled) {
        border-bottom-color: var(--color-primary);
      }

      .app-tabs__underline-button-title {
        color: var(--color-white);
      }

      .app-tabs__underline-button-badge {
        color: var(--color-white);
      }
    }

    &--disabled {
      cursor: default;
      opacity: 0.5;
    }
  }

  &__underline-button-title {
    @include FluidFontCaption;
    color: var(--color-text-tertiary);
  }

  &__underline-button-badge {
    @include FluidFontCaption;
    background: var(--color-border);
    border-radius: var(--radius-2xs);
    color: var(--color-text-tertiary);
    font-weight: 500;
    padding: var(--spacing-2xs) var(--spacing-xs);
  }
}
</style>
