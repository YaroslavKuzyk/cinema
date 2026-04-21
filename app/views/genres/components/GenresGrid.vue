<template>
  <div class="genres-grid">
    <GenreCard v-for="genre in genres" :key="genre.id" :item="genre" />
  </div>
</template>

<script setup lang="ts">
import GenreCard from './GenreCard.vue'
import type { IGenreItem } from '../domain'

interface IProps {
  genres: IGenreItem[]
}

defineProps<IProps>()
</script>

<style lang="scss" scoped>
.genres-grid {
  display: grid;
  gap: var(--spacing-base);
  grid-template-columns: repeat(4, 1fr);
}
</style>
