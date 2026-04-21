<template>
  <AppTable :columns="columns" :data="tableData" :sort-by="sortBy" row-key="id" :empty-text="$t('ADMIN_PLANS_EMPTY')" @update:sort-by="$emit('update:sortBy', $event)">
    <template #cell-name="{ row }">
      <div class="plan-cell"><span class="plan-cell__icon">{{ row.icon }}</span><div class="plan-cell__info"><span class="plan-cell__name">{{ row.name }}</span><span class="plan-cell__desc">{{ row.description }}</span></div></div>
    </template>
    <template #cell-price="{ row }">
      <span class="price-cell">{{ row.price === 0 ? $t('ADMIN_PLANS_FREE') : `${row.price} ${row.currency}` }}</span>
    </template>
    <template #cell-interval="{ row }">{{ getIntervalLabel(row.interval as string) }}</template>
    <template #cell-status="{ row }"><AppBadge :variant="row.status === 'active' ? 'success' : 'basic'" read-only>{{ row.status === 'active' ? $t('ADMIN_PLANS_STATUS_ACTIVE') : $t('ADMIN_PLANS_STATUS_HIDDEN') }}</AppBadge></template>
    <template #cell-usersCount="{ value }"><span class="users-cell">{{ formatNumber(value as number) }}</span></template>
    <template #cell-isFeatured="{ row }"><span v-if="row.isFeatured" class="featured-cell">⭐</span><span v-else>—</span></template>
    <template #cell-actions="{ row }">
      <div class="actions-cell">
        <button class="actions-cell__btn" @click="$emit('edit', row.id as string)"><SquarePen :size="16" /></button>
        <button class="actions-cell__btn" @click="$emit('view', row.id as string)"><Eye :size="16" /></button>
        <button class="actions-cell__btn actions-cell__btn--danger" @click="$emit('delete', row.id as string)"><Trash2 :size="16" /></button>
      </div>
    </template>
  </AppTable>
</template>
<script setup lang="ts">
import { SquarePen, Eye, Trash2 } from 'lucide-vue-next'
import type { ISortState } from '~/components/System/AppTable/index.types'
import type { IPlan } from '../domain'
const { t } = useI18n()
const props = defineProps<{ plans: IPlan[]; sortBy: ISortState | null }>()
defineEmits<{ 'update:sortBy': [value: ISortState]; edit: [id: string]; view: [id: string]; delete: [id: string] }>()
const columns = computed(() => [
  { key: 'name', label: t('ADMIN_PLANS_COL_NAME'), width: '260px', sortable: true },
  { key: 'price', label: t('ADMIN_PLANS_COL_PRICE'), sortable: true },
  { key: 'interval', label: t('ADMIN_PLANS_COL_INTERVAL'), sortable: true },
  { key: 'status', label: t('ADMIN_PLANS_COL_STATUS'), align: 'center' as const, sortable: true },
  { key: 'usersCount', label: t('ADMIN_PLANS_COL_USERS'), align: 'center' as const, sortable: true },
  { key: 'isFeatured', label: t('ADMIN_PLANS_COL_FEATURED'), align: 'center' as const },
  { key: 'actions', label: t('ADMIN_PLANS_COL_ACTIONS'), align: 'right' as const },
])
const tableData = computed(() => props.plans as unknown as Record<string, unknown>[])
const formatNumber = (n: number) => n.toLocaleString('uk-UA')
const getIntervalLabel = (i: string) => ({ month: t('ADMIN_PLANS_INTERVAL_MONTH'), year: t('ADMIN_PLANS_INTERVAL_YEAR'), lifetime: t('ADMIN_PLANS_INTERVAL_LIFETIME') }[i] || i)
</script>
<style lang="scss" scoped>
.plan-cell {
  align-items: center;
  display: flex;
  gap: var(--spacing-sm);

  &__icon { font-size: fluid(20px, 28px);
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
    };
  }

.price-cell {
  @include FluidFontBodySm;
  color: var(--color-white);
  font-weight: 600;
}

.users-cell {
  @include FluidFontBodySm;
  color: var(--color-text-primary);
}
.featured-cell { font-size: 16px; }

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
</style>
