<template>
  <div class="admin-series-filters">
    <div class="admin-series-filters__left">
      <div class="admin-series-filters__search">
        <Search :size="16" class="admin-series-filters__search-icon" />
        <AppInput :model-value="modelValue.search" :placeholder="$t('ADMIN_SERIES_SEARCH_PLACEHOLDER')" @update:model-value="updateFilter('search', $event)" />
      </div>
      <div class="admin-series-filters__select">
        <AppSelect :model-value="modelValue.genre" :options="genreOptions" item-title="title" item-value="value" :prefix="$t('ADMIN_SERIES_FILTER_GENRE')" :placeholder="$t('ADMIN_SERIES_FILTER_GENRE')" @update:model-value="updateFilter('genre', $event)" />
      </div>
      <div class="admin-series-filters__select">
        <AppSelect :model-value="modelValue.status" :options="statusOptions" item-title="title" item-value="value" :prefix="$t('ADMIN_SERIES_FILTER_STATUS')" :placeholder="$t('ADMIN_SERIES_FILTER_STATUS')" @update:model-value="updateFilter('status', $event)" />
      </div>
      <div class="admin-series-filters__select">
        <AppSelect :model-value="modelValue.seasons" :options="seasonsOptions" item-title="title" item-value="value" :prefix="$t('ADMIN_SERIES_FILTER_SEASONS')" :placeholder="$t('ADMIN_SERIES_FILTER_SEASONS')" @update:model-value="updateFilter('seasons', $event)" />
      </div>
    </div>
    <div class="admin-series-filters__right">
      <span class="admin-series-filters__count">{{ $t('ADMIN_SERIES_FOUND', { count: totalFound }) }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Search } from 'lucide-vue-next'
import type { ISeriesFilters } from '../domain'

const props = defineProps<{
  modelValue: ISeriesFilters
  totalFound: number
  genreOptions: { title: string; value: string }[]
  statusOptions: { title: string; value: string }[]
  seasonsOptions: { title: string; value: string }[]
}>()

const emit = defineEmits<{ 'update:modelValue': [value: ISeriesFilters] }>()
const updateFilter = (key: keyof ISeriesFilters, value: string) => { emit('update:modelValue', { ...props.modelValue, [key]: value }) }
</script>

<style lang="scss" scoped>
.admin-series-filters {
  align-items: center;
  display: flex;
  gap: var(--spacing-md);
  justify-content: space-between;

  &__left { align-items: center;
  display: flex;
  gap: var(--spacing-md);
}

  &__search {
    position: relative;
    width: fluid(220px, 350px);
  }

  &__search-icon {
    color: var(--color-text-tertiary);
    left: var(--spacing-base);
    pointer-events: none;
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    z-index: 1;
  }
  &__search :deep(.app-input__field) { padding-left: calc(var(--spacing-base) + 16px + var(--spacing-xs)); }
  &__select { min-width: fluid(140px, 200px); }

  &__count {
    @include FluidFontBodySm;
    color: var(--color-text-secondary);
    white-space: nowrap;
    };
  }
</style>
