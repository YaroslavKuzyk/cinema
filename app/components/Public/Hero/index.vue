<template>
  <section class="public-hero">
    <img :src="featured.image" :alt="featured.title" class="public-hero__img" >
    <div class="public-hero__overlay" />

    <div class="public-hero__content">
      <span class="public-hero__tag">
        <Star :size="12" fill="currentColor" />
        {{ featured.tag }}
      </span>

      <h1 class="public-hero__title">{{ featured.title }}</h1>

      <p class="public-hero__description">{{ featured.description }}</p>

      <div class="public-hero__actions">
        <AppButton variant="primary" size="large" :icon-left="Play">
          {{ $t('HOME_HERO_WATCH') }}
        </AppButton>
        <button type="button" class="public-hero__ghost">
          <Plus :size="18" />
          {{ $t('HOME_HERO_ADD') }}
        </button>
      </div>

      <div class="public-hero__meta">
        <span class="public-hero__meta-rating">
          <Star :size="14" fill="currentColor" />
          {{ featured.rating.toFixed(1) }}
        </span>
        <span class="public-hero__meta-item">{{ featured.year }}</span>
        <span class="public-hero__meta-item">{{ featured.duration }}</span>
        <span class="public-hero__meta-item">{{ featured.genres.join(', ') }}</span>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { Play, Plus, Star } from 'lucide-vue-next'
import type { IHeroProps } from './index.types'

defineProps<IHeroProps>()
</script>

<style lang="scss" scoped>
.public-hero {
  align-items: flex-end;
  display: flex;
  isolation: isolate;
  min-height: 640px;
  overflow: hidden;
  padding: calc(var(--spacing-3xl) + 40px) var(--spacing-3xl) var(--spacing-3xl);
  position: relative;

  &__img {
    display: block;
    height: 100%;
    inset: 0;
    object-fit: cover;
    position: absolute;
    width: 100%;
    z-index: -2;
  }

  &__overlay {
    background:
      linear-gradient(180deg, rgba(10, 10, 10, 0) 30%, rgba(10, 10, 10, 0.85) 100%),
      linear-gradient(90deg, rgba(10, 10, 10, 0.85) 0%, rgba(10, 10, 10, 0.35) 55%, rgba(10, 10, 10, 0) 100%);
    inset: 0;
    position: absolute;
    z-index: -1;
  }

  &__content {
    display: flex;
    flex-direction: column;
    gap: var(--spacing-base);
    max-width: 560px;
    position: relative;
  }

  &__tag {
    @include FluidFontCaption;
    align-items: center;
    align-self: flex-start;
    background: rgba(var(--color-primary-rgb), 0.18);
    border: 1px solid rgba(var(--color-primary-rgb), 0.35);
    border-radius: var(--radius-full);
    color: #ff6068;
    display: inline-flex;
    gap: var(--spacing-3xs);
    padding: 4px var(--spacing-xs);
  }

  &__title {
    @include FluidFontDisplay;
    color: var(--color-white);
    margin: var(--spacing-xs) 0 0;
  }

  &__description {
    @include FluidFontBodyMd;
    color: var(--color-text-primary);
    max-width: 480px;
  }

  &__actions {
    display: flex;
    flex-wrap: wrap;
    gap: var(--spacing-xs);
    margin-top: var(--spacing-xs);
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
    transition: background 0.2s ease, border-color 0.2s ease;

    &:hover {
      background: rgba(var(--color-white-rgb), 0.18);
      border-color: rgba(var(--color-white-rgb), 0.3);
    }
  }

  &__meta {
    align-items: center;
    display: flex;
    flex-wrap: wrap;
    gap: var(--spacing-base);
    margin-top: var(--spacing-xs);
  }

  &__meta-rating {
    @include FluidFontLabel;
    align-items: center;
    color: var(--color-warning);
    display: inline-flex;
    gap: var(--spacing-3xs);
  }

  &__meta-item {
    @include FluidFontCaption;
    color: var(--color-text-secondary);
  }
}
</style>
