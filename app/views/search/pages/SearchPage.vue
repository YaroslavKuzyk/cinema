<template>
  <div class="search-page">
    <!-- Search input -->
    <div class="search-page__input">
      <Search :size="18" class="search-page__input-icon" />
      <input
        ref="inputEl"
        v-model="query"
        type="search"
        class="search-page__field"
        :placeholder="$t('SEARCH_PLACEHOLDER')"
        @keydown.enter.prevent="submit"
      >
      <button
        v-if="query"
        type="button"
        class="search-page__clear"
        :aria-label="$t('SEARCH_CLEAR')"
        @click="query = ''"
      >
        <X :size="16" />
      </button>
    </div>

    <p v-if="!hasActiveSearch" class="search-page__hint">
      {{ $t("SEARCH_HINT") }}
    </p>

    <!-- Filters -->
    <div class="search-page__filters">
      <div class="search-page__filter">
        <span class="search-page__filter-label">{{ $t("SEARCH_FILTER_TYPE") }}:</span>
        <div class="search-page__chips">
          <button
            v-for="opt in typeFilterOptions"
            :key="opt.value"
            type="button"
            class="search-page__chip"
            :class="{ 'search-page__chip--active': typeFilter === opt.value }"
            @click="typeFilter = opt.value"
          >
            {{ opt.label }}
          </button>
        </div>
      </div>

      <div class="search-page__filter">
        <span class="search-page__filter-label">{{ $t("SEARCH_FILTER_GENRE") }}:</span>
        <div class="search-page__chips">
          <button
            v-for="opt in genreFilterOptions"
            :key="opt.value"
            type="button"
            class="search-page__chip"
            :class="{ 'search-page__chip--active': genreFilter === opt.value }"
            @click="genreFilter = opt.value"
          >
            {{ opt.label }}
          </button>
        </div>
      </div>

      <div class="search-page__filter">
        <span class="search-page__filter-label">{{ $t("SEARCH_FILTER_YEAR") }}:</span>
        <div class="search-page__chips">
          <button
            v-for="opt in yearFilterOptions"
            :key="opt.value"
            type="button"
            class="search-page__chip"
            :class="{ 'search-page__chip--active': yearFilter === opt.value }"
            @click="yearFilter = opt.value"
          >
            {{ opt.label }}
          </button>
        </div>
      </div>
    </div>

    <!-- Results or empty state -->
    <template v-if="hasActiveSearch && !hasResults">
      <div class="search-page__empty">
        <div class="search-page__empty-icon">
          <SearchX :size="28" />
        </div>
        <h2 class="search-page__empty-title">{{ $t("SEARCH_EMPTY_TITLE") }}</h2>
        <p class="search-page__empty-desc">
          {{ $t("SEARCH_EMPTY_DESCRIPTION", { query: query }) }}
        </p>

        <div class="search-page__empty-actions">
          <AppButton variant="primary" @click="viewPopular">
            {{ $t("SEARCH_EMPTY_VIEW_POPULAR") }}
          </AppButton>
          <AppButton variant="secondary" @click="reset">
            {{ $t("SEARCH_EMPTY_CLEAR") }}
          </AppButton>
        </div>

        <div class="search-page__popular">
          <span class="search-page__popular-label">{{ $t("SEARCH_POPULAR_QUERIES") }}</span>
          <div class="search-page__popular-chips">
            <button
              v-for="pq in popularQueries"
              :key="pq"
              type="button"
              class="search-page__chip"
              @click="usePopularQuery(pq)"
            >
              {{ pq }}
            </button>
          </div>
        </div>
      </div>
    </template>

    <template v-else>
      <div class="search-page__results-head">
        <span v-if="hasActiveSearch" class="search-page__results-count">
          {{ $t("SEARCH_RESULTS_FOUND_FOR", { count: filtered.length, query: query }) }}
        </span>
        <span v-else class="search-page__results-count">
          {{ $t("SEARCH_RESULTS_TOTAL", { count: filtered.length }) }}
        </span>

        <AppSelect
          :model-value="sort"
          :options="sortOptions"
          item-title="label"
          item-value="value"
          class="search-page__sort"
          @update:model-value="v => sort = v as TSearchSort"
        />
      </div>

      <div class="search-page__grid">
        <SearchResultCard
          v-for="item in filtered"
          :key="item.id"
          :item="item"
          @select="onSelect"
        />
      </div>
    </template>
  </div>
</template>

<script setup lang="ts">
import { Search, SearchX, X } from "lucide-vue-next";
import { SearchResultCard } from "../components";
import { useSearch } from "../composables";
import type { ISearchItem, TSearchSort } from "../domain";

const {
  query,
  typeFilter,
  genreFilter,
  yearFilter,
  sort,
  filtered,
  hasActiveSearch,
  hasResults,
  typeFilterOptions,
  genreFilterOptions,
  yearFilterOptions,
  sortOptions,
  popularQueries,
  submit,
  reset,
  usePopularQuery,
} = useSearch();

