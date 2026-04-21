<template>
  <AppModal v-model="isOpen" size="full" flush class="media-modal">
    <div v-if="current" class="media-modal__content">
      <img
        :src="current.image"
        :alt="current.title"
        class="media-modal__bg-img"
      >
      <div class="media-modal__bg-overlay" />

      <!-- Hero -->
      <section class="media-modal__hero">
        <div class="media-modal__hero-body">
          <span class="media-modal__type-badge">{{ current.typeBadge }}</span>
          <h1 class="media-modal__title">{{ current.title }}</h1>
          <div class="media-modal__cta">
            <AppButton variant="primary" size="large" :icon-left="Play">
              {{ current.watchLabel }}
            </AppButton>
            <button type="button" class="media-modal__ghost">
              <Plus :size="18" />
              {{ $t("HOME_HERO_ADD") }}
            </button>
          </div>
        </div>
      </section>

      <!-- Info -->
      <section class="media-modal__info">
        <div class="media-modal__info-main">
          <div class="media-modal__meta">
            <span class="media-modal__match"
              >{{ current.matchPercent }}% {{ $t("MEDIA_MATCH") }}</span
            >
            <span class="media-modal__meta-item">{{ current.year }}</span>
            <span class="media-modal__meta-item">{{ current.duration }}</span>
            <span
              v-for="flag in current.flags"
              :key="flag"
              class="media-modal__flag"
              >{{ flag }}</span
            >
          </div>

          <p class="media-modal__description">{{ current.description }}</p>
        </div>

        <aside class="media-modal__info-aside">
          <div
            v-for="row in current.info"
            :key="row.label"
            class="media-modal__info-row"
          >
            <span class="media-modal__info-label">{{ row.label }}:</span>
            <span class="media-modal__info-value">{{ row.value }}</span>
          </div>
          <div class="media-modal__info-row">
            <span class="media-modal__info-label"
              >{{ current.ratingLabel }}:</span
            >
            <span class="media-modal__rating">{{
              current.rating.toFixed(1)
            }}</span>
          </div>
        </aside>
      </section>

      <!-- Seasons & Episodes -->
      <section v-if="current.seasons?.length" class="media-modal__seasons">
        <AppTabs
          :tabs="seasonTabs"
          :model-value="activeSeasonKey"
          inactive-variant="transparent"
          :button-props="{ size: 'small' }"
          @update:model-value="(v) => (activeSeasonKey = String(v))"
        />

        <div class="media-modal__episodes">
          <article
            v-for="ep in activeEpisodes"
            :key="ep.number"
            class="media-modal__episode"
          >
            <span class="media-modal__episode-number">{{ ep.number }}</span>
            <img
              :src="ep.image"
              :alt="ep.title"
              class="media-modal__episode-img"
            >
            <div class="media-modal__episode-body">
              <h3 class="media-modal__episode-title">{{ ep.title }}</h3>
              <span class="media-modal__episode-meta">
                {{ ep.duration
                }}<template v-if="ep.note"> · {{ ep.note }}</template>
              </span>
              <p class="media-modal__episode-desc">{{ ep.description }}</p>
            </div>
            <button type="button" class="media-modal__episode-play">
              <Play :size="14" fill="currentColor" />
            </button>
          </article>
        </div>
      </section>

      <!-- Similar -->
      <section class="media-modal__similar">
        <h2 class="media-modal__similar-title">{{ current.similarTitle }}</h2>
        <div class="media-modal__similar-grid">
          <PublicMovieCard
            v-for="item in current.similar"
            :key="item.id"
            :item="item"
            variant="poster"
          />
        </div>
      </section>
    </div>
  </AppModal>
</template>

<script setup lang="ts">
import { Play, Plus } from "lucide-vue-next";
import PublicMovieCard from "~/components/Public/MovieCard/index.vue";
import type { ITab } from "~/components/System/AppTabs/index.types";

const { current, isOpen } = useMediaModal();

const activeSeasonKey = ref<string>("");

watch(
  current,
  (value) => {
    activeSeasonKey.value = value?.seasons?.[0]?.key ?? "";
  },
  { immediate: true },
);

const seasonTabs = computed<ITab[]>(() =>
  (current.value?.seasons ?? []).map((s) => ({ value: s.key, title: s.title })),
);

const activeEpisodes = computed(() => {
  const seasons = current.value?.seasons;
  if (!seasons) return [];
  const match =
    seasons.find((s) => s.key === activeSeasonKey.value) ?? seasons[0];
  return match?.episodes ?? [];
});
</script>

