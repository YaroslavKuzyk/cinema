<template>
  <AppTable :columns="columns" :data="tableData" selectable :selected-rows="selectedRows" :sort-by="sortBy" row-key="id" :empty-text="$t('ADMIN_MOVIES_EMPTY')" @update:selected-rows="$emit('update:selectedRows', $event)" @update:sort-by="$emit('update:sortBy', $event)">
    <template #cell-title="{ row }">
      <div class="movie-cell">
        <div class="movie-cell__poster"><Film :size="18" /></div>
        <div class="movie-cell__info">
          <span class="movie-cell__title">{{ row.title }}</span>
          <span class="movie-cell__meta">{{ row.director }} · {{ row.duration }} {{ $t('ADMIN_MOVIES_MIN') }}</span>
        </div>
      </div>
    </template>

    <template #cell-status="{ row }">
      <AppBadge :variant="getStatusVariant(row.status as string)" read-only>{{ getStatusLabel(row.status as string) }}</AppBadge>
    </template>

    <template #cell-views="{ row }">
      <span class="views-cell" :class="{ 'views-cell--empty': !row.views }">{{ row.views || '—' }}</span>
    </template>

    <template #cell-rating="{ row }">
      <span v-if="row.rating" class="rating-cell"><Star :size="14" class="rating-cell__star" /> {{ row.rating }}</span>
      <span v-else class="views-cell--empty">—</span>
    </template>

    <template #cell-duration="{ row }">
      <span>{{ row.duration }} {{ $t('ADMIN_MOVIES_MIN') }}</span>
    </template>

    <template #cell-actions="{ row }">
      <div class="actions-cell">
        <button class="actions-cell__btn" :title="$t('ADMIN_MOVIES_EDIT')" @click="$emit('edit', row.id as string)"><SquarePen :size="16" /></button>
        <button class="actions-cell__btn" :title="$t('ADMIN_MOVIES_VIEW')" @click="$emit('view', row.id as string)"><Eye :size="16" /></button>
        <button class="actions-cell__btn actions-cell__btn--danger" :title="$t('ADMIN_MOVIES_DELETE')" @click="$emit('delete', row.id as string)"><Trash2 :size="16" /></button>
      </div>
    </template>

    <template #pagination>
      <div class="admin-movies-table__footer">
        <span class="admin-movies-table__info">{{ $t('ADMIN_MOVIES_SHOWING', { start: (currentPage - 1) * itemsPerPage + 1, end: Math.min(currentPage * itemsPerPage, totalItems), total: totalItems }) }}</span>
        <div class="admin-movies-table__pages"><AppPagination :current-page="currentPage" :total-items="totalItems" :items-per-page="itemsPerPage" @update:current-page="$emit('update:currentPage', $event)" /></div>
        <div class="admin-movies-table__per-page"><span>{{ $t('ADMIN_MOVIES_PER_PAGE') }}</span><AppSelect :model-value="itemsPerPage" :options="perPageOptions" @update:model-value="$emit('update:itemsPerPage', $event)" /></div>
      </div>
    </template>
  </AppTable>
</template>

<script setup lang="ts">
import { Film, SquarePen, Eye, Trash2, Star } from 'lucide-vue-next'
import type { ISortState } from '~/components/System/AppTable/index.types'
import type { IMovie } from '../domain'
const { t } = useI18n()

const props = defineProps<{ movies: IMovie[]; selectedRows: string[]; currentPage: number; totalItems: number; itemsPerPage: number; sortBy: ISortState | null }>()
defineEmits<{ 'update:selectedRows': [value: (string | number)[]]; 'update:currentPage': [value: number]; 'update:itemsPerPage': [value: number]; 'update:sortBy': [value: ISortState]; edit: [id: string]; view: [id: string]; delete: [id: string] }>()

const perPageOptions = [10, 20, 50]
const columns = computed(() => [
  { key: 'title', label: t('ADMIN_MOVIES_COL_TITLE'), width: '280px', sortable: true },
  { key: 'genre', label: t('ADMIN_MOVIES_COL_GENRE') },
  { key: 'year', label: t('ADMIN_MOVIES_COL_YEAR'), align: 'center' as const, sortable: true },
  { key: 'status', label: t('ADMIN_MOVIES_COL_STATUS'), align: 'center' as const, sortable: true },
  { key: 'views', label: t('ADMIN_MOVIES_COL_VIEWS'), align: 'center' as const, sortable: true },
  { key: 'rating', label: t('ADMIN_MOVIES_COL_RATING'), align: 'center' as const, sortable: true },
  { key: 'duration', label: t('ADMIN_MOVIES_COL_DURATION'), sortable: true },
  { key: 'actions', label: t('ADMIN_MOVIES_COL_ACTIONS'), align: 'right' as const },
])
const tableData = computed(() => props.movies as unknown as Record<string, unknown>[])
const getStatusVariant = (s: string) => ({ published: 'success', moderation: 'warning', draft: 'basic' }[s] || 'basic')
const getStatusLabel = (s: string) => ({ published: t('ADMIN_MOVIES_STATUS_PUBLISHED'), moderation: t('ADMIN_MOVIES_STATUS_MODERATION'), draft: t('ADMIN_MOVIES_STATUS_DRAFT') }[s] || s)
</script>

<style lang="scss" scoped>
.movie-cell {
  align-items: center;
  display: flex;
  gap: var(--spacing-sm);

  &__poster { align-items: center;
  background: var(--color-divider);
  border-radius: var(--radius-sm);
  color: var(--color-text-tertiary);
  display: flex;
  flex-shrink: 0;
  height: fluid(44px, 52px);
  justify-content: center;
  min-width: fluid(44px, 52px);
  width: fluid(44px, 52px);
}

  &__info {
    display: flex;
    flex-direction: column;
    gap: var(--spacing-3xs);
  }

  &__title {
    @include FluidFontBodySm;
    color: var(--color-white);
    font-weight: 600;
  }

  &__meta {
    @include FluidFontCaption;
    color: var(--color-text-tertiary);
    };
  }

.views-cell {
  @include FluidFontBodySm;
  color: var(--color-white);
  font-weight: 600;

  &--empty { color: var(--color-text-tertiary);
  };
}

.rating-cell {
  @include FluidFontBodySm;
  align-items: center;
  color: var(--color-text-primary);
  display: inline-flex;
  gap: var(--spacing-3xs);

  &__star { color: var(--color-warning);
  };
}

.actions-cell { display: flex; gap: var(--spacing-2xs); justify-content: flex-end;

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

    &:hover { background: var(--color-white-10);

    color: var(--color-white);

    }

 &--danger:hover { background: var(--color-danger-bg);

    color: var(--color-danger);

    } };

  }

.admin-movies-table__footer {
  align-items: center;
  display: grid;
  grid-template-columns: 1fr auto 1fr;
}

.admin-movies-table__info {
  @include FluidFontCaption;
  color: var(--color-text-secondary);
}

.admin-movies-table__pages {
  :deep(.app-pagination__info) { display: none;
  }

 :deep(.app-pagination) { justify-content: center;
  };
}

.admin-movies-table__per-page {
  align-items: center;
  display: flex;
  gap: var(--spacing-sm);
  justify-content: flex-end;

  span { @include FluidFontCaption;
  color: var(--color-text-secondary);
  white-space: nowrap;
  };
}
</style>
