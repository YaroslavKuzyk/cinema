<template>
  <div class="admin-genres-stats">
    <div class="admin-genres-stats__card">
      <div class="admin-genres-stats__icon admin-genres-stats__icon--red">
        <Layers :size="20" />
      </div>
      <div class="admin-genres-stats__data">
        <span class="admin-genres-stats__number">{{ stats.total }}</span>
        <span class="admin-genres-stats__label">{{ $t('ADMIN_GENRES_STATS_TOTAL') }}</span>
      </div>
    </div>

    <div class="admin-genres-stats__card">
      <div class="admin-genres-stats__icon admin-genres-stats__icon--green">
        <CheckCircle :size="20" />
      </div>
      <div class="admin-genres-stats__data">
        <span class="admin-genres-stats__number">{{ stats.active }}</span>
        <span class="admin-genres-stats__label">{{ $t('ADMIN_GENRES_STATS_ACTIVE') }}</span>
      </div>
    </div>

    <div class="admin-genres-stats__card">
      <div class="admin-genres-stats__icon admin-genres-stats__icon--purple">
        <EyeOff :size="20" />
      </div>
      <div class="admin-genres-stats__data">
        <span class="admin-genres-stats__number">{{ stats.hidden }}</span>
        <span class="admin-genres-stats__label">{{ $t('ADMIN_GENRES_STATS_HIDDEN') }}</span>
      </div>
    </div>

    <div class="admin-genres-stats__card">
      <div class="admin-genres-stats__icon admin-genres-stats__icon--yellow">
        <Star :size="20" />
      </div>
      <div class="admin-genres-stats__data">
        <span class="admin-genres-stats__number">{{ stats.popular }}</span>
        <span class="admin-genres-stats__label">{{ $t('ADMIN_GENRES_STATS_POPULAR') }}</span>
      </div>
    </div>

    <div class="admin-genres-stats__card">
      <div class="admin-genres-stats__icon admin-genres-stats__icon--blue">
        <Film :size="20" />
      </div>
      <div class="admin-genres-stats__data">
        <span class="admin-genres-stats__number">{{ formatNumber(stats.totalContent) }}</span>
        <span class="admin-genres-stats__label">{{ $t('ADMIN_GENRES_STATS_CONTENT') }}</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Layers, CheckCircle, EyeOff, Star, Film } from 'lucide-vue-next'
import type { IGenreStats } from '../domain'

defineProps<{
  stats: IGenreStats
}>()

const formatNumber = (num: number) => num.toLocaleString('uk-UA').replace(',', ' ')
</script>

<style lang="scss" scoped>
.admin-genres-stats {
  display: grid;
  gap: var(--spacing-md);
  grid-template-columns: repeat(5, minmax(0, 1fr));

  @media (width <= 1200px) {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }

  &__card {
    align-items: center;
    background: var(--color-surface);
    border: 1px solid var(--color-border);
    border-radius: var(--radius-xl);
    display: flex;
    gap: var(--spacing-md);
    padding: var(--spacing-lg);
  }

  &__icon {
    align-items: center;
    border-radius: var(--radius-full);
    display: flex;
    flex-shrink: 0;
    height: fluid(40px, 48px);
    justify-content: center;
    width: fluid(40px, 48px);

    &--red {

      background: var(--color-primary-bg);

      color: var(--color-primary);

    }

    &--green {

      background: var(--color-success-bg);

      color: var(--color-success);

    }

    &--purple {

      background: var(--color-purple-bg);

      color: var(--color-purple);

    }

    &--yellow {

      background: var(--color-warning-bg);

      color: var(--color-warning);

    }

    &--blue {

      background: var(--color-info-bg);

      color: var(--color-info);

    }
  }

  &__data {
    display: flex;
    flex-direction: column;
    gap: var(--spacing-3xs);
  }

  &__number {
    @include FluidFontH3;
    color: var(--color-white);
    font-weight: 700;
  }

  &__label {
    @include FluidFontCaption;

    color: var(--color-text-secondary);

  }
}
</style>
