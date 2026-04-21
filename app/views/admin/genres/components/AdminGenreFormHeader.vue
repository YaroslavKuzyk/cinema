<template>
  <div class="admin-genre-form-header">
    <div class="admin-genre-form-header__left">
      <AppButton variant="secondary" size="small" square :icon-left="ArrowLeft" @click="navigateTo('/admin/genres')" />
      <div class="admin-genre-form-header__text">
        <h1>{{ $t(`ADMIN_GENRE_FORM_TITLE_${mode.toUpperCase()}`) }}</h1>
        <p>{{ $t('ADMIN_GENRE_FORM_SUBTITLE') }}</p>
      </div>
    </div>
    <div v-if="!isReadonly" class="admin-genre-form-header__actions">
      <AppButton variant="secondary" size="medium" @click="$emit('save')">
        {{ $t('ADMIN_GENRE_FORM_SAVE') }}
      </AppButton>
      <AppButton size="medium" :icon-left="Check" @click="$emit('publish')">
        {{ $t('ADMIN_GENRE_FORM_PUBLISH') }}
      </AppButton>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ArrowLeft, Check } from 'lucide-vue-next'
import type { GenreFormMode } from '../domain'
defineProps<{ mode: GenreFormMode; isReadonly: boolean }>()
defineEmits<{ save: []; publish: [] }>()
</script>

<style lang="scss" scoped>
.admin-genre-form-header {
  align-items: center;
  display: flex;
  justify-content: space-between;

  &__left { align-items: center;
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
    };
  }
</style>
