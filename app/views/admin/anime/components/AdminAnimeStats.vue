<template>
  <div class="admin-anime-stats">
    <div class="admin-anime-stats__card">
      <div class="admin-anime-stats__icon admin-anime-stats__icon--red">
        <Film :size="20" />
      </div>
      <div class="admin-anime-stats__data">
        <span class="admin-anime-stats__number">{{ stats.total }}</span>
        <span class="admin-anime-stats__label">{{ $t('ADMIN_ANIME_STATS_TOTAL') }}</span>
      </div>
    </div>
    <div class="admin-anime-stats__card">
      <div class="admin-anime-stats__icon admin-anime-stats__icon--green">
        <CheckCircle :size="20" />
      </div>
      <div class="admin-anime-stats__data">
        <span class="admin-anime-stats__number">{{ stats.published }}</span>
        <span class="admin-anime-stats__label">{{ $t('ADMIN_ANIME_STATS_PUBLISHED') }}</span>
      </div>
    </div>
    <div class="admin-anime-stats__card">
      <div class="admin-anime-stats__icon admin-anime-stats__icon--yellow">
        <FileEdit :size="20" />
      </div>
      <div class="admin-anime-stats__data">
        <span class="admin-anime-stats__number">{{ stats.drafts }}</span>
        <span class="admin-anime-stats__label">{{ $t('ADMIN_ANIME_STATS_DRAFTS') }}</span>
      </div>
    </div>
    <div class="admin-anime-stats__card">
      <div class="admin-anime-stats__icon admin-anime-stats__icon--purple">
        <Clock :size="20" />
      </div>
      <div class="admin-anime-stats__data">
        <span class="admin-anime-stats__number">{{ stats.moderation }}</span>
        <span class="admin-anime-stats__label">{{ $t('ADMIN_ANIME_STATS_MODERATION') }}</span>
      </div>
    </div>
    <div class="admin-anime-stats__card">
      <div class="admin-anime-stats__icon admin-anime-stats__icon--blue">
        <Eye :size="20" />
      </div>
      <div class="admin-anime-stats__data">
        <span class="admin-anime-stats__number">{{ stats.views }}</span>
        <span class="admin-anime-stats__label">{{ $t('ADMIN_ANIME_STATS_VIEWS') }}</span>
      </div>
    </div>
    <div class="admin-anime-stats__card">
      <div class="admin-anime-stats__icon admin-anime-stats__icon--gold">
        <Star :size="20" />
      </div>
      <div class="admin-anime-stats__data">
        <span class="admin-anime-stats__number">{{ stats.avgRating }}</span>
        <span class="admin-anime-stats__label">{{ $t('ADMIN_ANIME_STATS_RATING') }}</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Film, CheckCircle, FileEdit, Clock, Eye, Star } from 'lucide-vue-next'
import type { IAnimeStats } from '../domain'

defineProps<{ stats: IAnimeStats }>()
</script>

<style lang="scss" scoped>
.admin-anime-stats {
  display: grid;
  gap: var(--spacing-md);
  grid-template-columns: repeat(6, minmax(0, 1fr));

  @media (width <= 1400px) {
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

    &--yellow {
      background: var(--color-warning-bg);
      color: var(--color-warning);
    }

    &--purple {
      background: var(--color-purple-bg);
      color: var(--color-purple);
    }

    &--blue {
      background: var(--color-info-bg);
      color: var(--color-info);
    }

    &--gold {
      background: var(--color-warning-bg);
      color: var(--color-warning);
      };
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
