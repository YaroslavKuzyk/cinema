<template>
  <aside class="settings-panel">
    <header class="settings-panel__head">
      <h2 class="settings-panel__title">{{ $t("PLAYER_SETTINGS") }}</h2>
      <button
        type="button"
        class="settings-panel__close"
        :aria-label="$t('PLAYER_CLOSE')"
        @click="$emit('close')"
      >
        <X :size="28" />
      </button>
    </header>

    <div class="settings-panel__groups">
      <section class="settings-panel__group">
        <div class="settings-panel__group-head">
          <Sparkles :size="28" class="settings-panel__icon" />
          <span class="settings-panel__group-label">{{ $t("PLAYER_QUALITY") }}</span>
        </div>
        <div class="settings-panel__options">
          <button
            v-for="q in qualities"
            :key="q.id"
            type="button"
            class="settings-panel__option"
            :class="{ 'settings-panel__option--active': q.id === quality }"
            @click="emit('update:quality', q.id)"
          >
            {{ q.label }}
          </button>
        </div>
      </section>

      <section class="settings-panel__group">
        <div class="settings-panel__group-head">
          <Gauge :size="28" class="settings-panel__icon" />
          <span class="settings-panel__group-label">{{ $t("PLAYER_SPEED") }}</span>
        </div>
        <div class="settings-panel__options">
          <button
            v-for="s in speeds"
            :key="s.value"
            type="button"
            class="settings-panel__option"
            :class="{ 'settings-panel__option--active': s.value === speed }"
            @click="emit('update:speed', s.value)"
          >
            {{ s.label }}
          </button>
        </div>
      </section>

      <section class="settings-panel__group">
        <div class="settings-panel__group-head">
          <Volume2 :size="28" class="settings-panel__icon" />
          <span class="settings-panel__group-label">{{ $t("PLAYER_VOLUME") }}</span>
          <span class="settings-panel__group-value">{{ Math.round(volume * 100) }}%</span>
        </div>
        <div class="settings-panel__volume">
          <button
            type="button"
            class="settings-panel__step"
            :aria-label="'-'"
            @click="stepVolume(-0.05)"
          >
            <Minus :size="22" />
          </button>
          <input
            type="range"
            min="0"
            max="1"
            step="0.01"
            :value="volume"
            class="settings-panel__slider"
            @input="emit('update:volume', Number(($event.target as HTMLInputElement).value))"
          >
          <button
            type="button"
            class="settings-panel__step"
            :aria-label="'+'"
            @click="stepVolume(0.05)"
          >
            <Plus :size="22" />
          </button>
        </div>
      </section>
    </div>
  </aside>
</template>

<script setup lang="ts">
import { Gauge, Minus, Plus, Sparkles, Volume2, X } from "lucide-vue-next";
import type { IPlayerQuality, IPlayerSpeed } from "../domain";

const props = defineProps<{
  qualities: IPlayerQuality[]
  speeds: IPlayerSpeed[]
  quality: string
  speed: number
  volume: number
}>();

const emit = defineEmits<{
  close: []
  "update:quality": [id: string]
  "update:speed": [value: number]
  "update:volume": [value: number]
}>();

function stepVolume(delta: number) {
  const next = Math.min(1, Math.max(0, props.volume + delta));
  emit("update:volume", Number(next.toFixed(2)));
}
</script>

<style lang="scss" scoped>
.settings-panel {
  backdrop-filter: blur(14px);
  background: rgba(10, 10, 10, 0.92);
  border-left: 1px solid rgba(255, 255, 255, 0.08);
  display: flex;
  flex-direction: column;
  gap: var(--spacing-xl);
  height: 100%;
  padding: var(--spacing-xl);
  width: 100%;

  &__head {
    align-items: center;
    display: flex;
    justify-content: space-between;
  }

  &__title {
    @include FluidFontH2;
    color: var(--color-white);
    margin: 0;
  }

  &__close {
    align-items: center;
    background: rgba(255, 255, 255, 0.08);
    border: none;
    border-radius: var(--radius-full);
    color: var(--color-white);
    cursor: pointer;
    display: flex;
    height: 52px;
    justify-content: center;
    outline: 3px solid transparent;
    transition: background 0.2s ease, outline 0.25s ease;
    width: 52px;

    &:hover {
      background: rgba(255, 255, 255, 0.16);
      outline: 3px solid var(--color-white);
    }
  }

  &__groups {
    display: flex;
    flex-direction: column;
    gap: var(--spacing-xl);
  }

  &__group {
    display: flex;
    flex-direction: column;
    gap: var(--spacing-md);
  }

  &__group-head {
    align-items: center;
    display: flex;
    gap: var(--spacing-sm);
  }

  &__icon {
    color: var(--color-text-secondary);
    flex-shrink: 0;
  }

  &__group-label {
    @include FluidFontBodyLg;
    color: var(--color-white);
    flex: 1;
    font-weight: 600;
  }

  &__group-value {
    @include FluidFontBodyLg;
    color: var(--color-primary);
    font-variant-numeric: tabular-nums;
    font-weight: 700;
  }

  &__options {
    display: flex;
    flex-wrap: wrap;
    gap: var(--spacing-xs);
  }

  &__option {
    @include FluidFontBodyMd;
    background: rgba(255, 255, 255, 0.06);
    border: none;
    border-radius: var(--radius-full);
    color: var(--color-white);
    cursor: pointer;
    font-weight: 600;
    min-height: 52px;
    outline: 3px solid transparent;
    padding: 0 var(--spacing-lg);
    transition: background 0.2s ease, color 0.2s ease, outline 0.25s ease;

    &:hover {
      outline: 3px solid var(--color-white);
    }

    &--active {
      background: var(--color-primary);
      color: var(--color-white);
    }
  }

  &__volume {
    align-items: center;
    display: flex;
    gap: var(--spacing-md);
  }

  &__step {
    align-items: center;
    background: rgba(255, 255, 255, 0.08);
    border: none;
    border-radius: var(--radius-full);
    color: var(--color-white);
    cursor: pointer;
    display: flex;
    flex-shrink: 0;
    height: 52px;
    justify-content: center;
    outline: 3px solid transparent;
    transition: background 0.2s ease, outline 0.25s ease;
    width: 52px;

    &:hover {
      background: rgba(255, 255, 255, 0.16);
      outline: 3px solid var(--color-white);
    }
  }

  &__slider {
    accent-color: var(--color-primary);
    flex: 1;
    height: 6px;
  }
}
</style>
