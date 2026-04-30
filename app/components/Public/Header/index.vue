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
        <form
          class="public-header__search"
          :class="{ 'public-header__search--expanded': isFocused || query.length > 0 }"
          role="search"
          @submit.prevent="onSubmit"
        >
          <Search :size="14" class="public-header__search-icon" />
          <input
            ref="inputEl"
            v-model="query"
            type="search"
            class="public-header__search-field"
            :placeholder="$t('HOME_HEADER_SEARCH')"
            :aria-label="$t('HOME_HEADER_SEARCH')"
            @focus="isFocused = true"
            @blur="isFocused = false"
          >
        </form>

        <NuxtLink to="/account" class="public-header__avatar" :aria-label="$t('HOME_HEADER_PROFILE')">
          <AppAvatar size="small" initials="ЯК" />
        </NuxtLink>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import { Search } from 'lucide-vue-next'
import LogoIcon from '~/icons/LogoIcon.vue'

const route = useRoute()
const router = useRouter()
const localePath = useLocalePath()
const { items } = useMainNavigation()

const activeKey = computed(() => {
  const segments = route.path.split('/').filter(Boolean)
  const withoutLocale = '/' + segments.slice(1).join('/')
  return items.value.find(i => i.to === withoutLocale)?.key ?? 'home'
})

const inputEl = ref<HTMLInputElement | null>(null)
const isFocused = ref(false)
const query = ref<string>(route.path.endsWith('/search') ? String(route.query.q ?? '') : '')

function onSubmit() {
  const q = query.value.trim()
  router.push({ path: localePath('/search'), query: q ? { q } : {} })
  query.value = ''
  inputEl.value?.blur()
}
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
    display: grid;
    gap: var(--spacing-xl);
    grid-template-columns: 1fr auto 1fr;
    width: 100%;
  }

  &__logo {
    align-items: center;
    display: flex;
    justify-self: start;

    :deep(svg) {
      height: 34px;
      width: auto;
    }
  }

  &__nav {
    display: flex;
    gap: var(--spacing-lg);
    justify-content: center;
    justify-self: center;
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
    justify-self: end;
  }

  &__search {
    align-items: center;
    backdrop-filter: blur(6px);
    background: rgba(var(--color-white-rgb), 0.08);
    border: 1px solid rgba(var(--color-white-rgb), 0.12);
    border-radius: var(--radius-sm);
    display: inline-flex;
    gap: var(--spacing-2xs);
    height: fluid(40px, 48px);
    padding: 0 var(--spacing-sm);
    transition:
      width 0.3s ease,
      background 0.2s ease,
      border-color 0.2s ease;
    width: 180px;

    &:hover {
      background: rgba(var(--color-white-rgb), 0.14);
      border-color: var(--color-white-20);
    }

    &--expanded {
      background: rgba(var(--color-white-rgb), 0.14);
      border-color: var(--color-primary);
      width: 320px;
    }
  }

  &__search-icon {
    color: var(--color-text-secondary);
    flex-shrink: 0;
  }

  &__search-field {
    @include FluidFontBodySm;
    background: transparent;
    border: none;
    color: var(--color-white);
    flex: 1;
    height: 100%;
    min-width: 0;
    outline: none;
    padding: 0;

    &::placeholder {
      color: var(--color-text-secondary);
    }

    &::-webkit-search-cancel-button {
      display: none;
    }
  }

  &__avatar {
    align-items: center;
    display: inline-flex;
    text-decoration: none;
    transition: opacity 0.2s ease;

    &:hover {
      opacity: 0.85;
    }
  }
}
</style>
