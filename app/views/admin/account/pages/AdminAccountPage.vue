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
      @update:active-tab="handleTabChange"
    />

    <div class="admin-account-page__layout">
      <div class="admin-account-page__content">
        <AdminAccountPersonalInfo
          id="section-profile"
          v-model="personalInfo"
          :readonly="isReadonly"
          @save="savePersonalInfo"
        />

        <AdminAccountSecurity
          id="section-security"
          v-model="security"
          :readonly="isReadonly"
          @save="saveSecurity"
        />

        <AdminAccountNotifications
          id="section-notifications"
          v-model="notifications"
          :readonly="isReadonly"
          @save="saveNotifications"
        />

        <AdminAccountSessions
          id="section-sessions"
          :sessions="sessions"
          @end-session="endSession"
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
} from "../components";
import { useAdminAccount } from "../composables";

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
} = useAdminAccount();

const fullName = computed(() => {
  const { firstName, lastName } = personalInfo;
  if (firstName || lastName) {
    return `${firstName} ${lastName}`.trim();
  }
  return "Ярослав Кузик";
});

const isScrolling = ref(false);
const sectionIds = ["profile", "security", "notifications", "sessions"];

const handleTabChange = (tab: string) => {
  isScrolling.value = true;
  activeTab.value = tab;
  nextTick(() => {
    const element = document.getElementById(`section-${tab}`);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
    setTimeout(() => {
      isScrolling.value = false;
    }, 500);
  });
};

onMounted(() => {
  const observer = new IntersectionObserver(
    (entries) => {
      if (isScrolling.value) return;

      for (const entry of entries) {
        if (entry.isIntersecting) {
          const id = entry.target.id.replace("section-", "");
          if (sectionIds.includes(id)) {
            activeTab.value = id;
          }
        }
      }
    },
    {
      rootMargin: "-220px 0px -50% 0px",
      threshold: 0,
    }
  );

  sectionIds.forEach((id) => {
    const element = document.getElementById(`section-${id}`);
    if (element) {
      observer.observe(element);
    }
  });

  onUnmounted(() => {
    observer.disconnect();
  });
});
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

    > * {
      scroll-margin-top: 215px;
    }
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

    > * {
      scroll-margin-top: 215px;
    }
  }
}
</style>
