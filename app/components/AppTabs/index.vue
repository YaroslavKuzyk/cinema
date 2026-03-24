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
      background-color: $surfaceColor;
      border: 1px solid $dividerColor;
      border-radius: $radiusMd;
      gap: 4px;
      padding: 5px;
    }

    &--underline {
      border-bottom: 1px solid $dividerColor;
    }
  }

  &__pill-button-content {
    align-items: center;
    display: flex;
    gap: 8px;
  }

  &__pill-button-badge {
    background: rgba($whiteColor, 0.2);
    border-radius: $radius2Xs;
    font-size: 11px;
    font-weight: 500;
    padding: 2px 7px;
  }

  &__underline-button {
    align-items: center;
    background: none;
    border: none;
    border-bottom: 2px solid transparent;
    cursor: pointer;
    display: flex;
    gap: 8px;
    justify-content: center;
    margin-bottom: -1px;
    outline: none;
    padding: 14px 24px;
    transition: all 0.2s ease-in-out;

    &:hover:not(:disabled) {
      border-bottom-color: $whiteColor;
    }

    &--active {
      border-bottom-color: $primaryColor;

      &:hover:not(:disabled) {
        border-bottom-color: $primaryColor;
      }

      .app-tabs__underline-button-title {
        color: $whiteColor;
      }

      .app-tabs__underline-button-badge {
        color: $whiteColor;
      }
    }

    &--disabled {
      cursor: default;
      opacity: 0.5;
    }
  }

  &__underline-button-title {
    @include FontCaption;
    color: $textTertiaryColor;
  }

  &__underline-button-badge {
    background: $borderColor;
    border-radius: $radius2Xs;
    color: $textTertiaryColor;
    font-size: 11px;
    font-weight: 500;
    padding: 2px 7px;
  }
}
</style>
