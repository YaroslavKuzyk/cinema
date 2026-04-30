<template>
  <button type="button" class="search-result-card" @click="emit('select', item)">
    <div class="search-result-card__media">
      <img
        :src="item.image"
        :alt="item.title"
        class="search-result-card__img"
        loading="lazy"
      >
    </div>

    <div class="search-result-card__info">
      <h3 class="search-result-card__title">{{ item.title }}</h3>
      <div class="search-result-card__meta">
        <span class="search-result-card__rating">
          <Star :size="12" fill="currentColor" />
          {{ item.rating.toFixed(1) }}
        </span>
        <span class="search-result-card__year">{{ item.year }}</span>
        <span class="search-result-card__type">{{ item.typeLabel }}</span>
      </div>
    </div>
  </button>
</template>

<script setup lang="ts">
import { Star } from 'lucide-vue-next'
import type { ISearchItem } from '../domain'

defineProps<{ item: ISearchItem }>()

const emit = defineEmits<{ select: [item: ISearchItem] }>()
</script>

<style lang="scss" scoped>
.search-result-card {
  background: transparent;
  border: none;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  gap: var(--spacing-xs);
  padding: 0;
  text-align: left;
  transition: transform 0.25s ease;
  width: 100%;

  &:hover {
    transform: translateY(-4px);

    .search-result-card__media {
      outline: 2px solid var(--color-white);
    }

    .search-result-card__img {
      transform: scale(1.04);
    }
  }

  &__media {
    aspect-ratio: 2 / 3;
    border-radius: var(--radius-xl);
    isolation: isolate;
    outline: 2px solid transparent;
    overflow: hidden;
    position: relative;
    transition: outline 0.25s ease;
    width: 100%;
  }

  &__img {
    display: block;
    height: 100%;
    object-fit: cover;
    transition: transform 0.4s ease;
    width: 100%;
  }

  &__info {
    display: flex;
    flex-direction: column;
    gap: var(--spacing-3xs);
    padding: 0 var(--spacing-2xs);
  }

  &__title {
    @include FluidFontBodyMd;
    color: var(--color-white);
    font-weight: 700;
    margin: 0;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  &__meta {
    @include FluidFontCaption;
    align-items: center;
    color: var(--color-text-secondary);
    display: flex;
    flex-wrap: wrap;
    gap: var(--spacing-xs);
  }

  &__rating {
    align-items: center;
    color: var(--color-warning);
    display: inline-flex;
    font-weight: 700;
    gap: var(--spacing-3xs);
  }

  &__year {
    color: var(--color-text-secondary);
  }

  &__type {
    background: var(--color-primary);
    border-radius: var(--radius-2xs);
    color: var(--color-white);
    padding: 2px var(--spacing-2xs);
  }
}
</style>
