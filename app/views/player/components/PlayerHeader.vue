<template>
  <header class="player-header">
    <button
      type="button"
      class="player-header__back"
      :aria-label="$t('PLAYER_BACK')"
      @click="$emit('back')"
    >
      <ArrowLeft :size="28" />
    </button>

    <div class="player-header__meta">
      <h1 class="player-header__title">{{ title }}</h1>
      <span v-if="subtitle" class="player-header__subtitle">{{
        subtitle
      }}</span>
    </div>

    <button
      v-if="showSettings"
      type="button"
      class="player-header__settings"
      :aria-label="$t('PLAYER_SETTINGS')"
      @click="$emit('settings')"
    >
      <Settings :size="28" />
    </button>
  </header>
</template>

<script setup lang="ts">
import { ArrowLeft, Settings } from "lucide-vue-next";

defineProps<{
  title: string;
  subtitle?: string;
  showSettings?: boolean;
}>();

defineEmits<{ back: []; settings: [] }>();
</script>

<style lang="scss" scoped>
.player-header {
  align-items: flex-start;
  display: flex;
  gap: var(--spacing-md);
  justify-content: space-between;
  left: 0;
  padding: var(--spacing-xl);
  pointer-events: none;
  position: absolute;
  right: 0;
  top: 0;
  z-index: 3;

  > * {
    pointer-events: auto;
  }

  &__back,
  &__settings {
    align-items: center;
    backdrop-filter: blur(8px);
    background: rgba(10, 10, 10, 0.55);
    border: none;
    border-radius: var(--radius-full);
    color: var(--color-white);
    cursor: pointer;
    display: flex;
    flex-shrink: 0;
    height: 64px;
    justify-content: center;
    outline: 3px solid transparent;
    width: 64px;

    &:hover {
      background: rgba(10, 10, 10, 0.8);
      outline: 3px solid var(--color-white);
    }
  }

  &__meta {
    display: flex;
    flex: 1;
    flex-direction: column;
    gap: var(--spacing-2xs);
    min-width: 0;
    padding-top: var(--spacing-2xs);
  }

  &__title {
    @include FluidFontH3;
    color: var(--color-white);
    font-weight: 700;
    margin: 0;
    text-shadow: 0 2px 10px rgba(0, 0, 0, 0.5);
  }

  &__subtitle {
    @include FluidFontBodyMd;
    color: rgba(255, 255, 255, 0.7);
    text-shadow: 0 2px 10px rgba(0, 0, 0, 0.5);
  }
}
</style>
