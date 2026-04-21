<template>
  <AppCard :title="$t('ADMIN_MOVIE_FORM_CONTENT_TYPE')" :subtitle="$t('ADMIN_MOVIE_FORM_CONTENT_TYPE_DESC')">
    <template #icon>🎬</template>
    <div class="content-type">
      <button
        class="content-type__option"
        :class="{ 'content-type__option--active': modelValue === 'single' }"
        :disabled="readonly"
        @click="$emit('update:modelValue', 'single')"
      >
        <Film :size="24" />
        <span class="content-type__label">{{ $t('ADMIN_MOVIE_FORM_TYPE_SINGLE') }}</span>
        <span class="content-type__desc">{{ $t('ADMIN_MOVIE_FORM_TYPE_SINGLE_DESC') }}</span>
      </button>
      <button
        class="content-type__option"
        :class="{ 'content-type__option--active': modelValue === 'multi' }"
        :disabled="readonly"
        @click="$emit('update:modelValue', 'multi')"
      >
        <Tv :size="24" />
        <span class="content-type__label">{{ $t('ADMIN_MOVIE_FORM_TYPE_MULTI') }}</span>
        <span class="content-type__desc">{{ $t('ADMIN_MOVIE_FORM_TYPE_MULTI_DESC') }}</span>
      </button>
    </div>
  </AppCard>
</template>

<script setup lang="ts">
import { Film, Tv } from 'lucide-vue-next'
import type { ContentType } from '../domain'
defineProps<{ modelValue: ContentType; readonly: boolean }>()
defineEmits<{ 'update:modelValue': [value: ContentType] }>()
</script>

<style lang="scss" scoped>
.content-type {
  display: flex; gap: var(--spacing-md);

  &__option {
    align-items: center; background: var(--color-divider); border: 2px solid var(--color-border); border-radius: var(--radius-lg); color: var(--color-text-secondary);
    cursor: pointer; display: flex; flex: 1; flex-direction: column; gap: var(--spacing-xs); padding: var(--spacing-lg); transition: all 0.2s ease;
    &:hover:not(:disabled) { border-color: var(--color-text-tertiary); }

    &--active {
      border-color: var(--color-primary);
      color: var(--color-white);
    }

    &:disabled {
      cursor: default;
      opacity: 0.6;
      };
    }

  &__label {
    @include FluidFontBodySm;
    font-weight: 600;
  }

  &__desc {
    @include FluidFontCaption;
    color: var(--color-text-tertiary);
    };
  }
</style>
