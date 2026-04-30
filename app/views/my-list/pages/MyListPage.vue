<template>
  <div class="my-list-page">
    <MyListHeader :stats="stats" />

    <AppTabs
      :tabs="filterTabs"
      :model-value="activeFilter"
      :button-props="{ size: 'small' }"
      @update:model-value="v => activeFilter = v as TMyListFilter"
    />

    <PublicMovieRow
      :title="$t('HOME_ROW_CONTINUE')"
      :items="continueWatching"
      :columns="4"
      variant="wide"
      @select="open(mocks.movie.value)"
    />

    <section class="my-list-page__saved">
      <h2 class="my-list-page__saved-title">{{ $t('MY_LIST_SAVED') }}</h2>
      <div class="my-list-page__grid">
        <PublicMovieCard
          v-for="item in filteredSaved"
          :key="item.id"
          :item="item"
          variant="poster"
          @click="openByCategory(item.category)"
        />
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import PublicMovieCard from '~/components/Public/MovieCard/index.vue'
import PublicMovieRow from '~/components/Public/MovieRow/index.vue'
import type { ITab } from '~/components/System/AppTabs/index.types'
import { MyListHeader } from '../components'
import { useMyList } from '../composables'
import type { TMyListCategory, TMyListFilter } from '../domain'

useHead({
  title: 'Cinema — Мій список',
})

useListingCanonical()

const { activeFilter, continueWatching, filteredSaved, filterOptions, stats } = useMyList()
const { open } = useMediaModal()
const mocks = useMediaMocks()

const filterTabs = computed<ITab[]>(() =>
  filterOptions.value.map(o => ({
    value: o.key,
    title: o.label,
    badge: o.count,
  })),
)

function openByCategory(category: TMyListCategory) {
  if (category === 'series') return open(mocks.series.value)
  if (category === 'anime') return open(mocks.anime.value)
  return open(mocks.movie.value)
}
</script>

<style lang="scss" scoped>
.my-list-page {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-xl);
  padding: calc(var(--spacing-3xl) + 60px) var(--spacing-3xl) var(--spacing-3xl);

  :deep(.app-tabs__header--pill) {
    background: transparent;
    border: none;
    padding: 0;
  }

  &__saved {
    display: flex;
    flex-direction: column;
    gap: var(--spacing-base);
  }

  &__saved-title {
    @include FluidFontH2;
    color: var(--color-white);
    margin: 0;
  }

  &__grid {
    display: grid;
    gap: var(--spacing-base);
    grid-template-columns: repeat(6, 1fr);
  }
}
</style>
