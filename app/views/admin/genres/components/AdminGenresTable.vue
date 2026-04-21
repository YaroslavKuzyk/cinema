<template>
  <AppTable
    :columns="columns"
    :data="tableData"
    selectable
    :selected-rows="selectedRows"
    :sort-by="sortBy"
    row-key="id"
    :empty-text="$t('ADMIN_GENRES_EMPTY')"
    @update:selected-rows="$emit('update:selectedRows', $event)"
    @update:sort-by="$emit('update:sortBy', $event)"
  >
    <template #cell-name="{ row }">
      <div class="genre-cell">
        <span class="genre-cell__icon">{{ row.icon }}</span>
        <div class="genre-cell__info">
          <span class="genre-cell__name">{{ row.name }}</span>
          <span class="genre-cell__desc">{{ row.description }}</span>
        </div>
      </div>
    </template>

    <template #cell-color="{ row }">
      <div class="color-cell">
        <span class="color-cell__dot" :style="{ backgroundColor: row.color as string }" />
        <span class="color-cell__hex">{{ row.color }}</span>
      </div>
    </template>

    <template #cell-moviesCount="{ value }">
      <span class="number-cell">{{ value }}</span>
    </template>

    <template #cell-seriesCount="{ value }">
      <span class="number-cell">{{ value }}</span>
    </template>

    <template #cell-animeCount="{ value }">
      <span class="number-cell">{{ value }}</span>
    </template>

    <template #cell-status="{ row }">
      <AppBadge :variant="row.status === 'active' ? 'success' : 'basic'" read-only>
        {{ row.status === 'active' ? $t('ADMIN_GENRES_STATUS_ACTIVE') : $t('ADMIN_GENRES_STATUS_HIDDEN') }}
      </AppBadge>
    </template>

    <template #cell-slug="{ value }">
      <span class="slug-cell">{{ value }}</span>
    </template>

    <template #cell-actions="{ row }">
      <div class="actions-cell">
        <button class="actions-cell__btn" :title="$t('ADMIN_GENRES_EDIT')" @click="$emit('edit', row.id as string)">
          <SquarePen :size="16" />
        </button>
        <button class="actions-cell__btn" :title="$t('ADMIN_GENRES_VIEW')" @click="$emit('view', row.id as string)">
          <Eye :size="16" />
        </button>
        <button class="actions-cell__btn actions-cell__btn--danger" :title="$t('ADMIN_GENRES_DELETE')" @click="$emit('delete', row.id as string)">
          <Trash2 :size="16" />
        </button>
      </div>
    </template>

    <template #pagination>
      <div class="admin-genres-table__footer">
        <span class="admin-genres-table__info">
          {{ $t('ADMIN_GENRES_SHOWING', { start: (currentPage - 1) * itemsPerPage + 1, end: Math.min(currentPage * itemsPerPage, totalItems), total: totalItems }) }}
        </span>
        <div class="admin-genres-table__pages">
          <AppPagination
            :current-page="currentPage"
            :total-items="totalItems"
            :items-per-page="itemsPerPage"
            @update:current-page="$emit('update:currentPage', $event)"
          />
        </div>
        <div class="admin-genres-table__per-page">
          <span>{{ $t('ADMIN_GENRES_PER_PAGE') }}</span>
          <AppSelect
            :model-value="itemsPerPage"
            :options="perPageOptions"
            @update:model-value="$emit('update:itemsPerPage', $event)"
          />
        </div>
      </div>
    </template>
  </AppTable>
</template>

<script setup lang="ts">
import { SquarePen, Eye, Trash2 } from 'lucide-vue-next'
import type { ISortState } from '~/components/System/AppTable/index.types'
import type { IGenre } from '../domain'

const { t } = useI18n()

const props = defineProps<{
  genres: IGenre[]
  selectedRows: string[]
  currentPage: number
  totalItems: number
  itemsPerPage: number
  sortBy: ISortState | null
}>()

