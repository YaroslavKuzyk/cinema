<template>
  <div class="series-page">
    <PublicHero :featured="featured" />

    <div class="series-page__main">
      <AppTabs
        :tabs="filterTabs"
        :model-value="activeFilter"
        inactive-variant="transparent"
        :button-props="{ size: 'small' }"
        @update:model-value="v => activeFilter = String(v)"
      />

      <PublicMovieRow
        v-for="row in rows"
        :key="row.key"
        :title="row.title"
        :items="row.items"
        :columns="row.columns"
        :variant="row.variant"
        :numbered="row.numbered"
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
import { useSeries } from '../composables'

useHead({
  title: 'Cinema — Серіали',
})

const { activeFilter, featured, filterTabs, rows, genres } = useSeries()
const { open } = useMediaModal()
const mocks = useMediaMocks()
</script>

<style lang="scss" scoped>
.series-page {
  display: flex;
  flex-direction: column;

  &__main {
    display: flex;
    flex-direction: column;
    gap: var(--spacing-3xl);
    padding: var(--spacing-3xl);
    width: 100%;
  }

  :deep(.app-tabs__header--pill) {
    background: transparent;
    border: none;
    padding: 0;
  }
}
</style>
