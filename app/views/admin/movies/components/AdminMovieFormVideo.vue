<template>
  <AppCard :title="$t('ADMIN_MOVIE_FORM_VIDEO')" :subtitle="$t('ADMIN_MOVIE_FORM_VIDEO_DESC')">
    <template #icon>🎞️</template>
    <div class="video-section">
      <div v-if="!videoFile" class="video-section__upload">
        <Upload :size="32" class="video-section__upload-icon" />
        <p>{{ $t('ADMIN_MOVIE_FORM_VIDEO_DROP') }}</p>
        <span>{{ $t('ADMIN_MOVIE_FORM_VIDEO_OR') }}</span>
        <AppButton size="medium" :icon-left="Upload">{{ $t('ADMIN_MOVIE_FORM_VIDEO_CHOOSE') }}</AppButton>
        <span class="video-section__formats">{{ $t('ADMIN_MOVIE_FORM_VIDEO_FORMATS') }}</span>
      </div>

      <template v-if="videoFile">
        <div class="video-section__file">
          <div class="video-section__file-icon"><CheckCircle :size="24" /></div>
          <div class="video-section__file-info">
            <span class="video-section__file-name">{{ videoFile.name }}</span>
            <span class="video-section__file-meta">{{ videoFile.format }} · {{ videoFile.size }} · {{ videoFile.resolution }} · {{ videoFile.duration }} · {{ $t('ADMIN_MOVIE_FORM_VIDEO_UPLOADED') }} {{ videoFile.uploadedAt }}</span>
          </div>
          <AppBadge variant="success" read-only>{{ $t('ADMIN_MOVIE_FORM_VIDEO_DONE') }}</AppBadge>
          <div class="video-section__file-actions">
            <button class="video-section__action-btn"><Eye :size="16" /></button>
            <button class="video-section__action-btn"><Download :size="16" /></button>
            <button class="video-section__action-btn video-section__action-btn--danger"><Trash2 :size="16" /></button>
          </div>
        </div>

        <div class="video-section__specs">
          <div class="video-section__spec"><strong>{{ videoFile.resolution }}</strong><span>{{ $t('ADMIN_MOVIE_FORM_VIDEO_RESOLUTION') }}</span></div>
          <div class="video-section__spec"><strong>{{ videoFile.duration }}</strong><span>{{ $t('ADMIN_MOVIE_FORM_VIDEO_DURATION') }}</span></div>
          <div class="video-section__spec"><strong>{{ videoFile.size }}</strong><span>{{ $t('ADMIN_MOVIE_FORM_VIDEO_SIZE') }}</span></div>
          <div class="video-section__spec"><strong>{{ videoFile.codec }}</strong><span>{{ $t('ADMIN_MOVIE_FORM_VIDEO_CODEC') }}</span></div>
        </div>

        <div class="video-section__transcode">
          <div class="video-section__transcode-header">
            <strong>{{ $t('ADMIN_MOVIE_FORM_TRANSCODE') }}</strong>
            <span>{{ doneCount }} {{ $t('ADMIN_MOVIE_FORM_TRANSCODE_OF') }} {{ transcodeJobs.length }} {{ $t('ADMIN_MOVIE_FORM_TRANSCODE_DONE') }}</span>
          </div>
          <div v-for="job in transcodeJobs" :key="job.quality" class="video-section__transcode-row">
            <span class="video-section__transcode-quality">{{ job.quality }}</span>
            <div class="video-section__transcode-bar">
              <div class="video-section__transcode-fill" :class="job.status === 'done' ? 'video-section__transcode-fill--done' : 'video-section__transcode-fill--progress'" :style="{ width: `${job.progress}%` }" />
            </div>
            <span class="video-section__transcode-status" :class="job.status === 'done' ? 'video-section__transcode-status--done' : ''">
              {{ job.status === 'done' ? $t('ADMIN_MOVIE_FORM_VIDEO_DONE') : `${job.progress}%` }}
            </span>
          </div>
        </div>

        <div class="video-section__media-row">
          <div class="video-section__media-card">
            <div class="video-section__media-header">
              <strong>{{ $t('ADMIN_MOVIE_FORM_AUDIO') }}</strong>
              <AppButton v-if="!readonly" variant="ghost" size="small">+ {{ $t('ADMIN_MOVIE_FORM_ADD') }}</AppButton>
            </div>
            <div v-for="track in audioTracks" :key="track.id" class="video-section__media-item">
              <span>{{ track.language }} {{ track.label }}</span>
              <span class="video-section__media-meta">{{ track.codec }}</span>
            </div>
          </div>
          <div class="video-section__media-card">
            <div class="video-section__media-header">
              <strong>{{ $t('ADMIN_MOVIE_FORM_SUBTITLES') }}</strong>
              <AppButton v-if="!readonly" variant="ghost" size="small">+ {{ $t('ADMIN_MOVIE_FORM_ADD') }}</AppButton>
            </div>
            <div v-for="sub in subtitles" :key="sub.id" class="video-section__media-item">
              <span>{{ sub.flag }} {{ sub.language }}</span>
              <span class="video-section__media-meta">{{ sub.format }}</span>
            </div>
          </div>
        </div>
      </template>
    </div>
  </AppCard>
</template>

