<template>
  <div class="admin-genres-header">
    <div class="admin-genres-header__text">
      <h1>{{ $t('ADMIN_GENRES_TITLE') }}</h1>
      <p>{{ $t('ADMIN_GENRES_SUBTITLE') }}</p>
    </div>
    <div class="admin-genres-header__actions">
      <AppButton size="medium" :icon-left="Plus" @click="$emit('create')">
        {{ $t('ADMIN_GENRES_CREATE') }}
      </AppButton>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Plus } from 'lucide-vue-next'

defineEmits<{
  create: []
}>()
</script>

<style lang="scss" scoped>
.admin-genres-header {
  align-items: center;
  display: flex;
  justify-content: space-between;

  &__text {
    display: flex;
    flex-direction: column;
    gap: var(--spacing-2xs);

    h1 {
      @include FluidFontH2;

      color: var(--color-white);

    }

    p {
      @include FluidFontBodySm;

      color: var(--color-text-secondary);

    }
  }

  &__actions {
    align-items: center;
    display: flex;
    gap: var(--spacing-sm);
  }
}
</style>
