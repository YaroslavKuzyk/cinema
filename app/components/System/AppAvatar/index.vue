<template>
  <div
    class="app-avatar"
    :class="[`app-avatar--${props.size}`]"
  >
    <img
      v-if="props.src"
      class="app-avatar__image"
      :src="props.src"
      alt="avatar"
    />
    <span v-else class="app-avatar__initials">
      {{ props.initials }}
    </span>
  </div>
</template>

<script lang="ts" setup>
import type { IProps } from "./index.types";

const props = withDefaults(defineProps<IProps>(), {
  size: "medium",
});
</script>

<style lang="scss" scoped>
.app-avatar {
  align-items: center;
  background: var(--color-primary);
  border-radius: var(--radius-md);
  display: inline-flex;
  flex-shrink: 0;
  justify-content: center;
  overflow: hidden;

  &--small {
    border-radius: var(--radius-sm);
    height: fluid(40px, 48px);
    width: fluid(40px, 48px);
  }

  &--medium {
    height: fluid(56px, 72px);
    width: fluid(56px, 72px);
  }

  &--large {
    border-radius: var(--radius-lg);
    height: fluid(80px, 104px);
    width: fluid(80px, 104px);
  }

  &__image {
    height: 100%;
    object-fit: cover;
    width: 100%;
  }

  &__initials {
    color: var(--color-white);
    font-weight: 700;
    text-transform: uppercase;
    user-select: none;
  }

  &--small &__initials {
    @include FluidFontH3;
  }

  &--medium &__initials {
    @include FluidFontH2;
  }

  &--large &__initials {
    @include FluidFontH1;
  }
}
</style>
