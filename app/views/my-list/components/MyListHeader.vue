<template>
  <header class="my-list-header">
    <div class="my-list-header__text">
      <h1 class="my-list-header__title">{{ $t('MY_LIST_PAGE_TITLE') }}</h1>
      <p class="my-list-header__subtitle">{{ $t('MY_LIST_PAGE_SUBTITLE') }}</p>
    </div>

    <div class="my-list-header__stats">
      <div class="my-list-header__stat">
        <span class="my-list-header__stat-value">{{ stats.movies }}</span>
        <span class="my-list-header__stat-label">{{ $t('MY_LIST_FILTER_MOVIES') }}</span>
      </div>
      <div class="my-list-header__stat">
        <span class="my-list-header__stat-value">{{ stats.series }}</span>
        <span class="my-list-header__stat-label">{{ $t('MY_LIST_FILTER_SERIES') }}</span>
      </div>
      <div class="my-list-header__stat">
        <span class="my-list-header__stat-value">{{ stats.anime }}</span>
        <span class="my-list-header__stat-label">{{ $t('MY_LIST_FILTER_ANIME') }}</span>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import type { IMyListStats } from '../domain'

interface IProps {
  stats: IMyListStats
}

defineProps<IProps>()
</script>

<style lang="scss" scoped>
.my-list-header {
  align-items: flex-end;
  display: flex;
  gap: var(--spacing-xl);
  justify-content: space-between;

  &__text {
    display: flex;
    flex-direction: column;
    gap: var(--spacing-2xs);
  }

  &__title {
    @include FluidFontH1;
    color: var(--color-white);
    margin: 0;
  }

  &__subtitle {
    @include FluidFontBodyMd;
    color: var(--color-text-secondary);
    margin: 0;
  }

  &__stats {
    display: flex;
    gap: var(--spacing-xl);
  }

  &__stat {
    align-items: center;
    display: flex;
    flex-direction: column;
    gap: 2px;
  }

  &__stat-value {
    @include FluidFontH2;
    color: var(--color-white);
  }

  &__stat-label {
    @include FluidFontCaption;
    color: var(--color-text-secondary);
  }
}
</style>
