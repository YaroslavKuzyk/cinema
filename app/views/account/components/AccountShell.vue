<template>
  <div class="account-shell">
    <aside class="account-shell__sidebar">
      <div class="account-shell__card">
        <div class="account-shell__avatar-wrap" :style="{ '--avatar-bg': user.avatarColor }">
          <AppAvatar size="large" :initials="user.initials" />
        </div>
        <h3 class="account-shell__name">{{ fullName }}</h3>
        <span class="account-shell__email">{{ user.email }}</span>
      </div>

      <nav class="account-shell__nav">
        <NuxtLink
          v-for="item in items"
          :key="item.key"
          :to="item.to"
          class="account-shell__link"
          :class="{ 'account-shell__link--active': item.key === activeKey }"
        >
          <component :is="item.icon" :size="16" />
          {{ item.label }}
        </NuxtLink>

        <button
          type="button"
          class="account-shell__link account-shell__link--logout"
          @click="onLogout"
        >
          <component :is="logoutIcon" :size="16" />
          {{ logoutLabel }}
        </button>
      </nav>
    </aside>

    <main class="account-shell__content">
      <header v-if="title" class="account-shell__head">
        <h1 class="account-shell__title">{{ title }}</h1>
        <p v-if="description" class="account-shell__desc">{{ description }}</p>
      </header>

      <div class="account-shell__sections">
        <slot />
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
import { useAccountNav, useAccountUser } from '../composables'
import type { TAccountNavKey } from '../domain'

defineProps<{
  activeKey: TAccountNavKey
  title?: string
  description?: string
}>()

const { user, fullName } = useAccountUser()
const { items, logoutLabel, logoutIcon } = useAccountNav()

function onLogout() {
  navigateTo('/auth/login')
}
</script>

<style lang="scss" scoped>
.account-shell {
  display: grid;
  gap: var(--spacing-xl);
  grid-template-columns: 280px 1fr;
  padding: calc(var(--spacing-3xl) + 60px) var(--spacing-3xl) var(--spacing-3xl);

  &__sidebar {
    align-self: flex-start;
    display: flex;
    flex-direction: column;
    gap: var(--spacing-base);
    position: sticky;
    top: calc(var(--spacing-3xl) + 60px);
  }

  &__card {
    align-items: center;
    background: var(--color-surface);
    border: 1px solid var(--color-border);
    border-radius: var(--radius-lg);
    display: flex;
    flex-direction: column;
    gap: var(--spacing-2xs);
    padding: var(--spacing-lg);
    text-align: center;
  }

  &__avatar-wrap {
    margin-bottom: var(--spacing-xs);

    :deep(.app-avatar) {
      background: var(--avatar-bg, var(--color-primary));
      border-radius: var(--radius-full);
    }
  }

  &__name {
    @include FluidFontBodyLg;
    color: var(--color-white);
    font-weight: 700;
    margin: 0;
  }

  &__email {
    @include FluidFontCaption;
    color: var(--color-text-tertiary);
  }

  &__nav {
    background: var(--color-surface);
    border: 1px solid var(--color-border);
    border-radius: var(--radius-lg);
    display: flex;
    flex-direction: column;
    padding: var(--spacing-2xs);
  }

  &__link {
    @include FluidFontBodySm;
    align-items: center;
    background: transparent;
    border: none;
    border-radius: var(--radius-md);
    color: var(--color-text-primary);
    cursor: pointer;
    display: flex;
    font-weight: 500;
    gap: var(--spacing-xs);
    padding: var(--spacing-xs) var(--spacing-base);
    text-align: left;
    text-decoration: none;
    transition: all 0.2s ease;
    width: 100%;

    &:hover {
      background: var(--color-background-hover);
      color: var(--color-white);
    }

    &--active {
      background: var(--color-primary-bg, rgba(229, 9, 20, 0.12));
      color: var(--color-primary);
    }

    &--logout {
      color: var(--color-danger);

      &:hover {
        background: rgba(var(--color-danger-rgb, 239, 68, 68), 0.1);
        color: var(--color-danger);
      }
    }
  }

  &__content {
    display: flex;
    flex-direction: column;
    gap: var(--spacing-lg);
    min-width: 0;
  }

  &__head {
    display: flex;
    flex-direction: column;
    gap: var(--spacing-3xs);
  }

  &__title {
    @include FluidFontH1;
    color: var(--color-white);
    margin: 0;
  }

  &__desc {
    @include FluidFontBodyMd;
    color: var(--color-text-secondary);
    margin: 0;
  }

  &__sections {
    display: flex;
    flex-direction: column;
    gap: var(--spacing-base);
  }
}
</style>
