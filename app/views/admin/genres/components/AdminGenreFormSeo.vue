<!-- eslint-disable vue/no-mutating-props -->
<template>
  <AppCard :title="$t('ADMIN_GENRE_FORM_SEO_TITLE')" :subtitle="$t('ADMIN_GENRE_FORM_SEO_SUBTITLE')">
    <template #icon>🔍</template>
    <div class="genre-seo">
      <AppInput v-model="form.seoTitle" :label="$t('ADMIN_GENRE_FORM_SEO_META_TITLE')" :readonly="readonly" />
      <AppTextarea v-model="form.seoDescription" :label="$t('ADMIN_GENRE_FORM_SEO_META_DESC')" :readonly="readonly" :rows="2" />
      <div class="genre-seo__preview">
        <label class="genre-seo__label">{{ $t('ADMIN_GENRE_FORM_SEO_PREVIEW') }}</label>
        <div class="genre-seo__google">
          <span class="genre-seo__google-title">{{ form.seoTitle || form.name || '...' }}</span>
          <span class="genre-seo__google-url">cinema.ua/genres/{{ form.slug || '...' }}</span>
          <span class="genre-seo__google-desc">{{ form.seoDescription || form.description || '...' }}</span>
        </div>
      </div>
    </div>
  </AppCard>
</template>

<script setup lang="ts">
import type { IGenreForm } from '../domain'
defineProps<{ form: IGenreForm; readonly: boolean }>()
</script>

<style lang="scss" scoped>
.genre-seo {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-md);

  &__label { @include FluidFontLabel;
  color: var(--color-text-secondary);
  text-transform: uppercase;
}

  &__preview {
    display: flex;
    flex-direction: column;
    gap: var(--spacing-sm);
  }

  &__google {

    background: var(--color-divider);

    border: 1px solid var(--color-border);

    border-radius: var(--radius-lg);

    display: flex;

    flex-direction: column;

    gap: var(--spacing-3xs);

    padding: var(--spacing-md);

  }

  &__google-title {
    @include FluidFontBodyMd;
    color: var(--color-info);
    font-weight: 600;
  }

  &__google-url {
    @include FluidFontCaption;
    color: var(--color-success);
  }

  &__google-desc {
    @include FluidFontCaption;
    color: var(--color-text-secondary);
    };
  }
</style>
