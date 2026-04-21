<template>
  <div class="admin-series-page">
    <AdminSeriesHeader @create="navigateTo('/admin/movies/create')" />
    <AdminSeriesStats :stats="stats" />
    <AdminSeriesFilters
      :model-value="filters"
      :total-found="filteredSeries.length"
      :genre-options="genreOptions"
      :status-options="statusOptions"
      :seasons-options="seasonsOptions"
      @update:model-value="Object.assign(filters, $event)"
    />
    <AdminSeriesBulkActions :count="selectedRows.length" @publish="bulkPublish" @archive="bulkArchive" @delete="bulkDelete" />
    <AdminSeriesTable
      :series="paginatedSeries"
      :selected-rows="selectedRows"
      :current-page="currentPage"
      :total-items="filteredSeries.length"
      :items-per-page="itemsPerPage"
      :sort-by="sortBy"
      @update:selected-rows="selectedRows = $event as string[]"
      @update:current-page="currentPage = $event"
      @update:items-per-page="itemsPerPage = $event"
      @update:sort-by="updateSort"
      @edit="(id) => navigateTo(`/admin/movies/${id}/edit`)"
      @view="(id) => navigateTo(`/admin/movies/${id}`)"
      @delete="() => {}"
    />
  </div>
</template>

<script setup lang="ts">
import {
  AdminSeriesHeader, AdminSeriesStats, AdminSeriesFilters,
  AdminSeriesBulkActions, AdminSeriesTable,
} from '../components'
import { useAdminSeries } from '../composables'

const {
  filters, sortBy, selectedRows, currentPage, itemsPerPage,
  stats, filteredSeries, paginatedSeries,
  genreOptions, statusOptions, seasonsOptions,
  updateSort, bulkPublish, bulkArchive, bulkDelete,
} = useAdminSeries()
</script>

<style lang="scss" scoped>
.admin-series-page {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-lg);
}
</style>
