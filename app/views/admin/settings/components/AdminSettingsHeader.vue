<template>
  <div class="admin-settings-header">
    <div class="admin-settings-header__text">
      <h1>{{ $t('ADMIN_SETTINGS_TITLE') }}</h1>
      <p>{{ $t('ADMIN_SETTINGS_SUBTITLE') }}</p>
    </div>
    <div class="admin-settings-header__actions">
      <AppButton size="medium" :icon-left="Save" @click="$emit('save')">
        {{ $t('ADMIN_SETTINGS_SAVE') }}
      </AppButton>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Save } from 'lucide-vue-next'

defineEmits<{
  save: []
}>()
</script>

<style lang="scss" scoped>
.admin-settings-header {
  align-items: center;
  display: flex;
  flex-shrink: 0;
  justify-content: space-between;
  padding-bottom: var(--spacing-lg);

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
