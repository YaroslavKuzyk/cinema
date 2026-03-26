<template>
  <div class="admin-account-page">
    <AdminAccountHeader
      :full-name="fullName"
      :email="personalInfo.email || 'admin@cinema.ua'"
      :role="accountInfo.role"
      :joined-at="accountInfo.joinedAt"
      :stats="stats"
      :tabs="tabs"
      :active-tab="activeTab"
      @edit="toggleEditMode"
      @update:active-tab="activeTab = $event"
    />

    <div class="admin-account-page__layout">
      <div class="admin-account-page__content">
        <AdminAccountPersonalInfo
          v-model="personalInfo"
          :readonly="isReadonly"
          @save="savePersonalInfo"
        />

        <AdminAccountSecurity
          v-model="security"
          :readonly="isReadonly"
          @save="saveSecurity"
        />

        <AdminAccountSessions
          :sessions="sessions"
          @end-session="endSession"
        />

        <AdminAccountNotifications
          v-model="notifications"
          :readonly="isReadonly"
          @save="saveNotifications"
        />
      </div>

      <div class="admin-account-page__aside">
        <AdminAccountInfoCard :info="accountInfo" />
        <AdminAccountActivityCard :activities="activities" />
        <AdminAccountDangerZone
          @logout-all="logoutAllDevices"
          @deactivate="deactivateAccount"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {
  AdminAccountHeader,
  AdminAccountPersonalInfo,
  AdminAccountSecurity,
  AdminAccountSessions,
  AdminAccountNotifications,
  AdminAccountInfoCard,
  AdminAccountActivityCard,
  AdminAccountDangerZone,
} from '../components'
import { useAdminAccount } from '../composables'

const {
  isReadonly,
  activeTab,
  personalInfo,
  security,
  notifications,
  stats,
  accountInfo,
  sessions,
  activities,
  tabs,
  toggleEditMode,
  savePersonalInfo,
  saveSecurity,
  saveNotifications,
  endSession,
  logoutAllDevices,
  deactivateAccount,
} = useAdminAccount()

const fullName = computed(() => {
  const { firstName, lastName } = personalInfo
  if (firstName || lastName) {
    return `${firstName} ${lastName}`.trim()
  }
  return 'Ярослав Кузик'
})
</script>

<style lang="scss" scoped>
.admin-account-page {
  &__layout {
    display: flex;
    gap: var(--spacing-xl);
  }

  &__content {
    display: flex;
    flex: 1;
    flex-direction: column;
    gap: var(--spacing-lg);
  }

  &__aside {
    display: flex;
    flex-direction: column;
    gap: var(--spacing-lg);
    max-width: var(--container-md);
    width: 100%;

    @media (width <= 1440px) {
      max-width: var(--container-sm);
    }
  }
}
</style>
