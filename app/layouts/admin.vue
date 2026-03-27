<template>
  <div class="admin-layout">
    <div class="admin-layout__sidebar">
      <AdminSidebar :navigation-groups="navigationGroups" :user-info="userInfo" @logout="handleLogout" />
    </div>
    <div class="admin-layout__content">
      <slot />
    </div>
  </div>
</template>

<script setup lang="ts">
import AdminSidebar from '~/components/Admin/Sidebar/index.vue'
import { useAdminSidebar } from '~/views/admin/sidebar/composables'

const { navigationGroups, userInfo } = useAdminSidebar()

const handleLogout = () => {
  // TODO: Implement logout logic (clear auth state, redirect)
  navigateTo('/auth/login')
}
</script>

<style lang="scss" scoped>
.admin-layout {
  display: flex;
  min-height: 100vh;

  &__sidebar {
    background-color: var(--color-sidebar);
    border-right: 1px solid var(--color-border);
    height: 100vh;
    position: sticky;
    top: 0;
    width: var(--container-xs);
  }

  &__content {
    flex: 1;
    padding: var(--spacing-xl);
  }
}
</style>
