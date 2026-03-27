<template>
  <aside class="admin-sidebar">
    <div class="admin-sidebar__header">
      <NuxtLink to="/admin" class="admin-sidebar__logo">
        CINE<span>MA</span>
      </NuxtLink>
    </div>

    <nav class="admin-sidebar__nav">
      <div
        v-for="group in navigationGroups"
        :key="group.title"
        class="admin-sidebar__group"
      >
        <span class="admin-sidebar__group-title">{{ group.title }}</span>
        <ul class="admin-sidebar__list">
          <li v-for="item in group.items" :key="item.to">
            <NuxtLink
              :to="item.to"
              class="admin-sidebar__link"
              :class="{ 'admin-sidebar__link--active': isActive(item.to) }"
            >
              <component :is="item.icon" :size="20" />
              <span>{{ item.label }}</span>
            </NuxtLink>
          </li>
        </ul>
      </div>
    </nav>

    <div class="admin-sidebar__footer">
      <AppPopup position="top-start" :close-on-content-click="true" full-width>
        <template #trigger>
          <div class="admin-sidebar__user">
            <AppAvatar size="small" :initials="userInfo.initials" />
            <div class="admin-sidebar__user-info">
              <p>{{ userInfo.name }}</p>
              <span>{{ userInfo.role }}</span>
            </div>
            <ChevronDown :size="18" class="admin-sidebar__user-chevron" />
          </div>
        </template>

        <div class="admin-sidebar__dropdown">
          <div class="admin-sidebar__dropdown-header">
            <p>{{ userInfo.name }}</p>
            <span>{{ userInfo.role }}</span>
          </div>
          <div class="admin-sidebar__dropdown-divider" />
          <NuxtLink to="/admin/account" class="admin-sidebar__dropdown-item">
            <User :size="16" />
            <span>{{ $t("ADMIN_SIDEBAR_PROFILE") }}</span>
          </NuxtLink>
          <div class="admin-sidebar__dropdown-divider" />
          <button
            class="admin-sidebar__dropdown-item admin-sidebar__dropdown-item--danger"
            @click="$emit('logout')"
          >
            <LogOut :size="16" />
            <span>{{ $t("ADMIN_SIDEBAR_LOGOUT") }}</span>
          </button>
        </div>
      </AppPopup>
    </div>
  </aside>
</template>

<script setup lang="ts">
import type { Component } from "vue";
import { User, LogOut, ChevronDown } from "lucide-vue-next";

interface NavigationItem {
  to: string;
  label: string;
  icon: Component;
}

interface NavigationGroup {
  title: string;
  items: NavigationItem[];
}

interface UserInfo {
  name: string;
  role: string;
  initials: string;
}

interface Props {
  navigationGroups: NavigationGroup[];
  userInfo: UserInfo;
}

defineProps<Props>();

defineEmits<{
  logout: [];
}>();

const route = useRoute();
const localePath = useLocalePath();

const isActive = (path: string) => {
  const localized = localePath(path);
  return route.path === localized || route.path.startsWith(localized + "/");
};
</script>

<style lang="scss" scoped>
.admin-sidebar {
  display: flex;
  flex-direction: column;
  height: 100%;
  padding: var(--spacing-lg) 0 0;

  &__header {
    margin-bottom: var(--spacing-xl);
    padding: 0 var(--spacing-lg);
  }

  &__logo {
    @include FluidFontH2;
    color: var(--color-white);
    font-weight: 900;
    text-decoration: none;

    span {
      color: var(--color-primary);
    }
  }

  &__nav {
    display: flex;
    flex: 1;
    flex-direction: column;
    gap: var(--spacing-lg);
    overflow-y: auto;
  }

  &__group {
    display: flex;
    flex-direction: column;
    gap: var(--spacing-sm);
  }

  &__group-title {
    @include FluidFontCaption;
    color: var(--color-text-tertiary);
    font-weight: 600;
    letter-spacing: 0.05em;
    padding: 0 var(--spacing-lg);
    text-transform: uppercase;
  }

  &__list {
    display: flex;
    flex-direction: column;
    list-style: none;
    margin: 0;
    padding: 0;
  }

  &__link {
    align-items: center;
    border-left: 3px solid transparent;
    color: var(--color-text-secondary);
    display: flex;
    gap: var(--spacing-sm);
    padding: var(--spacing-sm) var(--spacing-lg) var(--spacing-sm)
      calc(var(--spacing-lg) - 3px);
    text-decoration: none;
    transition: all 0.2s ease;

    &:hover {
      background-color: var(--color-active-bg);
      border-left-color: var(--color-primary);
      color: var(--color-text-primary);
    }

    &--active {
      background-color: var(--color-active-bg);
      border-left-color: var(--color-primary);
      color: var(--color-text-primary);
    }
  }

  &__footer {
    border-top: 1px solid var(--color-border);
    margin-top: auto;
    padding: var(--spacing-lg) var(--spacing-lg);
    position: relative;
  }

  &__user {
    align-items: center;
    cursor: pointer;
    display: flex;
    gap: var(--spacing-sm);
    text-decoration: none;
    width: 100%;
  }

  &__user-chevron {
    color: var(--color-text-tertiary);
    margin-left: auto;
  }

  &__user-info {
    display: flex;
    flex-direction: column;
    gap: var(--spacing-3xs);

    p {
      color: var(--color-text-primary);
      font-weight: 500;
    }

    span {
      @include FluidFontBodySm;
      color: var(--color-text-tertiary);
    }
  }

  &__dropdown {
    display: flex;
    flex-direction: column;
    min-width: 200px;
    padding: var(--spacing-xs) 0;
  }

  &__dropdown-header {
    display: flex;
    flex-direction: column;
    padding: var(--spacing-xs) var(--spacing-md);

    p {
      @include FluidFontBodySm;
      color: var(--color-text-primary);
      font-weight: 500;
    }

    span {
      @include FluidFontCaption;
      color: var(--color-text-tertiary);
    }
  }

  &__dropdown-divider {
    background-color: var(--color-border);
    height: 1px;
  }

  &__dropdown-item {
    @include FluidFontBodySm;
    align-items: center;
    background: none;
    border: none;
    border-left: 3px solid transparent;
    color: var(--color-text-secondary);
    cursor: pointer;
    display: flex;
    gap: var(--spacing-xs);
    padding: var(--spacing-xs) var(--spacing-md) var(--spacing-xs)
      calc(var(--spacing-md) - 3px);
    text-decoration: none;
    transition: all 0.2s ease;
    width: 100%;

    &:hover {
      background-color: var(--color-active-bg);
      border-left-color: var(--color-primary);
      color: var(--color-text-primary);
    }

    &--danger {
      color: var(--color-primary);

      &:hover {
        background-color: var(--color-active-bg);
        border-left-color: var(--color-primary);
        color: var(--color-primary);
      }
    }
  }
}
</style>
