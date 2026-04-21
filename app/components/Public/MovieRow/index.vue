<template>
  <section class="movie-row">
    <header class="movie-row__header">
      <h2 class="movie-row__title">{{ title }}</h2>
      <NuxtLink v-if="moreLink" :to="moreLink" class="movie-row__more">
        {{ $t('HOME_SEE_ALL') }}
      </NuxtLink>
    </header>

    <div class="movie-row__grid" :class="`movie-row__grid--${columns}`">
      <PublicMovieCard
        v-for="(item, idx) in items"
        :key="item.id"
        :item="item"
        :variant="variant"
        :rank="numbered ? idx + 1 : undefined"
        @click="emit('select', item)"
      />
    </div>
  </section>
</template>

<script setup lang="ts">
import PublicMovieCard from '~/components/Public/MovieCard/index.vue'
import type { IMovie } from '~/components/Public/MovieCard/index.types'
import type { IMovieRowProps } from './index.types'

withDefaults(defineProps<IMovieRowProps>(), {
  columns: 5,
  variant: 'poster',
  numbered: false,
  moreLink: undefined,
})

const emit = defineEmits<{
  select: [item: IMovie]
}>()
</script>

<style lang="scss" scoped>
.movie-row {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-base);

  &__header {
    align-items: center;
    display: flex;
    justify-content: space-between;
  }

  &__title {
    @include FluidFontH2;
    color: var(--color-white);
    margin: 0;
  }

  &__more {
    @include FluidFontBodySm;
    color: var(--color-text-secondary);
    text-decoration: none;
    transition: color 0.2s ease;

    &:hover {
      color: var(--color-white);
    }
  }

  &__grid {
    display: grid;
    gap: var(--spacing-base);

    &--3 {
      grid-template-columns: repeat(3, 1fr);
    }

    &--4 {
      grid-template-columns: repeat(4, 1fr);
    }

    &--5 {
      grid-template-columns: repeat(5, 1fr);
    }

    &--6 {
      grid-template-columns: repeat(6, 1fr);
    }
  }
}
</style>
