<template>
  <div class="admin-genres-page">
    <AdminGenresHeader @create="navigateTo('/admin/genres/create')" />
    <AdminGenresStats :stats="stats" />
    <AdminGenresFilters
      :model-value="filters"
      :total-found="filteredGenres.length"
      :status-options="statusOptions"
      @update:model-value="Object.assign(filters, $event)"
    />
    <AdminGenresBulkActions
      :count="selectedRows.length"
      @activate="bulkActivate"
      @hide="bulkHide"
      @delete="bulkDelete"
    />
    <AdminGenresTable
      :genres="paginatedGenres"
      :selected-rows="selectedRows"
      :current-page="currentPage"
      :total-items="filteredGenres.length"
      :items-per-page="itemsPerPage"
      :sort-by="sortBy"
      @update:selected-rows="selectedRows = $event as string[]"
      @update:current-page="currentPage = $event"
      @update:items-per-page="itemsPerPage = $event"
      @update:sort-by="updateSort"
      @edit="(id) => navigateTo(`/admin/genres/${id}/edit`)"
      @view="(id) => navigateTo(`/admin/genres/${id}`)"
      @delete="() => {}"
    />
  </div>
</template>

<script setup lang="ts">
import {
  AdminGenresHeader,
  AdminGenresStats,
  AdminGenresFilters,
  AdminGenresBulkActions,
  AdminGenresTable,
} from '../components'
import { useAdminGenres } from '../composables'

const {
  filters,
  selectedRows,
  currentPage,
  itemsPerPage,
  stats,
  filteredGenres,
  paginatedGenres,
  sortBy,
  statusOptions,
  updateSort,
  bulkActivate,
  bulkHide,
  bulkDelete,
} = useAdminGenres()
</script>

<style lang="scss" scoped>
.admin-genres-page {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-lg);
}
</style>
