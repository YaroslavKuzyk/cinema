<!-- eslint-disable vue/no-mutating-props -->
<template>
  <AppCard :title="$t('ADMIN_GENRE_FORM_BASIC_TITLE')" :subtitle="$t('ADMIN_GENRE_FORM_BASIC_SUBTITLE')">
    <template #icon>✏️</template>
    <div class="genre-basic">
      <div class="genre-basic__row">
        <AppInput v-model="form.name" :label="$t('ADMIN_GENRE_FORM_NAME') + ' *'" :readonly="readonly" @blur="$emit('generateSlug')" />
        <AppInput v-model="form.slug" :label="$t('ADMIN_GENRE_FORM_SLUG') + ' *'" :readonly="readonly" />
      </div>
      <AppTextarea v-model="form.description" :label="$t('ADMIN_GENRE_FORM_DESCRIPTION') + ' *'" :readonly="readonly" :rows="3" />
      <div class="genre-basic__row">
        <div class="genre-basic__icon-section">
          <label class="genre-basic__label">{{ $t('ADMIN_GENRE_FORM_ICON') }}</label>
          <div class="genre-basic__icons">
            <button
              v-for="icon in iconOptions"
              :key="icon"
              class="genre-basic__icon-btn"
              :class="{ 'genre-basic__icon-btn--active': form.icon === icon }"
              :disabled="readonly"
              @click="form.icon = icon"
            >{{ icon }}</button>
          </div>
        </div>
      </div>
      <AppColorPicker
        v-model="form.color"
        :colors="colorPresets"
        :label="$t('ADMIN_GENRE_FORM_COLOR')"
        :disabled="readonly"
        show-input
      />
    </div>
  </AppCard>
</template>

<script setup lang="ts">
import type { IGenreForm } from '../domain'
defineProps<{ form: IGenreForm; readonly: boolean; iconOptions: string[]; colorPresets: string[] }>()
defineEmits<{ generateSlug: [] }>()
</script>

<style lang="scss" scoped>
.genre-basic {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-md);

  &__row { display: flex;
  gap: var(--spacing-md);

  > * { flex: 1;
  };
}

  &__label {
    @include FluidFontLabel;
    color: var(--color-text-secondary);
    text-transform: uppercase;
  }

  &__icon-section {
    display: flex;
    flex-direction: column;
    gap: var(--spacing-sm);
  }

  &__icons {
    display: flex;
    flex-wrap: wrap;
    gap: var(--spacing-xs);
  }

  &__icon-btn {
    align-items: center; background: var(--color-divider); border: 2px solid transparent; border-radius: var(--radius-md);
    cursor: pointer; display: flex; font-size: fluid(18px, 24px); height: fluid(38px, 46px); justify-content: center;
    transition: all 0.2s ease; width: fluid(38px, 46px);
    &:hover:not(:disabled) { border-color: var(--color-text-tertiary); }

    &--active {
      background: var(--color-primary-bg);
      border-color: var(--color-primary);
    }

    &:disabled {
      cursor: default;
      opacity: 0.6;
      };
    }
}
</style>
