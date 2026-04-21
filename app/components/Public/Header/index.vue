<template>
  <header class="public-header">
    <div class="public-header__inner">
      <NuxtLink to="/" class="public-header__logo" aria-label="CINEMA">
        <LogoIcon />
      </NuxtLink>

      <nav class="public-header__nav">
        <NuxtLink
          v-for="item in items"
          :key="item.key"
          :to="item.to"
          class="public-header__link"
          :class="{ 'public-header__link--active': item.key === activeKey }"
        >
          {{ item.label }}
        </NuxtLink>
      </nav>

      <div class="public-header__actions">
        <button type="button" class="public-header__search" :aria-label="$t('HOME_HEADER_SEARCH')">
          <Search :size="16" />
          <span>{{ $t('HOME_HEADER_SEARCH') }}</span>
        </button>

        <button type="button" class="public-header__avatar" :aria-label="$t('HOME_HEADER_PROFILE')">
          ЯК
        </button>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import { Search } from 'lucide-vue-next'
import LogoIcon from '~/icons/LogoIcon.vue'

const route = useRoute()
const { items } = useMainNavigation()

const activeKey = computed(() => {
  const segments = route.path.split('/').filter(Boolean)
  const withoutLocale = '/' + segments.slice(1).join('/')
  return items.value.find(i => i.to === withoutLocale)?.key ?? 'home'
})
</script>

<style lang="scss" scoped>
.public-header {
  background: linear-gradient(180deg, rgba(10, 10, 10, 0.75) 0%, rgba(10, 10, 10, 0) 100%);
  left: 0;
  padding: var(--spacing-base) var(--spacing-3xl);
  position: fixed;
  right: 0;
  top: 0;
  z-index: 40;

  &__inner {
    align-items: center;
    display: flex;
    gap: var(--spacing-xl);
    width: 100%;
  }

  &__logo {
    align-items: center;
    display: flex;

    :deep(svg) {
      height: 34px;
      width: auto;
    }
  }

  &__nav {
    display: flex;
    flex: 1;
    gap: var(--spacing-lg);
    justify-content: center;
  }

  &__link {
    @include FluidFontBodySm;
    color: var(--color-text-primary);
    padding: var(--spacing-2xs) 0;
    position: relative;
    text-decoration: none;
    transition: color 0.2s ease;

    &:hover {
      color: var(--color-white);
    }

    &--active {
      color: var(--color-white);

      &::after {
        background: var(--color-primary);
        border-radius: var(--radius-full);
        bottom: -6px;
        content: '';
        height: 2px;
        left: 0;
        position: absolute;
        right: 0;
      }
    }
  }

  &__actions {
    align-items: center;
    display: flex;
    gap: var(--spacing-sm);
  }

  &__search {
    @include FluidFontBodySm;
    align-items: center;
    backdrop-filter: blur(6px);
    background: rgba(var(--color-white-rgb), 0.08);
    border: 1px solid rgba(var(--color-white-rgb), 0.12);
    border-radius: var(--radius-full);
    color: var(--color-text-secondary);
    cursor: pointer;
    display: inline-flex;
    gap: var(--spacing-xs);
    padding: var(--spacing-2xs) var(--spacing-base);
    transition: all 0.2s ease;

    &:hover {
      background: rgba(var(--color-white-rgb), 0.14);
      border-color: var(--color-white-20);
      color: var(--color-white);
    }
  }

  &__avatar {
    @include FluidFontLabel;
    align-items: center;
    background: var(--color-primary);
    border: none;
    border-radius: var(--radius-sm);
    color: var(--color-white);
    cursor: pointer;
    display: inline-flex;
    height: 34px;
    justify-content: center;
    transition: background 0.2s ease;
    width: 34px;

    &:hover {
      background: var(--color-primary-hover);
    }
  }
}
</style>
