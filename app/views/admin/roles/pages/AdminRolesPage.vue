<template>
  <div class="admin-roles-page">
    <AdminRolesHeader @create="openCreateModal" />

    <div class="admin-roles-page__list">
      <AdminRoleCard
        v-for="role in roles"
        :key="role.id"
        :role="role"
        @edit="openEditModal"
        @view="openViewModal"
        @duplicate="openDuplicateModal"
        @delete="openDeleteModal"
      />

      <AdminRolesCreateButton @create="openCreateModal" />
    </div>

    <AdminRoleModal
      v-model="isModalOpen"
      :mode="modalMode"
      :role="editingRole"
      @save="saveRole"
    />

    <AdminRoleDeleteModal
      v-model="isDeleteModalOpen"
      :role="targetRole"
      :roles="roles"
      @confirm="confirmDelete"
    />

    <AdminRoleDuplicateModal
      v-model="isDuplicateModalOpen"
      :role="targetRole"
      @confirm="confirmDuplicate"
    />
  </div>
</template>

<script setup lang="ts">
import {
  AdminRolesHeader,
  AdminRoleCard,
  AdminRolesCreateButton,
  AdminRoleModal,
  AdminRoleDeleteModal,
  AdminRoleDuplicateModal,
} from '../components'
import { useAdminRoles } from '../composables'

const {
  roles,
  isModalOpen,
  modalMode,
  editingRole,
  isDeleteModalOpen,
  isDuplicateModalOpen,
  targetRole,
  openCreateModal,
  openEditModal,
  openViewModal,
  openDeleteModal,
  openDuplicateModal,
  confirmDelete,
  confirmDuplicate,
  saveRole,
} = useAdminRoles()
</script>

<style lang="scss" scoped>
.admin-roles-page {
  &__list {
    display: flex;
    flex-direction: column;
    gap: var(--spacing-lg);
  }
}
</style>
