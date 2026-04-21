<template>
  <button type="button" class="movie-card" :class="`movie-card--${variant}`">
    <div class="movie-card__media">
      <img :src="item.image" :alt="item.title" class="movie-card__img" loading="lazy" >
      <div class="movie-card__shade" />

      <span v-if="rank" class="movie-card__rank">{{ rank }}</span>
      <span v-if="item.badge" class="movie-card__badge">{{ item.badge }}</span>

      <div class="movie-card__info">
        <div class="movie-card__info-text">
          <span class="movie-card__title">{{ item.title }}</span>
          <span class="movie-card__meta">{{ item.meta }}</span>
        </div>

        <span v-if="item.progress !== undefined" class="movie-card__play">
          <Play :size="14" fill="currentColor" />
        </span>
      </div>

      <div v-if="item.progress !== undefined" class="movie-card__progress">
        <div class="movie-card__progress-bar" :style="{ width: `${item.progress}%` }" />
      </div>
    </div>
  </button>
</template>

<script setup lang="ts">
import { Play } from 'lucide-vue-next'
import type { IMovieCardProps } from './index.types'

withDefaults(defineProps<IMovieCardProps>(), {
  variant: 'poster',
  rank: undefined,
})
</script>

<style lang="scss" scoped>
.movie-card {
  background: transparent;
  border: none;
  cursor: pointer;
  display: block;
  padding: 0;
  text-align: left;
  transition: transform 0.25s ease;
  width: 100%;

  &:hover {
    transform: translateY(-4px);

    .movie-card__media {
      outline: 2px solid var(--color-white);
    }

    .movie-card__play {
      background: var(--color-primary-hover);
    }

    .movie-card__img {
      transform: scale(1.04);
    }
  }

  &__media {
    border-radius: var(--radius-xl);
    isolation: isolate;
    outline: 2px solid transparent;
    overflow: hidden;
    position: relative;
    transition: outline 0.25s ease;
    width: 100%;
  }

  &--wide &__media {
    aspect-ratio: 16 / 10;
  }

  &--poster &__media {
    aspect-ratio: 2 / 3;
  }

  &__img {
    display: block;
    height: 100%;
    object-fit: cover;
    transition: transform 0.4s ease;
    width: 100%;
  }

  &__shade {
    background: linear-gradient(180deg, rgba(10, 10, 10, 0) 45%, rgba(10, 10, 10, 0.95) 100%);
    inset: 0;
    pointer-events: none;
    position: absolute;
  }

  &__rank {
    color: var(--color-white);
    font-size: 72px;
    font-weight: 900;
    left: var(--spacing-xs);
    line-height: 1;
    position: absolute;
    text-shadow: 0 0 18px rgba(0, 0, 0, 0.6);
    top: var(--spacing-2xs);
  }

  &__badge {
    @include FluidFontCaption;
    background: var(--color-primary);
    border-radius: var(--radius-xs);
    color: var(--color-white);
    left: var(--spacing-xs);
    padding: var(--spacing-3xs) var(--spacing-2xs);
    position: absolute;
    top: var(--spacing-xs);
  }

  &__info {
    align-items: flex-end;
    bottom: 0;
    display: flex;
    gap: var(--spacing-xs);
    justify-content: space-between;
    left: 0;
    padding: var(--spacing-base);
    position: absolute;
    right: 0;
  }

  &__info-text {
    display: flex;
    flex-direction: column;
    gap: 2px;
    min-width: 0;
  }

  &__title {
    @include FluidFontBodyMd;
    color: var(--color-white);
    font-weight: 700;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  &__meta {
    @include FluidFontCaption;
    color: var(--color-text-secondary);
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  &__play {
    align-items: center;
    background: var(--color-primary);
    border-radius: var(--radius-full);
    color: var(--color-white);
    display: flex;
    flex-shrink: 0;
    height: 32px;
    justify-content: center;
    transition: background 0.2s ease;
    width: 32px;
  }

  &__progress {
    background: var(--color-white-10);
    bottom: 0;
    height: 3px;
    left: 0;
    position: absolute;
    right: 0;
  }

  &__progress-bar {
    background: var(--color-primary);
    height: 100%;
    transition: width 0.3s ease;
  }
}
</style>
