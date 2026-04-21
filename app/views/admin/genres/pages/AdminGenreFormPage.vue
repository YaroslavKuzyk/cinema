<template>
  <div class="admin-genre-form-page">
    <AdminGenreFormHeader :mode="mode" :is-readonly="isReadonly" @save="save" @publish="publish" />

    <div class="admin-genre-form-page__layout">
      <div class="admin-genre-form-page__content">
        <AdminGenreFormBasicInfo
          :form="form"
          :readonly="isReadonly"
          :icon-options="iconOptions"
          :color-presets="colorPresets"
          @generate-slug="generateSlug"
        />
        <AdminGenreFormSeo :form="form" :readonly="isReadonly" />
      </div>

      <div class="admin-genre-form-page__sidebar">
        <AdminGenreFormSidebar
          :form="form"
          :readonly="isReadonly"
          :is-create="isCreate"
          :content-stats="contentStats"
          :status-options="statusOptions"
          @publish="publish"
          @save="save"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {
  AdminGenreFormHeader,
  AdminGenreFormBasicInfo,
  AdminGenreFormSeo,
  AdminGenreFormSidebar,
} from '../components'
import { useAdminGenreForm } from '../composables'
import type { GenreFormMode } from '../domain'

const props = defineProps<{ mode: GenreFormMode }>()
const modeRef = computed(() => props.mode)

const {
  form, isReadonly, isCreate,
  contentStats, colorPresets, iconOptions, statusOptions,
  generateSlug, save, publish,
} = useAdminGenreForm(modeRef)
</script>

<style lang="scss" scoped>
.admin-genre-form-page {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-lg);

  &__layout { display: flex;
  gap: var(--spacing-xl);
}

  &__content {
    display: flex;
    flex: 1;
    flex-direction: column;
    gap: var(--spacing-lg);
  }

  &__sidebar {
    flex-shrink: 0;
    width: var(--container-md);
    };
  }
</style>
