<template>
  <AppTable :columns="columns" :data="tableData" selectable :selected-rows="selectedRows" :sort-by="sortBy" row-key="id" :empty-text="$t('ADMIN_USERS_EMPTY')" @update:selected-rows="$emit('update:selectedRows', $event)" @update:sort-by="$emit('update:sortBy', $event)">
    <template #cell-name="{ row }">
      <div class="user-cell">
        <AppAvatar :initials="getInitials(row)" size="small" />
        <div class="user-cell__info">
          <span class="user-cell__name">{{ row.firstName }} {{ row.lastName }}</span>
          <span class="user-cell__email">{{ row.email }}</span>
        </div>
      </div>
    </template>
    <template #cell-status="{ row }">
      <AppBadge :variant="getStatusVariant(row.status as string)" read-only>{{ getStatusLabel(row.status as string) }}</AppBadge>
    </template>
    <template #cell-watchedHours="{ value }">
      <span class="hours-cell">{{ value }}{{ $t('ADMIN_USERS_HOURS_SHORT') }}</span>
    </template>
    <template #cell-actions="{ row }">
      <div class="actions-cell">
        <button class="actions-cell__btn" @click="$emit('edit', row.id as string)"><SquarePen :size="16" /></button>
        <button class="actions-cell__btn" @click="$emit('view', row.id as string)"><Eye :size="16" /></button>
        <button class="actions-cell__btn actions-cell__btn--danger" @click="$emit('delete', row.id as string)"><Trash2 :size="16" /></button>
      </div>
    </template>
    <template #pagination>
      <div class="footer"><span class="footer__info">{{ $t('ADMIN_USERS_SHOWING', { start: (currentPage - 1) * itemsPerPage + 1, end: Math.min(currentPage * itemsPerPage, totalItems), total: totalItems }) }}</span>
        <div class="footer__pages"><AppPagination :current-page="currentPage" :total-items="totalItems" :items-per-page="itemsPerPage" @update:current-page="$emit('update:currentPage', $event)" /></div>
        <div class="footer__per-page"><span>{{ $t('ADMIN_USERS_PER_PAGE') }}</span><AppSelect :model-value="itemsPerPage" :options="[10, 20, 50]" @update:model-value="$emit('update:itemsPerPage', $event)" /></div>
      </div>
    </template>
  </AppTable>
</template>
<script setup lang="ts">
import { SquarePen, Eye, Trash2 } from 'lucide-vue-next'
import type { ISortState } from '~/components/System/AppTable/index.types'
import type { IUser } from '../domain'
const { t } = useI18n()
const props = defineProps<{ users: IUser[]; selectedRows: string[]; currentPage: number; totalItems: number; itemsPerPage: number; sortBy: ISortState | null }>()
defineEmits<{ 'update:selectedRows': [value: (string | number)[]]; 'update:currentPage': [value: number]; 'update:itemsPerPage': [value: number]; 'update:sortBy': [value: ISortState]; edit: [id: string]; view: [id: string]; delete: [id: string] }>()
const columns = computed(() => [
  { key: 'name', label: t('ADMIN_USERS_COL_NAME'), width: '280px', sortable: true },
  { key: 'status', label: t('ADMIN_USERS_COL_STATUS'), align: 'center' as const, sortable: true },
  { key: 'country', label: t('ADMIN_USERS_COL_COUNTRY'), sortable: true },
  { key: 'watchedHours', label: t('ADMIN_USERS_COL_WATCHED'), align: 'center' as const, sortable: true },
  { key: 'registeredAt', label: t('ADMIN_USERS_COL_REGISTERED'), sortable: true },
  { key: 'lastLogin', label: t('ADMIN_USERS_COL_LAST_LOGIN'), sortable: true },
  { key: 'actions', label: t('ADMIN_USERS_COL_ACTIONS'), align: 'right' as const },
])
const tableData = computed(() => props.users as unknown as Record<string, unknown>[])
const getInitials = (row: Record<string, unknown>) => `${(row.firstName as string)?.[0] || ''}${(row.lastName as string)?.[0] || ''}`
const getStatusVariant = (s: string) => ({ active: 'success', banned: 'danger', inactive: 'basic' }[s] || 'basic')
const getStatusLabel = (s: string) => ({ active: t('ADMIN_USERS_STATUS_ACTIVE'), banned: t('ADMIN_USERS_STATUS_BANNED'), inactive: t('ADMIN_USERS_STATUS_INACTIVE') }[s] || s)
</script>
<style lang="scss" scoped>
.user-cell {
  align-items: center;
  display: flex;
  gap: var(--spacing-sm);

  &__info { display: flex;
  flex-direction: column;
  gap: var(--spacing-3xs);
}

  &__name {
    @include FluidFontBodySm;
    color: var(--color-white);
    font-weight: 600;
  }

  &__email {
    @include FluidFontCaption;
    color: var(--color-text-tertiary);
    };
  }

.hours-cell {
  @include FluidFontBodySm;
  color: var(--color-text-primary);
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

.footer {
  align-items: center;
  display: grid;
  grid-template-columns: 1fr auto 1fr;
}

.footer__info {
  @include FluidFontCaption;
  color: var(--color-text-secondary);
}

.footer__pages {
  :deep(.app-pagination__info) { display: none;
  }

 :deep(.app-pagination) { justify-content: center;
  };
}

.footer__per-page {
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
