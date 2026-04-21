<template>
  <div class="admin-administrators-page">
    <AdminAdministratorsHeader
      @invite="openInviteModal"
    />

    <AdminAdministratorsStats :stats="stats" />

    <AdminAdministratorsFilters
      :model-value="filters"
      :total-found="filteredAdmins.length"
      @update:model-value="Object.assign(filters, $event)"
    />

    <div class="admin-administrators-page__grid">
      <AdminAdministratorCard
        v-for="admin in filteredAdmins"
        :key="admin.id"
        :admin="admin"
        @edit="openEditModal"
        @activity="openActivityModal"
        @disable="openDisableModal"
      />

      <AdminInvitationCard
        v-for="invitation in invitations"
        :key="invitation.id"
        :invitation="invitation"
        @resend="resendInvitation"
        @cancel="cancelInvitation"
      />

      <AdminInviteCard @click="openInviteModal" />
    </div>

    <AdminInviteModal
      v-model="isInviteModalOpen"
      @save="confirmInvite"
    />

    <AdminEditModal
      v-model="isEditModalOpen"
      :admin="editingAdmin"
      @save="confirmEdit"
    />

    <AdminDisableModal
      v-model="isDisableModalOpen"
      :admin="targetAdmin"
      @confirm="confirmDisable"
    />

    <AdminActivityModal
      v-model="isActivityModalOpen"
      :admin-name="targetAdmin ? `${targetAdmin.firstName} ${targetAdmin.lastName}` : ''"
      :activities="adminActivities"
    />
  </div>
</template>

<script setup lang="ts">
import {
  AdminAdministratorsHeader,
  AdminAdministratorsStats,
  AdminAdministratorsFilters,
  AdminAdministratorCard,
  AdminInvitationCard,
  AdminInviteCard,
  AdminInviteModal,
  AdminEditModal,
  AdminDisableModal,
  AdminActivityModal,
} from '../components'
import { useAdminAdministrators } from '../composables'

const {
  stats,
  filters,
  filteredAdmins,
  invitations,
  isInviteModalOpen,
  isEditModalOpen,
  isDisableModalOpen,
  isActivityModalOpen,
  adminActivities,
  editingAdmin,
  targetAdmin,
  openInviteModal,
  openEditModal,
  openActivityModal,
  openDisableModal,
  confirmInvite,
  confirmEdit,
  confirmDisable,
  resendInvitation,
  cancelInvitation,
} = useAdminAdministrators()
</script>

<style lang="scss" scoped>
.admin-administrators-page {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-lg);

  &__grid {
    display: grid;
    gap: var(--spacing-lg);
    grid-template-columns: repeat(3, minmax(0, 1fr));

    @media (width <= 1200px) {
      grid-template-columns: repeat(2, 1fr);
    }

    @media (width <= 768px) {
      grid-template-columns: 1fr;
    }
  }
}
</style>
