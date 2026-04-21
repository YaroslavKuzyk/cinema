<template>
  <div class="admin-users-page">
    <AdminUsersHeader @create="navigateTo('/admin/users/create')" />
    <AdminUsersStats :stats="stats" />
    <AdminUsersFilters :model-value="filters" :total-found="filteredUsers.length" :status-options="statusOptions" :country-options="countryOptions" @update:model-value="Object.assign(filters, $event)" />
    <AdminUsersBulkActions :count="selectedRows.length" @activate="bulkActivate" @ban="bulkBan" @delete="bulkDelete" />
    <AdminUsersTable
:users="paginatedUsers" :selected-rows="selectedRows" :current-page="currentPage" :total-items="filteredUsers.length" :items-per-page="itemsPerPage" :sort-by="sortBy"
      @update:selected-rows="selectedRows = $event as string[]" @update:current-page="currentPage = $event" @update:items-per-page="itemsPerPage = $event" @update:sort-by="updateSort"
      @edit="(id) => navigateTo(`/admin/users/${id}/edit`)" @view="(id) => navigateTo(`/admin/users/${id}`)" @delete="() => {}" />
  </div>
</template>
<script setup lang="ts">
import { AdminUsersHeader, AdminUsersStats, AdminUsersFilters, AdminUsersBulkActions, AdminUsersTable } from '../components'
import { useAdminUsers } from '../composables'
const { filters, sortBy, selectedRows, currentPage, itemsPerPage, stats, filteredUsers, paginatedUsers, statusOptions, countryOptions, updateSort, bulkBan, bulkActivate, bulkDelete } = useAdminUsers()
</script>
<style lang="scss" scoped>
.admin-users-page {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-lg);
}
</style>
