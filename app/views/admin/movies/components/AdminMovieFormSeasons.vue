<template>
  <AppCard :title="$t('ADMIN_MOVIE_FORM_SEASONS_TITLE')" :subtitle="$t('ADMIN_MOVIE_FORM_SEASONS_DESC')">
    <template #icon>🎬</template>
    <div class="seasons">
      <div
        v-for="season in seasons"
        :key="season.id"
        class="seasons__item"
        :class="{
          'seasons__item--current': season.isCurrent,
          'seasons__item--expanded': season.isExpanded,
        }"
      >
        <div class="seasons__header" @click="toggleSeason(season.id)">
          <div class="seasons__header-left">
            <span
              class="seasons__number"
              :class="{ 'seasons__number--current': season.isCurrent }"
            >{{ season.number }}</span>
            <div class="seasons__header-info">
              <strong>{{ $t('ADMIN_MOVIE_FORM_SEASON') }} {{ season.number }} — {{ season.title }}</strong>
              <span>
                {{ season.episodes.length }} {{ $t('ADMIN_MOVIE_FORM_EPISODES_COUNT') }}
                <template v-if="season.status === 'published'"> · {{ $t('ADMIN_MOVIE_FORM_SEASON_PUBLISHED_AT') }} {{ season.premiereDate }}</template>
                <template v-else> · {{ uploadedCount(season) }} {{ $t('ADMIN_MOVIE_FORM_EPISODES_UPLOADED') }}</template>
              </span>
            </div>
          </div>
          <div class="seasons__header-right">
            <AppBadge v-if="season.isCurrent" variant="warning" read-only>{{ $t('ADMIN_MOVIE_FORM_SEASON_CURRENT') }}</AppBadge>
            <AppBadge :variant="season.status === 'published' ? 'success' : 'basic'" read-only>
              {{ season.status === 'published' ? $t('ADMIN_MOVIE_FORM_SEASON_PUBLISHED') : $t('ADMIN_MOVIE_FORM_SEASON_DRAFT') }}
            </AppBadge>
            <ChevronDown :size="16" class="seasons__chevron" :class="{ 'seasons__chevron--open': season.isExpanded }" />
          </div>
        </div>

        <div v-if="season.isExpanded" class="seasons__body">
          <div class="seasons__fields">
            <AppInput :model-value="season.title" :label="$t('ADMIN_MOVIE_FORM_SEASON_NAME')" :readonly="readonly" />
            <AppInput :model-value="season.premiereDate" :label="$t('ADMIN_MOVIE_FORM_SEASON_PREMIERE')" :readonly="readonly" />
          </div>
          <AppTextarea :model-value="season.description" :label="$t('ADMIN_MOVIE_FORM_SEASON_DESCRIPTION')" :readonly="readonly" :rows="2" />

          <div class="seasons__episodes">
            <label class="seasons__label">{{ $t('ADMIN_MOVIE_FORM_EPISODES') }}</label>
            <div
              v-for="ep in season.episodes"
              :key="ep.id"
              class="seasons__episode"
              :class="{ 'seasons__episode--pending': ep.status === 'pending' }"
            >
              <span class="seasons__ep-number">{{ String(ep.number).padStart(2, '0') }}</span>
              <div class="seasons__ep-info">
                <strong v-if="ep.title">{{ ep.title }}</strong>
                <strong v-else class="seasons__ep-empty">—</strong>
                <span v-if="ep.status !== 'pending'">{{ ep.duration }} · {{ ep.size }}</span>
                <span v-else class="seasons__ep-empty">{{ $t('ADMIN_MOVIE_FORM_EPISODE_PENDING') }}</span>
              </div>
              <div class="seasons__ep-right">
                <AppBadge v-if="ep.status === 'uploaded'" variant="success" read-only>{{ $t('ADMIN_MOVIE_FORM_EPISODE_UPLOADED') }}</AppBadge>
                <AppBadge v-else-if="ep.status === 'processing'" variant="warning" read-only>{{ $t('ADMIN_MOVIE_FORM_EPISODE_PROCESSING') }}</AppBadge>
                <span v-else class="seasons__ep-pending-text">{{ $t('ADMIN_MOVIE_FORM_EPISODE_WAITING') }}</span>
                <template v-if="!readonly && ep.status !== 'pending'">
                  <button class="seasons__ep-btn"><SquarePen :size="14" /></button>
                  <button class="seasons__ep-btn seasons__ep-btn--danger"><Trash2 :size="14" /></button>
                </template>
              </div>
            </div>
          </div>

          <button v-if="!readonly" class="seasons__add-episode">
            <Plus :size="14" /> {{ $t('ADMIN_MOVIE_FORM_ADD_EPISODE') }}
          </button>
        </div>
      </div>

      <button v-if="!readonly" class="seasons__add-season">
        <Plus :size="14" /> {{ $t('ADMIN_MOVIE_FORM_ADD_SEASON') }}
      </button>
    </div>
  </AppCard>
</template>

<script setup lang="ts">
import { ChevronDown, Plus, SquarePen, Trash2 } from 'lucide-vue-next'
import type { ISeason } from '../domain'

