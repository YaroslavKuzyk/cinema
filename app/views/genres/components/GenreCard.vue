<template>
  <button
    type="button"
    class="genre-card"
    :class="`genre-card--${item.size}`"
  >
    <img :src="item.image" :alt="item.title" class="genre-card__img" loading="lazy" >
    <div class="genre-card__shade" />

    <span class="genre-card__icon">
      <component :is="item.icon" :size="iconSize" />
    </span>

    <div class="genre-card__info">
      <span class="genre-card__title">{{ item.title }}</span>
      <span class="genre-card__meta">{{ metaText }}</span>
    </div>
  </button>
</template>

<script setup lang="ts">
import type { IGenreItem } from '../domain'

interface IProps {
  item: IGenreItem
}

const props = defineProps<IProps>()
const { t } = useI18n()

const iconSize = computed(() => (props.item.size === 'large' ? 20 : 16))

const metaText = computed(() => {
  const { item } = props
  if (item.titlesCount !== undefined) {
    return `${item.titlesCount} ${t('GENRES_TITLES')} · ${item.moviesCount} ${t('GENRES_MOVIES')}`
  }
  return `${item.moviesCount} ${t('GENRES_MOVIES')}`
})
</script>

<style lang="scss" scoped>
.genre-card {
  background: transparent;
  border: none;
  border-radius: var(--radius-xl);
  cursor: pointer;
  isolation: isolate;
  outline: 2px solid transparent;
  overflow: hidden;
  padding: 0;
  position: relative;
  transition: outline 0.25s ease, transform 0.25s ease;

  &:hover {
    outline: 2px solid var(--color-white);
    transform: translateY(-2px);

    .genre-card__img {
      transform: scale(1.04);
    }
  }

  &--large {
    aspect-ratio: 2 / 1;
    grid-column: span 2;
  }

  &--medium {
    aspect-ratio: 3 / 2;
    grid-column: span 1;
  }

  &__img {
    display: block;
    height: 100%;
    left: 0;
    object-fit: cover;
    position: absolute;
    top: 0;
    transition: transform 0.4s ease;
    width: 100%;
    z-index: -2;
  }

  &__shade {
    background: linear-gradient(180deg, rgba(10, 10, 10, 0.2) 35%, rgba(10, 10, 10, 0.88) 100%);
    inset: 0;
    position: absolute;
    z-index: -1;
  }

  &__icon {
    align-items: center;
    backdrop-filter: blur(8px);
    background: rgba(10, 10, 10, 0.55);
    border: 1px solid rgba(var(--color-white-rgb), 0.1);
    border-radius: var(--radius-sm);
    color: var(--color-white);
    display: flex;
    height: 34px;
    justify-content: center;
    position: absolute;
    right: var(--spacing-sm);
    top: var(--spacing-sm);
    width: 34px;
  }

  &__info {
    bottom: 0;
    display: flex;
    flex-direction: column;
    gap: 2px;
    left: 0;
    padding: var(--spacing-base);
    position: absolute;
    right: 0;
    text-align: left;
  }

  &__title {
    color: var(--color-white);
  }

  &--large &__title {
    @include FluidFontH2;
  }

  &--medium &__title {
    @include FluidFontH3;
  }

  &__meta {
    @include FluidFontCaption;
    color: var(--color-text-secondary);
  }
}
</style>
