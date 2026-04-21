<template>
  <div class="admin-movies-filters">
    <div class="admin-movies-filters__left">
      <div class="admin-movies-filters__search">
        <Search :size="16" class="admin-movies-filters__search-icon" />
        <AppInput :model-value="modelValue.search" :placeholder="$t('ADMIN_MOVIES_SEARCH_PLACEHOLDER')" @update:model-value="updateFilter('search', $event)" />
      </div>
      <div class="admin-movies-filters__select"><AppSelect :model-value="modelValue.genre" :options="genreOptions" item-title="title" item-value="value" :prefix="$t('ADMIN_MOVIES_FILTER_GENRE')" :placeholder="$t('ADMIN_MOVIES_FILTER_GENRE')" @update:model-value="updateFilter('genre', $event)" /></div>
      <div class="admin-movies-filters__select"><AppSelect :model-value="modelValue.status" :options="statusOptions" item-title="title" item-value="value" :prefix="$t('ADMIN_MOVIES_FILTER_STATUS')" :placeholder="$t('ADMIN_MOVIES_FILTER_STATUS')" @update:model-value="updateFilter('status', $event)" /></div>
      <div class="admin-movies-filters__select"><AppSelect :model-value="modelValue.year" :options="yearOptions" item-title="title" item-value="value" :prefix="$t('ADMIN_MOVIES_FILTER_YEAR')" :placeholder="$t('ADMIN_MOVIES_FILTER_YEAR')" @update:model-value="updateFilter('year', $event)" /></div>
    </div>
    <div class="admin-movies-filters__right"><span class="admin-movies-filters__count">{{ $t('ADMIN_MOVIES_FOUND', { count: totalFound }) }}</span></div>
  </div>
</template>

<script setup lang="ts">
import { Search } from 'lucide-vue-next'
import type { IMovieFilters } from '../domain'
const props = defineProps<{ modelValue: IMovieFilters; totalFound: number; genreOptions: { title: string; value: string }[]; statusOptions: { title: string; value: string }[]; yearOptions: { title: string; value: string }[] }>()
const emit = defineEmits<{ 'update:modelValue': [value: IMovieFilters] }>()
const updateFilter = (key: keyof IMovieFilters, value: string) => { emit('update:modelValue', { ...props.modelValue, [key]: value }) }
</script>

<style lang="scss" scoped>
.admin-movies-filters {
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
  &__select { min-width: fluid(130px, 190px); }

  &__count {
    @include FluidFontBodySm;
    color: var(--color-text-secondary);
    white-space: nowrap;
    };
  }
</style>