<style lang="scss" scoped>
.media-modal {
  :deep(.app-modal__close) {
    backdrop-filter: blur(8px);
    background: rgba(10, 10, 10, 0.55);
    color: var(--color-white);
    z-index: 2;

    &:hover {
      background: rgba(10, 10, 10, 0.8);
    }
  }

  &__content {
    display: flex;
    flex-direction: column;
    isolation: isolate;
    position: relative;
  }

  &__bg-img {
    display: block;
    height: clamp(320px, 50vh, 520px);
    left: 0;
    object-fit: cover;
    position: absolute;
    top: 0;
    width: 100%;
    z-index: -2;
  }

  &__bg-overlay {
    background:
      linear-gradient(
        180deg,
        rgba(20, 20, 20, 0) 40%,
        var(--color-surface) 100%
      ),
      linear-gradient(
        90deg,
        rgba(20, 20, 20, 0.85) 0%,
        rgba(20, 20, 20, 0.15) 70%
      );
    height: clamp(320px, 50vh, 520px);
    left: 0;
    position: absolute;
    top: 0;
    width: 100%;
    z-index: -1;
  }

  &__hero {
    display: flex;
    flex-direction: column;
    flex-shrink: 0;
    height: clamp(320px, 50vh, 520px);
    justify-content: flex-end;
    position: relative;
  }

  &__hero-body {
    display: flex;
    flex-direction: column;
    gap: var(--spacing-sm);
    padding: var(--spacing-xl);
  }

  &__type-badge {
    @include FluidFontCaption;
    align-self: flex-start;
    background: var(--color-primary);
    border-radius: var(--radius-xs);
    color: var(--color-white);
    padding: var(--spacing-3xs) var(--spacing-xs);
  }

  &__title {
    @include FluidFontH1;
    color: var(--color-white);
    margin: 0;
  }

  &__cta {
    align-items: center;
    display: flex;
    flex-wrap: wrap;
    gap: var(--spacing-xs);
    margin-top: var(--spacing-2xs);
  }

  &__ghost {
    @include FluidFontBodyMd;
    align-items: center;
    backdrop-filter: blur(6px);
    background: rgba(var(--color-white-rgb), 0.12);
    border: 1px solid rgba(var(--color-white-rgb), 0.18);
    border-radius: var(--radius-md);
    color: var(--color-white);
    cursor: pointer;
    display: inline-flex;
    font-weight: 600;
    gap: var(--spacing-2xs);
    height: var(--input-lg);
    padding: 0 var(--spacing-lg);
    transition: background 0.2s ease;

    &:hover {
      background: rgba(var(--color-white-rgb), 0.18);
    }
  }

  &__info {
    display: grid;
    gap: var(--spacing-xl);
    grid-template-columns: 1fr 280px;
    padding: var(--spacing-lg) var(--spacing-xl);
  }

  &__info-main {
    display: flex;
    flex-direction: column;
    gap: var(--spacing-base);
  }

  &__meta {
    align-items: center;
    display: flex;
    flex-wrap: wrap;
    gap: var(--spacing-sm);
  }

  &__match {
    @include FluidFontLabel;
    color: var(--color-success);
  }

  &__meta-item {
    @include FluidFontBodySm;
    color: var(--color-text-secondary);
  }

  &__flag {
    @include FluidFontCaption;
    background: var(--color-surface-alt);
    border: 1px solid var(--color-border);
    border-radius: var(--radius-2xs);
    color: var(--color-text-primary);
    padding: 2px var(--spacing-2xs);
  }

  &__description {
    @include FluidFontBodyMd;
    color: var(--color-text-primary);
    margin: 0;
  }

  &__info-aside {
    display: flex;
    flex-direction: column;
    gap: var(--spacing-2xs);
  }

  &__info-row {
    @include FluidFontBodySm;
    color: var(--color-text-secondary);
  }

  &__info-label {
    color: var(--color-text-tertiary);
    margin-right: var(--spacing-2xs);
  }

  &__info-value {
    color: var(--color-text-primary);
  }

  &__rating {
    color: var(--color-warning);
    font-weight: 700;
  }

  &__seasons {
    display: flex;
    flex-direction: column;
    gap: var(--spacing-base);
    padding: 0 var(--spacing-xl) var(--spacing-xl);
  }

  &__episodes {
    display: flex;
    flex-direction: column;
    gap: var(--spacing-xs);
  }

  &__episode {
    align-items: center;
    background: var(--color-surface-alt);
    border: 1px solid var(--color-border);
    border-radius: var(--radius-md);
    display: grid;
    gap: var(--spacing-base);
    grid-template-columns: 40px 140px 1fr auto;
    padding: var(--spacing-xs) var(--spacing-base);
  }

  &__episode-number {
    @include FluidFontH3;
    color: var(--color-text-tertiary);
    text-align: center;
  }

  &__episode-img {
    aspect-ratio: 16 / 9;
    border-radius: var(--radius-xs);
    height: auto;
    object-fit: cover;
    width: 100%;
  }

  &__episode-body {
    display: flex;
    flex-direction: column;
    gap: var(--spacing-3xs);
    min-width: 0;
  }

  &__episode-title {
    @include FluidFontBodyMd;
    color: var(--color-white);
    font-weight: 700;
    margin: 0;
  }

  &__episode-meta {
    @include FluidFontCaption;
    color: var(--color-text-secondary);
  }

  &__episode-desc {
    @include FluidFontCaption;
    color: var(--color-text-primary);
    margin: 0;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  &__episode-play {
    align-items: center;
    background: var(--color-surface-alt);
    border: 1px solid var(--color-border);
    border-radius: var(--radius-full);
    color: var(--color-text-primary);
    cursor: pointer;
    display: flex;
    height: 36px;
    justify-content: center;
    transition: background 0.2s ease;
    width: 36px;

    &:hover {
      background: var(--color-background-hover);
    }
  }

  &__similar {
    border-top: 1px solid var(--color-divider);
    display: flex;
    flex-direction: column;
    gap: var(--spacing-base);
    padding: var(--spacing-lg) var(--spacing-xl) var(--spacing-xl);
  }

  &__similar-title {
    @include FluidFontH3;
    color: var(--color-white);
    margin: 0;
  }

  &__similar-grid {
    display: grid;
    gap: var(--spacing-base);
    grid-template-columns: repeat(5, 1fr);
  }
}
</style>
