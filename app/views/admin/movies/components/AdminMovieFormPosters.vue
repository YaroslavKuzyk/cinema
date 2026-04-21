<template>
  <AppCard :title="$t('ADMIN_MOVIE_FORM_POSTERS')" :subtitle="$t('ADMIN_MOVIE_FORM_POSTERS_DESC')">
    <template #icon>🖼️</template>
    <div class="posters">
      <div class="posters__item">
        <label class="posters__label">{{ $t('ADMIN_MOVIE_FORM_POSTER_LARGE') }} *</label>
        <div class="posters__upload">
          <div class="posters__placeholder">
            <span class="posters__size">1200 × 1800</span>
            <div class="posters__image" />
          </div>
          <span class="posters__hint">{{ $t('ADMIN_MOVIE_FORM_POSTER_HINT_LG') }}</span>
        </div>
      </div>
      <div class="posters__item">
        <label class="posters__label">{{ $t('ADMIN_MOVIE_FORM_POSTER_SMALL') }}</label>
        <div class="posters__upload">
          <div class="posters__placeholder posters__placeholder--small">
            <span class="posters__size">400 × 600</span>
            <div class="posters__image" />
          </div>
          <span class="posters__hint">{{ $t('ADMIN_MOVIE_FORM_POSTER_HINT_SM') }}</span>
        </div>
      </div>
    </div>
  </AppCard>
</template>

<script setup lang="ts">
defineProps<{ readonly: boolean }>()
</script>

<style lang="scss" scoped>
.posters {
  display: flex;
  gap: var(--spacing-lg);

  &__item { display: flex;
  flex: 1;
  flex-direction: column;
  gap: var(--spacing-sm);
}

  &__label {
    @include FluidFontLabel;
    color: var(--color-text-secondary);
    text-transform: uppercase;
  }

  &__upload {

    display: flex;

    flex-direction: column;

    gap: var(--spacing-xs);

  }

  &__placeholder {
    aspect-ratio: 2/3;
    background: var(--color-divider);
    border: 1px dashed var(--color-border);
    border-radius: var(--radius-lg);
    cursor: pointer;
    overflow: hidden;
    position: relative;
    transition: border-color 0.2s ease;

    &:hover {
      border-color: var(--color-text-tertiary);
      };
    }

  &__size {
    @include FluidFontCaption;
    background: var(--color-background-80);
    border-radius: var(--radius-xs);
    color: var(--color-text-secondary);
    left: var(--spacing-xs);
    padding: var(--spacing-3xs) var(--spacing-xs);
    position: absolute;
    top: var(--spacing-xs);
    z-index: 1;
  }

  &__image {

    height: 100%;

    object-fit: cover;

    width: 100%;

  }

  &__hint {
    @include FluidFontCaption;

    color: var(--color-text-tertiary);

    };

  }
</style>
