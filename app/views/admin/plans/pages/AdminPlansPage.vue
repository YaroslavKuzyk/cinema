<template>
  <div class="admin-plans-page">
    <AdminPlansHeader @create="navigateTo('/admin/plans/create')" />
    <AdminPlansStats :stats="stats" />
    <AdminPlansTable
:plans="filteredPlans" :sort-by="sortBy"
      @update:sort-by="updateSort"
      @edit="(id) => navigateTo(`/admin/plans/${id}/edit`)" @view="(id) => navigateTo(`/admin/plans/${id}`)" @delete="() => {}" />
  </div>
</template>
<script setup lang="ts">
import { AdminPlansHeader, AdminPlansStats, AdminPlansTable } from '../components'
import { useAdminPlans } from '../composables'
const { sortBy, stats, filteredPlans, updateSort } = useAdminPlans()
</script>
<style lang="scss" scoped>
.admin-plans-page {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-lg);
}
</style>
