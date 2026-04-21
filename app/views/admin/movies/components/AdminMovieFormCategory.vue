<!-- eslint-disable vue/no-mutating-props -->
<template>
  <AppCard :title="$t('ADMIN_MOVIE_FORM_CATEGORY')" :subtitle="$t('ADMIN_MOVIE_FORM_CATEGORY_DESC')">
    <template #icon>🎬</template>
    <div class="category">
      <div class="category__section">
        <label class="category__label">{{ $t('ADMIN_MOVIE_FORM_GENRES') }} *</label>
        <AppTags v-model="form.genres" :read-only="readonly" :add-button-text="$t('ADMIN_MOVIE_FORM_ADD_GENRE')" @add="() => {}" />
      </div>
      <div class="category__section">
        <label class="category__label">{{ $t('ADMIN_MOVIE_FORM_DIRECTORS') }}</label>
        <AppTags v-model="form.directors" :read-only="readonly" :add-button-text="$t('ADMIN_MOVIE_FORM_ADD_DIRECTOR')" @add="() => {}" />
      </div>
      <div class="category__section">
        <label class="category__label">{{ $t('ADMIN_MOVIE_FORM_ACTORS') }}</label>
        <AppTags v-model="form.actors" :read-only="readonly" :add-button-text="$t('ADMIN_MOVIE_FORM_ADD_ACTOR')" @add="() => {}" />
      </div>
      <div class="category__section">
        <label class="category__label">{{ $t('ADMIN_MOVIE_FORM_PRODUCTION_COUNTRIES') }}</label>
        <AppTags v-model="form.countries" :read-only="readonly" :add-button-text="$t('ADMIN_MOVIE_FORM_ADD_COUNTRY')" @add="() => {}" />
      </div>
    </div>
  </AppCard>
</template>

<script setup lang="ts">
import type { IMovieForm } from '../domain'
defineProps<{ form: IMovieForm; readonly: boolean }>()
</script>

<style lang="scss" scoped>
.category {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-lg);

  &__section { display: flex;
  flex-direction: column;
  gap: var(--spacing-sm);
}

  &__label {
    @include FluidFontLabel;
    color: var(--color-text-secondary);
    text-transform: uppercase;
    };
  }
</style>
