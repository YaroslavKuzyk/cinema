<!-- eslint-disable vue/no-mutating-props -->
<template>
  <AppCard :title="$t('ADMIN_MOVIE_FORM_BASIC_INFO')" :subtitle="$t('ADMIN_MOVIE_FORM_BASIC_INFO_DESC')">
    <template #icon>✏️</template>
    <div class="basic-info">
      <AppInput v-model="form.title" :label="$t('ADMIN_MOVIE_FORM_NAME') + ' *'" :readonly="readonly" />
      <div class="basic-info__row">
        <AppInput v-model="form.year" :label="$t('ADMIN_MOVIE_FORM_YEAR') + ' *'" :readonly="readonly" />
        <AppInput v-model="form.rating" :label="$t('ADMIN_MOVIE_FORM_RATING')" :readonly="readonly" />
        <AppInput v-model="form.duration" :label="$t('ADMIN_MOVIE_FORM_DURATION')" :readonly="readonly" />
        <AppSelect v-model="form.ageRestriction" :options="ageOptions" item-title="title" item-value="value" :label="$t('ADMIN_MOVIE_FORM_AGE')" :disabled="readonly" />
      </div>
      <div class="basic-info__row">
        <AppSelect v-model="form.country" :options="countryOptions" item-title="title" item-value="value" :label="$t('ADMIN_MOVIE_FORM_COUNTRY') + ' *'" :disabled="readonly" />
        <AppSelect v-model="form.language" :options="languageOptions" item-title="title" item-value="value" :label="$t('ADMIN_MOVIE_FORM_LANGUAGE')" :disabled="readonly" />
        <AppInput v-model="form.studio" :label="$t('ADMIN_MOVIE_FORM_STUDIO')" :readonly="readonly" />
      </div>
      <AppTextarea v-model="form.description" :label="$t('ADMIN_MOVIE_FORM_DESCRIPTION') + ' *'" :readonly="readonly" :rows="4" />
    </div>
  </AppCard>
</template>

<script setup lang="ts">
import type { IMovieForm } from '../domain'

defineProps<{
  form: IMovieForm
  readonly: boolean
  ageOptions: { title: string; value: string }[]
  countryOptions: { title: string; value: string }[]
  languageOptions: { title: string; value: string }[]
}>()
</script>

<style lang="scss" scoped>
.basic-info {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-md);

  &__row { display: flex;
  gap: var(--spacing-md);

  > * { flex: 1;
  } };
}
</style>
