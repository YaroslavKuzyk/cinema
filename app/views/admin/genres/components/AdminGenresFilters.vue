<template>
  <div class="admin-genres-filters">
    <div class="admin-genres-filters__left">
      <div class="admin-genres-filters__search">
        <Search :size="16" class="admin-genres-filters__search-icon" />
        <AppInput
          :model-value="modelValue.search"
          :placeholder="$t('ADMIN_GENRES_SEARCH_PLACEHOLDER')"
          @update:model-value="updateFilter('search', $event)"
        />
      </div>
      <div class="admin-genres-filters__select">
        <AppSelect
          :model-value="modelValue.status"
          :options="statusOptions"
          item-title="title"
          item-value="value"
          :prefix="$t('ADMIN_GENRES_FILTER_STATUS')"
          :placeholder="$t('ADMIN_GENRES_FILTER_STATUS')"
          @update:model-value="updateFilter('status', $event)"
        />
      </div>
    </div>
    <div class="admin-genres-filters__right">
      <span class="admin-genres-filters__count">
        {{ $t('ADMIN_GENRES_FOUND', { count: totalFound }) }}
      </span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Search } from 'lucide-vue-next'
import type { IGenreFilters } from '../domain'

const props = defineProps<{
  modelValue: IGenreFilters
  totalFound: number
  statusOptions: { title: string; value: string }[]
}>()

const emit = defineEmits<{
  'update:modelValue': [value: IGenreFilters]
}>()

const updateFilter = (key: keyof IGenreFilters, value: string) => {
  emit('update:modelValue', { ...props.modelValue, [key]: value })
}
</script>

<style lang="scss" scoped>
.admin-genres-filters {
  align-items: center;
  display: flex;
  gap: var(--spacing-md);
  justify-content: space-between;

  &__left {
    align-items: center;
    display: flex;
    gap: var(--spacing-md);
  }

  &__search {

    position: relative;

    width: fluid(250px, 400px);

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

  &__search :deep(.app-input__field) {
    padding-left: calc(var(--spacing-base) + 16px + var(--spacing-xs));
  }

  &__select {
    min-width: fluid(160px, 240px);
  }

  &__right {
    flex-shrink: 0;
  }

  &__count {
    @include FluidFontBodySm;
    color: var(--color-text-secondary);
    white-space: nowrap;
  }
}
</style>
