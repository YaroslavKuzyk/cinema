<template>
  <div class="admin-movie-form-header">
    <div class="admin-movie-form-header__left">
      <AppButton variant="secondary" size="small" square :icon-left="ArrowLeft" @click="navigateTo('/admin/movies')" />
      <div class="admin-movie-form-header__text">
        <h1>{{ $t(`ADMIN_MOVIE_FORM_TITLE_${mode.toUpperCase()}`) }}</h1>
        <p>{{ subtitle }}</p>
      </div>
    </div>
    <div v-if="!isReadonly" class="admin-movie-form-header__actions">
      <AppButton variant="ghost" size="medium" :icon-left="Eye" @click="$emit('preview')">
        {{ $t('ADMIN_MOVIE_FORM_PREVIEW') }}
      </AppButton>
      <AppButton variant="secondary" size="medium" @click="$emit('saveDraft')">
        {{ $t('ADMIN_MOVIE_FORM_SAVE_DRAFT') }}
      </AppButton>
      <AppButton size="medium" :icon-left="Check" @click="$emit('publish')">
        {{ $t('ADMIN_MOVIE_FORM_PUBLISH') }}
      </AppButton>
    </div>
  </div>
  <div class="admin-movie-form-header__meta">
    <div class="admin-movie-form-header__meta-inner">
      <span class="admin-movie-form-header__status">● {{ $t('ADMIN_MOVIE_FORM_STATUS_LABEL') }}: <strong>{{ statusLabel }}</strong></span>
      <span>{{ $t('ADMIN_MOVIE_FORM_CREATED') }}: <strong>20.03.2026</strong></span>
      <span>{{ $t('ADMIN_MOVIE_FORM_AUTHOR') }}: <strong>Адмін</strong></span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ArrowLeft, Eye, Check } from 'lucide-vue-next'
import type { MovieFormMode, ContentType } from '../domain'

const props = defineProps<{
  mode: MovieFormMode
  isReadonly: boolean
  statusLabel: string
  contentType: ContentType
}>()

defineEmits<{ preview: []; saveDraft: []; publish: [] }>()

const { t } = useI18n()

const subtitle = computed(() => {
  return props.contentType === 'single'
    ? t('ADMIN_MOVIE_FORM_SUBTITLE_SINGLE')
    : t('ADMIN_MOVIE_FORM_SUBTITLE_MULTI')
})
</script>

<style lang="scss" scoped>
.admin-movie-form-header {
  align-items: center;
  display: flex;
  justify-content: space-between;

  &__left {

    align-items: center;

    display: flex;

    gap: var(--spacing-sm);

  }

  &__text {

    display: flex;

    flex-direction: column;

    gap: var(--spacing-3xs);

    h1 { @include FluidFontH2;

    color: var(--color-white);

  }

    p {
      @include FluidFontCaption;
      color: var(--color-text-secondary);
      };
    }

  &__actions {
    align-items: center;
    display: flex;
    gap: var(--spacing-sm);
  }

  &__meta {
    background: var(--color-surface);
    border: 1px solid var(--color-border);
    border-radius: var(--radius-lg);
    padding: var(--spacing-sm) var(--spacing-lg);
  }

  &__meta-inner {
    @include FluidFontCaption;
    align-items: center;
    color: var(--color-text-tertiary);
    display: flex;
    gap: var(--spacing-lg);

    strong {
      color: var(--color-text-primary);
      };
    }

  &__status {
    color: var(--color-warning);
    };
  }
</style>
