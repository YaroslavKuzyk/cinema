<template>
  <div class="home-page">
    <PublicHero :featured="featured" />

    <div class="home-page__main">
      <PublicMovieRow
        :title="continueWatching.title"
        :items="continueWatching.items"
        :columns="4"
        variant="wide"
        @select="open(mocks.movie.value)"
      />

      <PublicMovieRow
        :title="popular.title"
        :items="popular.items"
        :columns="5"
        more-link="/movies"
        @select="open(mocks.movie.value)"
      />

      <PublicMovieRow
        :title="topTen.title"
        :items="topTen.items"
        :columns="5"
        numbered
        @select="open(mocks.series.value)"
      />

      <PublicGenresRow
        :title="$t('HOME_ROW_GENRES')"
        :genres="genres"
        more-link="/genres"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import PublicHero from '~/components/Public/Hero/index.vue'
import PublicMovieRow from '~/components/Public/MovieRow/index.vue'
import PublicGenresRow from '~/components/Public/GenresRow/index.vue'
import { useHome } from '../composables'

useListingCanonical()

const { featured, continueWatching, popular, topTen, genres } = useHome()
const { open } = useMediaModal()
const mocks = useMediaMocks()
</script>

<style lang="scss" scoped>
.home-page {
  display: flex;
  flex-direction: column;

  &__main {
    display: flex;
    flex-direction: column;
    gap: var(--spacing-3xl);
    padding: var(--spacing-3xl);
    width: 100%;
  }
}
</style>
