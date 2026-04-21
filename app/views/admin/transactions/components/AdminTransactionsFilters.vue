<!-- eslint-disable vue/no-mutating-props -->
<template>
  <div class="admin-tx-filters">
    <div class="admin-tx-filters__left">
      <div class="admin-tx-filters__search"><Search :size="16" class="admin-tx-filters__search-icon" /><AppInput :model-value="modelValue.search" :placeholder="$t('ADMIN_TX_SEARCH')" @update:model-value="updateFilter('search', $event)" /></div>
      <div class="admin-tx-filters__select"><AppSelect :model-value="modelValue.status" :options="statusOptions" item-title="title" item-value="value" :prefix="$t('ADMIN_TX_FILTER_STATUS')" :placeholder="$t('ADMIN_TX_FILTER_STATUS')" @update:model-value="updateFilter('status', $event)" /></div>
      <div class="admin-tx-filters__select"><AppSelect :model-value="modelValue.method" :options="methodOptions" item-title="title" item-value="value" :prefix="$t('ADMIN_TX_FILTER_METHOD')" :placeholder="$t('ADMIN_TX_FILTER_METHOD')" @update:model-value="updateFilter('method', $event)" /></div>
      <div class="admin-tx-filters__date"><AppDatePicker v-model="modelValue.dateRange" :placeholder="$t('ADMIN_TX_FILTER_DATE')" /></div>
    </div>
    <div class="admin-tx-filters__right"><span>{{ $t('ADMIN_TX_FOUND', { count: totalFound }) }}</span></div>
  </div>
</template>
<script setup lang="ts">
import { Search } from 'lucide-vue-next'
import type { ITransactionFilters } from '../domain'
const props = defineProps<{ modelValue: ITransactionFilters; totalFound: number; statusOptions: { title: string; value: string }[]; methodOptions: { title: string; value: string }[] }>()
const emit = defineEmits<{ 'update:modelValue': [value: ITransactionFilters] }>()
const updateFilter = (key: keyof ITransactionFilters, value: unknown) => { emit('update:modelValue', { ...props.modelValue, [key]: value }) }
</script>
<style lang="scss" scoped>
.admin-tx-filters {
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
    width: fluid(200px, 320px);
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
  &__select { min-width: fluid(130px, 180px); }
  &__date { min-width: fluid(160px, 220px); }

  &__right span {
    @include FluidFontBodySm;
    color: var(--color-text-secondary);
    white-space: nowrap;
    };
  }
</style>
