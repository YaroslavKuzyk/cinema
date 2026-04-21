<template>
  <div class="genres-page">
    <header class="genres-page__header">
      <h1 class="genres-page__title">{{ $t('GENRES_PAGE_TITLE') }}</h1>
      <p class="genres-page__subtitle">{{ $t('GENRES_PAGE_SUBTITLE') }}</p>
    </header>

    <GenresGrid :genres="genres" />
  </div>
</template>

<script setup lang="ts">
import { GenresGrid } from '../components'
import { useGenres } from '../composables'

useHead({
  title: 'Cinema — Жанри',
})

const { genres } = useGenres()
</script>

<style lang="scss" scoped>
.genres-page {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-xl);
  padding: calc(var(--spacing-3xl) + 60px) var(--spacing-3xl) var(--spacing-3xl);

  &__header {
    display: flex;
    flex-direction: column;
    gap: var(--spacing-2xs);
  }

  &__title {
    @include FluidFontH1;
    color: var(--color-white);
    margin: 0;
  }

  &__subtitle {
    @include FluidFontBodyMd;
    color: var(--color-text-secondary);
    margin: 0;
  }
}
</style>
