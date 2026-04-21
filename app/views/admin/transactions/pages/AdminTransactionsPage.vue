<template>
  <div class="admin-tx-page">
    <AdminTransactionsHeader @export="() => {}" />
    <AdminTransactionsStats :stats="stats" />
    <AdminTransactionsFilters :model-value="filters" :total-found="filteredTransactions.length" :status-options="statusOptions" :method-options="methodOptions" @update:model-value="Object.assign(filters, $event)" />
    <AdminTransactionsTable
:transactions="paginatedTransactions" :current-page="currentPage" :total-items="filteredTransactions.length" :items-per-page="itemsPerPage" :sort-by="sortBy"
      @update:current-page="currentPage = $event" @update:items-per-page="itemsPerPage = $event" @update:sort-by="updateSort"
      @view="() => {}" @refund="() => {}" />
  </div>
</template>
<script setup lang="ts">
import { AdminTransactionsHeader, AdminTransactionsStats, AdminTransactionsFilters, AdminTransactionsTable } from '../components'
import { useAdminTransactions } from '../composables'
const { filters, sortBy, currentPage, itemsPerPage, stats, filteredTransactions, paginatedTransactions, statusOptions, methodOptions, updateSort } = useAdminTransactions()
</script>
<style lang="scss" scoped>
.admin-tx-page {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-lg);
}
</style>