defineEmits<{
  'update:selectedRows': [value: (string | number)[]]
  'update:currentPage': [value: number]
  'update:itemsPerPage': [value: number]
  'update:sortBy': [value: ISortState]
  edit: [id: string]
  view: [id: string]
  delete: [id: string]
}>()

const perPageOptions = [10, 20, 50]

const columns = computed(() => [
  { key: 'name', label: t('ADMIN_GENRES_COL_GENRE'), width: '280px', sortable: true },
  { key: 'color', label: t('ADMIN_GENRES_COL_COLOR'), width: '120px', sortable: true },
  { key: 'moviesCount', label: t('ADMIN_GENRES_COL_MOVIES'), align: 'center' as const, sortable: true },
  { key: 'seriesCount', label: t('ADMIN_GENRES_COL_SERIES'), align: 'center' as const, sortable: true },
  { key: 'animeCount', label: t('ADMIN_GENRES_COL_ANIME'), align: 'center' as const, sortable: true },
  { key: 'status', label: t('ADMIN_GENRES_COL_STATUS'), align: 'center' as const, sortable: true },
  { key: 'slug', label: t('ADMIN_GENRES_COL_SLUG'), sortable: true },
  { key: 'actions', label: t('ADMIN_GENRES_COL_ACTIONS'), align: 'right' as const },
])

const tableData = computed(() => {
  return props.genres as unknown as Record<string, unknown>[]
})

</script>

<style lang="scss" scoped>
.genre-cell {
  align-items: center;
  display: flex;
  gap: var(--spacing-sm);

  &__icon {
    align-items: center;
    background: var(--color-divider);
    border-radius: var(--radius-md);
    display: flex;
    flex-shrink: 0;
    font-size: fluid(18px, 24px);
    height: fluid(36px, 44px);
    justify-content: center;
    min-width: fluid(36px, 44px);
    width: fluid(36px, 44px);
  }

  &__info {
    display: flex;
    flex-direction: column;
    gap: var(--spacing-3xs);
  }

  &__name {
    @include FluidFontBodySm;
    color: var(--color-white);
    font-weight: 600;
  }

  &__desc {
    @include FluidFontCaption;

    color: var(--color-text-tertiary);

  }
}

.color-cell {
  align-items: center;
  display: flex;
  gap: var(--spacing-xs);

  &__dot {
    border-radius: var(--radius-full);
    flex-shrink: 0;
    height: 12px;
    width: 12px;
  }

  &__hex {
    @include FluidFontCaption;

    color: var(--color-text-secondary);

  }
}

.number-cell {
  @include FluidFontBodySm;

  color: var(--color-text-primary);

}

.slug-cell {
  @include FluidFontCaption;

  color: var(--color-text-secondary);

}

.actions-cell {
  display: flex;
  gap: var(--spacing-2xs);
  justify-content: flex-end;

  &__btn {
    align-items: center;
    background: none;
    border: none;
    border-radius: var(--radius-xs);
    color: var(--color-text-secondary);
    cursor: pointer;
    display: flex;
    height: 30px;
    justify-content: center;
    transition: all 0.2s ease;
    width: 30px;

    &:hover {

      background: var(--color-white-10);

      color: var(--color-white);

    }

    &--danger:hover {

      background: var(--color-danger-bg);

      color: var(--color-danger);

    }
  }
}

.admin-genres-table__footer {
  align-items: center;
  display: grid;
  grid-template-columns: 1fr auto 1fr;
}

.admin-genres-table__info {
  @include FluidFontCaption;

  color: var(--color-text-secondary);

}

.admin-genres-table__pages {
  :deep(.app-pagination__info) {
    display: none;
  }

  :deep(.app-pagination) {
    justify-content: center;
  }
}

.admin-genres-table__per-page {
  align-items: center;
  display: flex;
  gap: var(--spacing-sm);
  justify-content: flex-end;

  span {
    @include FluidFontCaption;
    color: var(--color-text-secondary);
    white-space: nowrap;
  }
}
</style>