const props = defineProps<{
  seasons: ISeason[]
  readonly: boolean
}>()

const emit = defineEmits<{
  'update:seasons': [value: ISeason[]]
}>()

const toggleSeason = (id: string) => {
  const updated = props.seasons.map((s) => s.id === id ? { ...s, isExpanded: !s.isExpanded } : s)
  emit('update:seasons', updated)
}

const { t } = useI18n()

const uploadedCount = (season: ISeason) => {
  return season.episodes.filter((e) => e.status === 'uploaded').length + ' ' + t('ADMIN_MOVIE_FORM_EPISODES_OF') + ' ' + season.episodes.length
}
</script>

<style lang="scss" scoped>
.seasons {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-md);

  &__item {
    border: 1px solid var(--color-border);
    border-radius: var(--radius-lg);
    overflow: hidden;
    transition: border-color 0.2s ease;

    &--current {

      border-color: var(--color-primary);

      };

    }

  &__header {
    align-items: center;
    cursor: pointer;
    display: flex;
    gap: var(--spacing-md);
    justify-content: space-between;
    padding: var(--spacing-md) var(--spacing-lg);
    transition: background-color 0.2s ease;

    &:hover {

      background: var(--color-background-hover);

      };

    }

  &__header-left {
    align-items: center;
    display: flex;
    gap: var(--spacing-md);
  }

  &__number {
    @include FluidFontBodySm;
    align-items: center;
    background: var(--color-divider);
    border-radius: var(--radius-full);
    color: var(--color-text-secondary);
    display: flex;
    flex-shrink: 0;
    font-weight: 700;
    height: 36px;
    justify-content: center;
    width: 36px;

    &--current {

      background: var(--color-primary);

      color: var(--color-white);

    }
  }

  &__header-info {
    display: flex;
    flex-direction: column;
    gap: var(--spacing-3xs);

    strong {
      @include FluidFontBodySm;

      color: var(--color-white);

    }

    span {
      @include FluidFontCaption;

      color: var(--color-text-tertiary);

    }
  }

  &__header-right {
    align-items: center;
    display: flex;
    gap: var(--spacing-sm);
  }

  &__chevron {
    color: var(--color-text-tertiary);
    transition: transform 0.2s ease;

    &--open {

      transform: rotate(180deg);

      };

    }

  &__body {
    border-top: 1px solid var(--color-border);
    display: flex;
    flex-direction: column;
    gap: var(--spacing-md);
    padding: var(--spacing-lg);
  }

  &__fields {
    display: flex;
    gap: var(--spacing-md);

    > * {
      flex: 1;
    }
  }

  &__label {
    @include FluidFontLabel;
    color: var(--color-text-secondary);
    text-transform: uppercase;
  }

  &__episodes {
    display: flex;
    flex-direction: column;
    gap: var(--spacing-xs);
  }

  &__episode {
    align-items: center;
    border-bottom: 1px solid var(--color-border);
    display: flex;
    gap: var(--spacing-md);
    padding: var(--spacing-sm) 0;

    &:last-child {
      border-bottom: none;
    }

    &--pending {

      opacity: 0.5;

      };

    }

  &__ep-number {
    @include FluidFontCaption;
    align-items: center;
    background: var(--color-divider);
    border-radius: var(--radius-sm);
    color: var(--color-text-secondary);
    display: flex;
    flex-shrink: 0;
    font-weight: 600;
    height: 28px;
    justify-content: center;
    width: 28px;
  }

  &__ep-info {
    display: flex;
    flex: 1;
    flex-direction: column;
    gap: var(--spacing-3xs);

    strong {
      @include FluidFontBodySm;

      color: var(--color-white);

    }

    span {
      @include FluidFontCaption;

      color: var(--color-text-tertiary);

    }
  }

  &__ep-empty {

    color: var(--color-text-tertiary) !important;

    font-weight: 400 !important;

  }

  &__ep-right {
    align-items: center;
    display: flex;
    gap: var(--spacing-xs);
  }

  &__ep-pending-text {
    @include FluidFontCaption;

    color: var(--color-text-tertiary);

  }

  &__ep-btn {
    align-items: center;
    background: none;
    border: none;
    border-radius: var(--radius-xs);
    color: var(--color-text-secondary);
    cursor: pointer;
    display: flex;
    height: 26px;
    justify-content: center;
    transition: all 0.2s ease;
    width: 26px;

    &:hover {

      background: var(--color-white-10);

      color: var(--color-white);

    }

    &--danger:hover {

      background: var(--color-danger-bg);

      color: var(--color-danger);

    }
  }

  &__add-episode,
  &__add-season {
    @include FluidFontCaption;
    align-items: center;
    background: transparent;
    border: 1px dashed var(--color-border);
    border-radius: var(--radius-md);
    color: var(--color-text-secondary);
    cursor: pointer;
    display: flex;
    font-weight: 500;
    gap: var(--spacing-xs);
    justify-content: center;
    padding: var(--spacing-sm);
    transition: all 0.2s ease;

    &:hover {

      border-color: var(--color-text-tertiary);

      color: var(--color-text-primary);

    }
  }
}
</style>
