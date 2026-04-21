<template>
  <div class="admin-movie-form-page">
    <AdminMovieFormHeader
      :mode="mode"
      :is-readonly="isReadonly"
      :status-label="statusLabel"
      :content-type="form.contentType"
      @preview="() => {}"
      @save-draft="saveDraft"
      @publish="publish"
    />

    <div class="admin-movie-form-page__layout">
      <div class="admin-movie-form-page__content">
        <AdminMovieFormContentType
          v-model="form.contentType"
          :readonly="isReadonly"
        />

        <AdminMovieFormBasicInfo
          :form="form"
          :readonly="isReadonly"
          :age-options="ageOptions"
          :country-options="countryOptions"
          :language-options="languageOptions"
        />

        <AdminMovieFormCategory :form="form" :readonly="isReadonly" />

        <AdminMovieFormPosters :readonly="isReadonly" />

        <template v-if="form.contentType === 'single'">
          <AdminMovieFormVideo
            :video-file="form.videoFile"
            :transcode-jobs="transcodeJobs"
            :audio-tracks="audioTracks"
            :subtitles="subtitles"
            :readonly="isReadonly"
          />
        </template>

        <template v-else>
          <AdminMovieFormSeasons
            :seasons="seasons"
            :readonly="isReadonly"
            @update:seasons="seasons = $event"
          />

          <AdminMovieFormVideo
            :video-file="null"
            :transcode-jobs="[]"
            :audio-tracks="[]"
            :subtitles="[]"
            :readonly="isReadonly"
          />
        </template>

        <AdminMovieFormRelated :items="form.relatedContent" :readonly="isReadonly" />
      </div>

      <div class="admin-movie-form-page__sidebar">
        <AdminMovieFormSidebar
          :form="form"
          :readonly="isReadonly"
          :is-create="isCreate"
          :status-label="statusLabel"
          :readiness="readiness"
          @publish="publish"
          @schedule="schedulePublish"
          @save-draft="saveDraft"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {
  AdminMovieFormHeader,
  AdminMovieFormContentType,
  AdminMovieFormBasicInfo,
  AdminMovieFormCategory,
  AdminMovieFormPosters,
  AdminMovieFormVideo,
  AdminMovieFormRelated,
  AdminMovieFormSidebar,
  AdminMovieFormSeasons,
} from '../components'
import { useAdminMovieForm } from '../composables'
import type { MovieFormMode } from '../domain'

const props = defineProps<{
  mode: MovieFormMode
}>()

const modeRef = computed(() => props.mode)

const {
  form, isReadonly, isCreate,
  seasons, transcodeJobs, audioTracks, subtitles,
  statusLabel, ageOptions, countryOptions, languageOptions,
  readiness,
  saveDraft, publish, schedulePublish,
} = useAdminMovieForm(modeRef)
</script>

<style lang="scss" scoped>
.admin-movie-form-page {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-lg);

  &__layout {

    display: flex;

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

  }
}
</style>
