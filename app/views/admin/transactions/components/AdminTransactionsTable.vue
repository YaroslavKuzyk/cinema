<template>
  <AppTable :columns="columns" :data="tableData" :sort-by="sortBy" row-key="id" :empty-text="$t('ADMIN_TX_EMPTY')" @update:sort-by="$emit('update:sortBy', $event)">
    <template #cell-user="{ row }">
      <div class="user-cell"><span class="user-cell__name">{{ row.userName }}</span><span class="user-cell__email">{{ row.userEmail }}</span></div>
    </template>
    <template #cell-amount="{ row }">
      <span class="amount-cell">{{ formatNumber(row.amount as number) }} {{ row.currency }}</span>
    </template>
    <template #cell-status="{ row }">
      <AppBadge :variant="getStatusVariant(row.status as string)" read-only>{{ getStatusLabel(row.status as string) }}</AppBadge>
    </template>
    <template #cell-paymentMethod="{ row }">
      <span class="method-cell">{{ getMethodLabel(row.paymentMethod as string) }}</span>
    </template>
    <template #cell-actions="{ row }">
      <div class="actions-cell">
        <button class="actions-cell__btn" :title="$t('ADMIN_TX_VIEW')" @click="$emit('view', row.id as string)"><Eye :size="16" /></button>
        <button v-if="row.status === 'success'" class="actions-cell__btn actions-cell__btn--danger" :title="$t('ADMIN_TX_REFUND')" @click="$emit('refund', row.id as string)"><RotateCcw :size="16" /></button>
      </div>
    </template>
    <template #pagination>
      <div class="footer"><span class="footer__info">{{ $t('ADMIN_TX_SHOWING', { start: (currentPage - 1) * itemsPerPage + 1, end: Math.min(currentPage * itemsPerPage, totalItems), total: totalItems }) }}</span>
        <div class="footer__pages"><AppPagination :current-page="currentPage" :total-items="totalItems" :items-per-page="itemsPerPage" @update:current-page="$emit('update:currentPage', $event)" /></div>
        <div class="footer__per-page"><span>{{ $t('ADMIN_TX_PER_PAGE') }}</span><AppSelect :model-value="itemsPerPage" :options="[10, 20, 50]" @update:model-value="$emit('update:itemsPerPage', $event)" /></div>
      </div>
    </template>
  </AppTable>
</template>
<script setup lang="ts">
import { Eye, RotateCcw } from 'lucide-vue-next'
import type { ISortState } from '~/components/System/AppTable/index.types'
import type { ITransaction } from '../domain'
const { t } = useI18n()
const props = defineProps<{ transactions: ITransaction[]; currentPage: number; totalItems: number; itemsPerPage: number; sortBy: ISortState | null }>()
defineEmits<{ 'update:currentPage': [value: number]; 'update:itemsPerPage': [value: number]; 'update:sortBy': [value: ISortState]; view: [id: string]; refund: [id: string] }>()
const columns = computed(() => [
  { key: 'invoiceId', label: t('ADMIN_TX_COL_INVOICE'), sortable: true },
  { key: 'user', label: t('ADMIN_TX_COL_USER'), width: '220px', sortable: true },
  { key: 'planName', label: t('ADMIN_TX_COL_PLAN'), sortable: true },
  { key: 'amount', label: t('ADMIN_TX_COL_AMOUNT'), sortable: true },
  { key: 'status', label: t('ADMIN_TX_COL_STATUS'), align: 'center' as const, sortable: true },
  { key: 'paymentMethod', label: t('ADMIN_TX_COL_METHOD'), sortable: true },
  { key: 'date', label: t('ADMIN_TX_COL_DATE'), sortable: true },
  { key: 'actions', label: t('ADMIN_TX_COL_ACTIONS'), align: 'right' as const },
])
const tableData = computed(() => props.transactions as unknown as Record<string, unknown>[])
const formatNumber = (n: number) => n.toLocaleString('uk-UA')
const getStatusVariant = (s: string) => ({ success: 'success', pending: 'warning', failed: 'danger', refunded: 'info' }[s] || 'basic')
const getStatusLabel = (s: string) => ({ success: t('ADMIN_TX_STATUS_SUCCESS'), pending: t('ADMIN_TX_STATUS_PENDING'), failed: t('ADMIN_TX_STATUS_FAILED'), refunded: t('ADMIN_TX_STATUS_REFUNDED') }[s] || s)
const getMethodLabel = (m: string) => ({ card: t('ADMIN_TX_METHOD_CARD'), google_pay: t('ADMIN_TX_METHOD_GOOGLE'), apple_pay: t('ADMIN_TX_METHOD_APPLE'), paypal: t('ADMIN_TX_METHOD_PAYPAL') }[m] || m)
</script>
<style lang="scss" scoped>
.user-cell {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-3xs);

  &__name { @include FluidFontBodySm;
  color: var(--color-white);
  font-weight: 600;
}

  &__email {
    @include FluidFontCaption;
    color: var(--color-text-tertiary);
    };
  }

.amount-cell {
  @include FluidFontBodySm;
  color: var(--color-white);
  font-weight: 600;
}

.method-cell {
  @include FluidFontCaption;
  color: var(--color-text-secondary);
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
