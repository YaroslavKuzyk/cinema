<template>
  <section class="public-genres-row">
    <header class="public-genres-row__header">
      <h2 class="public-genres-row__title">{{ title }}</h2>
      <NuxtLink v-if="moreLink" :to="moreLink" class="public-genres-row__more">
        {{ $t('HOME_SEE_ALL') }}
      </NuxtLink>
    </header>

    <div class="public-genres-row__grid">
      <button
        v-for="genre in genres"
        :key="genre.id"
        type="button"
        class="public-genres-row__tile"
      >
        <img :src="genre.image" :alt="genre.title" class="public-genres-row__img" loading="lazy" >
        <span class="public-genres-row__overlay" />
        <span class="public-genres-row__label">{{ genre.title }}</span>
      </button>
    </div>
  </section>
</template>

<script setup lang="ts">
import type { IGenresRowProps } from './index.types'

withDefaults(defineProps<IGenresRowProps>(), {
  moreLink: undefined,
})
</script>

<style lang="scss" scoped>
.public-genres-row {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-base);

  &__header {
    align-items: center;
    display: flex;
    justify-content: space-between;
  }

  &__title {
    @include FluidFontH2;
    color: var(--color-white);
    margin: 0;
  }

  &__more {
    @include FluidFontBodySm;
    color: var(--color-text-secondary);
    text-decoration: none;
    transition: color 0.2s ease;

    &:hover {
      color: var(--color-white);
    }
  }

  &__grid {
    display: grid;
    gap: var(--spacing-base);
    grid-template-columns: repeat(6, 1fr);
  }

  &__tile {
    aspect-ratio: 4 / 3;
    background: transparent;
    border: none;
    border-radius: var(--radius-lg);
    cursor: pointer;
    isolation: isolate;
    overflow: hidden;
    padding: 0;
    position: relative;
    transition: transform 0.25s ease;

    &:hover {
      transform: translateY(-2px);

      .public-genres-row__img {
        transform: scale(1.06);
      }
    }
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

  &__overlay {
    background: linear-gradient(180deg, rgba(10, 10, 10, 0.15) 35%, rgba(10, 10, 10, 0.85) 100%);
    inset: 0;
    position: absolute;
    z-index: -1;
  }

  &__label {
    @include FluidFontH3;
    bottom: var(--spacing-sm);
    color: var(--color-white);
    left: var(--spacing-base);
    position: absolute;
  }
}
</style>
