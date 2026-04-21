<template>
  <footer class="public-footer">
    <NuxtLink to="/" class="public-footer__logo" aria-label="CINEMA">
      <LogoIcon />
    </NuxtLink>

    <nav class="public-footer__nav">
      <NuxtLink to="/" class="public-footer__link">{{ $t('HOME_NAV_HOME') }}</NuxtLink>
      <NuxtLink to="/movies" class="public-footer__link">{{ $t('HOME_NAV_MOVIES') }}</NuxtLink>
      <NuxtLink to="/series" class="public-footer__link">{{ $t('HOME_NAV_SERIES') }}</NuxtLink>
      <NuxtLink to="/plans" class="public-footer__link">{{ $t('HOME_FOOTER_SUBSCRIPTION') }}</NuxtLink>
      <NuxtLink to="/account" class="public-footer__link">{{ $t('HOME_FOOTER_SETTINGS') }}</NuxtLink>
    </nav>

    <span class="public-footer__copy">© {{ year }} CINEMA</span>
  </footer>
</template>

<script setup lang="ts">
import LogoIcon from '~/icons/LogoIcon.vue'

const year = new Date().getFullYear()
</script>

<style lang="scss" scoped>
.public-footer {
  align-items: center;
  border-top: 1px solid var(--color-border);
  display: grid;
  gap: var(--spacing-base);
  grid-template-columns: auto 1fr auto;
  padding: var(--spacing-xl) var(--spacing-3xl);

  &__logo {
    align-items: center;
    display: flex;

    :deep(svg) {
      height: 26px;
      width: auto;
    }
  }

  &__nav {
    display: flex;
    gap: var(--spacing-lg);
    justify-content: center;
  }

  &__link {
    @include FluidFontBodySm;
    color: var(--color-text-secondary);
    text-decoration: none;
    transition: color 0.2s ease;

    &:hover {
      color: var(--color-white);
    }
  }

  &__copy {
    @include FluidFontCaption;
    color: var(--color-text-tertiary);
    justify-self: end;
  }
}
</style>
