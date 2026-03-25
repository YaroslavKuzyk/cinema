<template>
  <component
    :is="props.clickable ? 'button' : 'div'"
    class="app-card"
    :class="{ 'app-card--clickable': props.clickable }"
  >
    <div v-if="props.title || props.subtitle || $slots.header" class="app-card__header">
      <div class="app-card__header-content">
        <div class="app-card__title-row">
          <span v-if="$slots.icon" class="app-card__icon">
            <slot name="icon" />
          </span>
          <h3 v-if="props.title" class="app-card__title">{{ props.title }}</h3>
        </div>
        <p v-if="props.subtitle" class="app-card__subtitle">{{ props.subtitle }}</p>
        <slot name="header" />
      </div>
      <div v-if="$slots['header-action']" class="app-card__header-action">
        <slot name="header-action" />
      </div>
    </div>

    <div class="app-card__body">
      <slot />
    </div>

    <div v-if="$slots.footer" class="app-card__footer">
      <slot name="footer" />
    </div>
  </component>
</template>

<script lang="ts" setup>
import type { IProps } from "./index.types";

const props = withDefaults(defineProps<IProps>(), {
  clickable: false,
});
</script>

<style lang="scss" scoped>
.app-card {
  background: $surfaceColor;
  border: 1px solid $borderColor;
  border-radius: $radiusXl;
  display: flex;
  flex-direction: column;
  outline: 3px solid transparent;
  overflow: hidden;
  transition: all 0.3s ease;
  width: 100%;

  &--clickable {
    cursor: pointer;
    text-align: left;

    &:hover {
      outline: 3px solid $whiteColor;
    }
  }

  &__header {
    align-items: flex-start;
    display: flex;
    gap: 16px;
    justify-content: space-between;
    padding: 24px 24px 0;
  }

  &__header-content {
    flex: 1;
  }

  &__header-action {
    flex-shrink: 0;
  }

  &__title-row {
    align-items: center;
    display: flex;
    gap: 10px;
  }

  &__icon {
    font-size: 24px;
    line-height: 1;
  }

  &__title {
    color: $whiteColor;
    font-size: 20px;
    font-weight: 600;
    margin: 0;
  }

  &__subtitle {
    color: $textSecondaryColor;
    font-size: 14px;
    margin: 8px 0 0;
  }

  &__body {
    flex: 1;
    padding: 24px;
  }

  &__footer {
    padding: 0 24px 24px;
  }
}
</style>
