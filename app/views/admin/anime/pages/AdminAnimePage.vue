<template>
  <div class="admin-anime-page">
    <AdminAnimeHeader @create="navigateTo('/admin/movies/create')" />
    <AdminAnimeStats :stats="stats" />
    <AdminAnimeFilters
      :model-value="filters"
      :total-found="filteredAnime.length"
      :genre-options="genreOptions"
      :status-options="statusOptions"
      :seasons-options="seasonsOptions"
      @update:model-value="Object.assign(filters, $event)"
    />
    <AdminAnimeBulkActions
      :count="selectedRows.length"
      @publish="bulkPublish"
      @archive="bulkArchive"
      @delete="bulkDelete"
    />
    <AdminAnimeTable
      :anime="paginatedAnime"
      :selected-rows="selectedRows"
      :current-page="currentPage"
      :total-items="filteredAnime.length"
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
  AdminAnimeHeader,
  AdminAnimeStats,
  AdminAnimeFilters,
  AdminAnimeBulkActions,
  AdminAnimeTable,
} from '../components'
import { useAdminAnime } from '../composables'

const {
  filters,
  sortBy,
  selectedRows,
  currentPage,
  itemsPerPage,
  stats,
  filteredAnime,
  paginatedAnime,
  genreOptions,
  statusOptions,
  seasonsOptions,
  updateSort,
  bulkPublish,
  bulkArchive,
  bulkDelete,
} = useAdminAnime()
</script>

<style lang="scss" scoped>
.admin-anime-page {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-lg);
}
</style>