const { open } = useMediaModal();
const mocks = useMediaMocks();

const inputEl = ref<HTMLInputElement | null>(null);

onMounted(() => {
  inputEl.value?.focus();
});

function onSelect(item: ISearchItem) {
  if (item.type === "movie") return open(mocks.movie.value);
  if (item.type === "series") return open(mocks.series.value);
  if (item.type === "anime") return open(mocks.anime.value);
}

function viewPopular() {
  reset();
}

useHead({
  title: "Cinema — Пошук",
});

useListingCanonical();
</script>

<style lang="scss" scoped>
.search-page {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-lg);
  padding: calc(var(--spacing-3xl) + 60px) var(--spacing-3xl) var(--spacing-3xl);

  &__input {
    align-items: center;
    background: var(--color-surface-alt);
    border: 1px solid var(--color-border);
    border-radius: var(--radius-lg);
    display: flex;
    gap: var(--spacing-xs);
    padding: 0 var(--spacing-base);
    transition: border-color 0.2s ease;

    &:focus-within {
      border-color: var(--color-primary);
    }
  }

  &__input-icon {
    color: var(--color-text-tertiary);
    flex-shrink: 0;
  }

  &__field {
    @include FluidFontBodyMd;
    background: transparent;
    border: none;
    color: var(--color-white);
    flex: 1;
    height: 56px;
    outline: none;
    padding: 0;

    &::placeholder {
      color: var(--color-placeholder);
    }

    &::-webkit-search-cancel-button {
      display: none;
    }
  }

  &__clear {
    align-items: center;
    background: transparent;
    border: none;
    border-radius: var(--radius-full);
    color: var(--color-text-tertiary);
    cursor: pointer;
    display: inline-flex;
    height: 28px;
    justify-content: center;
    transition: all 0.2s ease;
    width: 28px;

    &:hover {
      background: var(--color-background-hover);
      color: var(--color-white);
    }
  }

  &__hint {
    @include FluidFontCaption;
    color: var(--color-text-tertiary);
    margin: calc(var(--spacing-lg) * -1 + var(--spacing-2xs)) 0 0;
  }

  &__filters {
    display: flex;
    flex-wrap: wrap;
    gap: var(--spacing-lg);
  }

  &__filter {
    align-items: center;
    display: flex;
    flex-wrap: wrap;
    gap: var(--spacing-xs);
  }

  &__filter-label {
    @include FluidFontBodySm;
    color: var(--color-text-secondary);
    margin-right: var(--spacing-2xs);
  }

  &__chips {
    align-items: center;
    display: flex;
    flex-wrap: wrap;
    gap: var(--spacing-2xs);
  }

  &__chip {
    @include FluidFontBodySm;
    background: var(--color-surface-alt);
    border: 1px solid var(--color-border);
    border-radius: var(--radius-full);
    color: var(--color-text-primary);
    cursor: pointer;
    font-weight: 600;
    padding: var(--spacing-2xs) var(--spacing-base);
    transition: all 0.2s ease;

    &:hover {
      background: var(--color-background-hover);
      color: var(--color-white);
    }

    &--active {
      background: var(--color-primary);
      border-color: var(--color-primary);
      color: var(--color-white);
    }
  }

  &__results-head {
    align-items: center;
    display: flex;
    gap: var(--spacing-base);
    justify-content: space-between;
  }

  &__results-count {
    @include FluidFontBodySm;
    color: var(--color-text-secondary);
  }

  &__sort {
    max-width: 220px;
  }

  &__grid {
    display: grid;
    gap: var(--spacing-lg);
    grid-template-columns: repeat(5, 1fr);
  }

  &__empty {
    align-items: center;
    display: flex;
    flex-direction: column;
    gap: var(--spacing-base);
    padding: var(--spacing-3xl) var(--spacing-lg);
    text-align: center;
  }

  &__empty-icon {
    align-items: center;
    background: var(--color-surface-alt);
    border-radius: var(--radius-full);
    color: var(--color-text-tertiary);
    display: flex;
    height: 72px;
    justify-content: center;
    width: 72px;
  }

  &__empty-title {
    @include FluidFontH2;
    color: var(--color-white);
    margin: 0;
  }

  &__empty-desc {
    @include FluidFontBodyMd;
    color: var(--color-text-secondary);
    margin: 0;
    max-width: 480px;
  }

  &__empty-actions {
    align-items: center;
    display: flex;
    gap: var(--spacing-xs);
    margin-top: var(--spacing-xs);
  }

  &__popular {
    display: flex;
    flex-direction: column;
    gap: var(--spacing-xs);
    margin-top: var(--spacing-lg);
  }

  &__popular-label {
    @include FluidFontBodySm;
    color: var(--color-text-tertiary);
  }

  &__popular-chips {
    display: flex;
    flex-wrap: wrap;
    gap: var(--spacing-2xs);
    justify-content: center;
  }
}
</style>