<script setup lang="ts">
import { Upload, CheckCircle, Eye, Download, Trash2 } from 'lucide-vue-next'
import type { IVideoFile, ITranscodeJob, IAudioTrack, ISubtitle } from '../domain'

const props = defineProps<{
  videoFile: IVideoFile | null
  transcodeJobs: ITranscodeJob[]
  audioTracks: IAudioTrack[]
  subtitles: ISubtitle[]
  readonly: boolean
}>()

const doneCount = computed(() => props.transcodeJobs.filter((j) => j.status === 'done').length)
</script>

<style lang="scss" scoped>
.video-section {
  display: flex; flex-direction: column; gap: var(--spacing-lg);

  &__upload {
    align-items: center; background: var(--color-divider); border: 1px dashed var(--color-border); border-radius: var(--radius-lg);
    display: flex; flex-direction: column; gap: var(--spacing-sm); justify-content: center; padding: var(--spacing-3xl);

    p {
      @include FluidFontBodyMd;
      color: var(--color-white);
      font-weight: 600;
    }

    span {
      @include FluidFontCaption;
      color: var(--color-text-tertiary);
      };
    }
  &__upload-icon { color: var(--color-text-tertiary); }

  &__formats {
    @include FluidFontCaption;
    color: var(--color-text-tertiary);
    margin-top: var(--spacing-xs);
  }

  &__file {

    align-items: center;

    background: var(--color-divider);

    border: 1px solid var(--color-success-border);

    border-radius: var(--radius-lg);

    display: flex;

    gap: var(--spacing-md);

    padding: var(--spacing-md);

  }

  &__file-icon {
    color: var(--color-success);
    flex-shrink: 0;
  }

  &__file-info {
    display: flex;
    flex: 1;
    flex-direction: column;
    gap: var(--spacing-3xs);
  }

  &__file-name {
    @include FluidFontBodySm;
    color: var(--color-white);
    font-weight: 600;
  }

  &__file-meta {
    @include FluidFontCaption;
    color: var(--color-text-tertiary);
  }

  &__file-actions {
    display: flex;
    gap: var(--spacing-2xs);
  }

  &__action-btn {

    align-items: center;

    background: none;

    border: none;

    border-radius: var(--radius-xs);

    color: var(--color-text-secondary);

    cursor: pointer;

    display: flex;

    height: 30px;

    justify-content: center;

    transition: all 0.2s ease;

    width: 30px;

    &:hover { background: var(--color-white-10);

    color: var(--color-white);

  }

    &--danger:hover {
      background: var(--color-danger-bg);
      color: var(--color-danger);
      };
    }

  &__specs {

    background: var(--color-divider);

    border: 1px solid var(--color-border);

    border-radius: var(--radius-lg);

    display: flex;

    padding: var(--spacing-md);

  }

  &__spec {

    align-items: center;

    display: flex;

    flex: 1;

    flex-direction: column;

    gap: var(--spacing-3xs);

    strong { @include FluidFontBodyMd;

    color: var(--color-white);

    font-weight: 700;

  }

    span {
      @include FluidFontCaption;
      color: var(--color-text-tertiary);
      };
    }

  &__transcode {

    background: var(--color-divider);

    border: 1px solid var(--color-border);

    border-radius: var(--radius-lg);

    display: flex;

    flex-direction: column;

    gap: var(--spacing-md);

    padding: var(--spacing-md);

  }

  &__transcode-header {

    align-items: center;

    display: flex;

    justify-content: space-between;

    strong { @include FluidFontBodySm;

    color: var(--color-white);

  }

    span {
      @include FluidFontCaption;
      color: var(--color-text-tertiary);
      };
    }

  &__transcode-row {
    align-items: center;
    display: flex;
    gap: var(--spacing-md);
  }

  &__transcode-quality {
    @include FluidFontCaption;
    color: var(--color-text-secondary);
    min-width: 40px;
  }

  &__transcode-bar {
    background: var(--color-border);
    border-radius: var(--radius-full);
    flex: 1;
    height: 6px;
    overflow: hidden;
  }

  &__transcode-fill {

    border-radius: var(--radius-full);

    height: 100%;

    transition: width 0.3s ease;

    &--done { background: var(--color-success);

  }

    &--progress {
      background: var(--color-info);
      };
    }

  &__transcode-status {
    @include FluidFontCaption;

    min-width: 50px;

    text-align: right;

    &--done { color: var(--color-success);

    };

  }

  &__media-row {

    display: flex;

    gap: var(--spacing-md);

  }

  &__media-card {
    background: var(--color-divider);
    border: 1px solid var(--color-border);
    border-radius: var(--radius-lg);
    display: flex;
    flex: 1;
    flex-direction: column;
    gap: var(--spacing-sm);
    padding: var(--spacing-md);
  }

  &__media-header {

    align-items: center;

    display: flex;

    justify-content: space-between;

    strong { @include FluidFontBodySm;

    color: var(--color-white);

    };

  }

  &__media-item {
    @include FluidFontCaption;

    align-items: center;

    border-top: 1px solid var(--color-border);

    color: var(--color-text-primary);

    display: flex;

    justify-content: space-between;

    padding-top: var(--spacing-sm);

  }

  &__media-meta {
    color: var(--color-text-tertiary);
    };
  }
</style>
