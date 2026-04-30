<template>
  <aside class="episodes-panel">
    <header class="episodes-panel__head">
      <h2 class="episodes-panel__title">{{ $t("PLAYER_EPISODES") }}</h2>
      <button
        type="button"
        class="episodes-panel__close"
        :aria-label="$t('PLAYER_CLOSE')"
        @click="$emit('close')"
      >
        <X :size="28" />
      </button>
    </header>

    <div class="episodes-panel__tabs">
      <button
        v-for="season in seasons"
        :key="season.key"
        type="button"
        class="episodes-panel__tab"
        :class="{ 'episodes-panel__tab--active': activeSeasonKey === season.key }"
        @click="activeSeasonKey = season.key"
      >
        {{ season.title }}
      </button>
    </div>

    <div class="episodes-panel__list">
      <article
        v-for="ep in activeEpisodes"
        :key="ep.id"
        class="episodes-panel__item"
        :class="{ 'episodes-panel__item--active': ep.id === currentEpisodeId }"
        @click="$emit('play', ep.id)"
      >
        <img :src="ep.image" :alt="ep.title" class="episodes-panel__thumb" >
        <div class="episodes-panel__body">
          <span class="episodes-panel__ep-label">{{ $t("PLAYER_EP_NUMBER", { n: ep.number }) }}</span>
          <span class="episodes-panel__ep-title">{{ ep.title }}</span>
          <span class="episodes-panel__ep-meta">
            {{ ep.durationLabel }}<template v-if="ep.note"> · {{ ep.note }}</template>
          </span>
          <span v-if="ep.id === currentEpisodeId" class="episodes-panel__now">
            {{ $t("PLAYER_NOW_WATCHING") }}
          </span>
        </div>

        <span class="episodes-panel__play">
          <Pause v-if="ep.id === currentEpisodeId && isPlaying" :size="22" fill="currentColor" />
          <Play v-else :size="22" fill="currentColor" />
        </span>
      </article>
    </div>
  </aside>
</template>

<script setup lang="ts">
import { Pause, Play, X } from 'lucide-vue-next'
import type { IPlayerSeason } from '../domain'

const props = defineProps<{
  seasons: IPlayerSeason[]
  currentEpisodeId: string
  isPlaying: boolean
}>()

defineEmits<{ close: [], play: [id: string] }>()

const activeSeasonKey = ref<string>(
  props.seasons.find(s => s.episodes.some(e => e.id === props.currentEpisodeId))?.key
    ?? props.seasons[0]?.key
    ?? '',
)

const activeEpisodes = computed(() =>
  props.seasons.find(s => s.key === activeSeasonKey.value)?.episodes ?? [],
)
</script>

<style lang="scss" scoped>
.episodes-panel {
  backdrop-filter: blur(14px);
  background: rgba(10, 10, 10, 0.92);
  border-left: 1px solid rgba(255, 255, 255, 0.08);
  display: flex;
  flex-direction: column;
  gap: var(--spacing-lg);
  height: 100%;
  padding: var(--spacing-xl);
  width: 100%;

  &__head {
    align-items: center;
    display: flex;
    justify-content: space-between;
  }

  &__title {
    @include FluidFontH2;
    color: var(--color-white);
    margin: 0;
  }

  &__close {
    align-items: center;
    background: rgba(255, 255, 255, 0.08);
    border: none;
    border-radius: var(--radius-full);
    color: var(--color-white);
    cursor: pointer;
    display: flex;
    height: 52px;
    justify-content: center;
    outline: 3px solid transparent;
    transition: background 0.2s ease, outline 0.25s ease;
    width: 52px;

    &:hover {
      background: rgba(255, 255, 255, 0.16);
      outline: 3px solid var(--color-white);
    }
  }

  &__tabs {
    display: flex;
    flex-wrap: wrap;
    gap: var(--spacing-xs);
  }

  &__tab {
    @include FluidFontBodyMd;
    background: rgba(255, 255, 255, 0.06);
    border: none;
    border-radius: var(--radius-full);
    color: var(--color-white);
    cursor: pointer;
    font-weight: 600;
    min-height: 52px;
    outline: 3px solid transparent;
    padding: 0 var(--spacing-lg);
    transition: background 0.2s ease, color 0.2s ease, outline 0.25s ease;

    &:hover {
      outline: 3px solid var(--color-white);
    }

    &--active {
      background: var(--color-primary);
      color: var(--color-white);
    }
  }

  &__list {
    display: flex;
    flex: 1;
    flex-direction: column;
    gap: var(--spacing-sm);
    overflow-y: auto;
  }

  &__item {
    align-items: center;
    background: rgba(255, 255, 255, 0.04);
    border: none;
    border-radius: var(--radius-md);
    cursor: pointer;
    display: grid;
    gap: var(--spacing-md);
    grid-template-columns: 140px 1fr auto;
    outline: 3px solid transparent;
    padding: var(--spacing-xs);
    transition: background 0.2s ease, outline 0.25s ease;

    &:hover {
      background: rgba(255, 255, 255, 0.08);
      outline: 3px solid var(--color-white);
    }

    &--active {
      background: rgba(var(--color-primary-rgb), 0.14);
      outline: 3px solid var(--color-primary);

      &:hover {
        outline: 3px solid var(--color-primary);
      }
    }
  }

  &__thumb {
    aspect-ratio: 16 / 9;
    border-radius: var(--radius-sm);
    height: auto;
    object-fit: cover;
    width: 100%;
  }

  &__body {
    display: flex;
    flex-direction: column;
    gap: var(--spacing-3xs);
    min-width: 0;
  }

  &__ep-label {
    @include FluidFontBodySm;
    color: var(--color-text-tertiary);
  }

  &__ep-title {
    @include FluidFontBodyLg;
    color: var(--color-white);
    font-weight: 600;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  &__ep-meta {
    @include FluidFontBodySm;
    color: var(--color-text-secondary);
  }

  &__now {
    @include FluidFontLabel;
    background: var(--color-primary-bg);
    border-radius: var(--radius-xs);
    color: var(--color-primary);
    font-weight: 600;
    margin-top: var(--spacing-3xs);
    padding: var(--spacing-3xs) var(--spacing-xs);
    width: fit-content;
  }

  &__play {
    align-items: center;
    background: var(--color-primary);
    border-radius: var(--radius-full);
    color: var(--color-white);
    display: flex;
    flex-shrink: 0;
    height: 52px;
    justify-content: center;
    margin-right: var(--spacing-xs);
    width: 52px;
  }
}
</style>
