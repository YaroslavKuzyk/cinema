<template>
  <div class="admin-movies-page">
    <AdminMoviesHeader @create="navigateTo('/admin/movies/create')" />
    <AdminMoviesStats :stats="stats" />
    <AdminMoviesFilters :model-value="filters" :total-found="filteredMovies.length" :genre-options="genreOptions" :status-options="statusOptions" :year-options="yearOptions" @update:model-value="Object.assign(filters, $event)" />
    <AdminMoviesBulkActions :count="selectedRows.length" @publish="bulkPublish" @archive="bulkArchive" @delete="bulkDelete" />
    <AdminMoviesTable :movies="paginatedMovies" :selected-rows="selectedRows" :current-page="currentPage" :total-items="filteredMovies.length" :items-per-page="itemsPerPage" :sort-by="sortBy" @update:selected-rows="selectedRows = $event as string[]" @update:current-page="currentPage = $event" @update:items-per-page="itemsPerPage = $event" @update:sort-by="updateSort" @edit="(id) => navigateTo(`/admin/movies/${id}/edit`)" @view="(id) => navigateTo(`/admin/movies/${id}`)" @delete="() => {}" />
  </div>
</template>

<script setup lang="ts">
import { AdminMoviesHeader, AdminMoviesStats, AdminMoviesFilters, AdminMoviesBulkActions, AdminMoviesTable } from '../components'
import { useAdminMovies } from '../composables'
const { filters, sortBy, selectedRows, currentPage, itemsPerPage, stats, filteredMovies, paginatedMovies, genreOptions, statusOptions, yearOptions, updateSort, bulkPublish, bulkArchive, bulkDelete } = useAdminMovies()
</script>

<style lang="scss" scoped>
.admin-movies-page {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-lg);
}
</style>
