<template>
  <button type="button" class="next-ep" @click="$emit('play')">
    <img :src="episode.image" :alt="episode.title" class="next-ep__img" >
    <div class="next-ep__body">
      <span class="next-ep__label">{{ $t("PLAYER_NEXT_EPISODE") }}</span>
      <span class="next-ep__title"
        >E{{ episode.number }} · {{ episode.title }}</span
      >
      <span class="next-ep__meta">{{ episode.durationLabel }}</span>
    </div>
    <span class="next-ep__play">
      <Play :size="22" fill="currentColor" />
    </span>
  </button>
</template>

<script setup lang="ts">
import { Play } from "lucide-vue-next";
import type { IPlayerEpisode } from "../domain";

defineProps<{ episode: IPlayerEpisode }>();
defineEmits<{ play: [] }>();
</script>

<style lang="scss" scoped>
.next-ep {
  align-items: center;
  backdrop-filter: blur(10px);
  background: rgba(10, 10, 10, 0.75);
  border: none;
  border-radius: var(--radius-md);
  cursor: pointer;
  display: flex;
  gap: var(--spacing-md);
  outline: 3px solid transparent;
  padding: var(--spacing-xs) var(--spacing-md) var(--spacing-xs)
    var(--spacing-xs);
  text-align: left;
  width: 420px;

  &:hover {
    background: rgba(20, 20, 20, 0.9);
    outline: 3px solid var(--color-white);
  }

  &__img {
    aspect-ratio: 16 / 9;
    border-radius: var(--radius-xs);
    flex-shrink: 0;
    height: 72px;
    object-fit: cover;
  }

  &__body {
    display: flex;
    flex: 1;
    flex-direction: column;
    gap: var(--spacing-3xs);
    min-width: 0;
  }

  &__label {
    @include FluidFontBodySm;
    color: rgba(255, 255, 255, 0.5);
  }

  &__title {
    @include FluidFontBodyLg;
    color: var(--color-white);
    font-weight: 600;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  &__meta {
    @include FluidFontBodySm;
    color: rgba(255, 255, 255, 0.5);
  }

  &__play {
    align-items: center;
    background: var(--color-primary);
    border-radius: var(--radius-full);
    color: var(--color-white);
    display: flex;
    flex-shrink: 0;
    height: 52px;
    justify-content: center;
    width: 52px;
  }
}
</style>
