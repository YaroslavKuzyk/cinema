<template>
  <AppCard>
    <template #header>
      <div class="admin-settings-danger__header">
        <h3 class="admin-settings-danger__title">{{ $t('ADMIN_SETTINGS_DANGER_TITLE') }}</h3>
        <p class="admin-settings-danger__subtitle">{{ $t('ADMIN_SETTINGS_DANGER_SUBTITLE') }}</p>
      </div>
    </template>
    <div class="admin-settings-danger">
      <div class="admin-settings-danger__row">
        <div class="admin-settings-danger__info">
          <p>{{ $t('ADMIN_SETTINGS_DANGER_MAINTENANCE') }}</p>
          <span>{{ $t('ADMIN_SETTINGS_DANGER_MAINTENANCE_DESC') }}</span>
        </div>
        <AppButton variant="ghost" size="small" @click="$emit('maintenance')">
          {{ $t('ADMIN_SETTINGS_DANGER_MAINTENANCE_BTN') }}
        </AppButton>
      </div>

      <div class="admin-settings-danger__row">
        <div class="admin-settings-danger__info">
          <p>{{ $t('ADMIN_SETTINGS_DANGER_CACHE') }}</p>
          <span>{{ $t('ADMIN_SETTINGS_DANGER_CACHE_DESC') }}</span>
        </div>
        <AppButton variant="error" size="small" @click="$emit('clearCache')">
          {{ $t('ADMIN_SETTINGS_DANGER_CACHE_BTN') }}
        </AppButton>
      </div>

      <div class="admin-settings-danger__row">
        <div class="admin-settings-danger__info">
          <p>{{ $t('ADMIN_SETTINGS_DANGER_RESET') }}</p>
          <span>{{ $t('ADMIN_SETTINGS_DANGER_RESET_DESC') }}</span>
        </div>
        <AppButton variant="error" size="small" @click="$emit('reset')">
          {{ $t('ADMIN_SETTINGS_DANGER_RESET_BTN') }}
        </AppButton>
      </div>
    </div>
  </AppCard>
</template>

<script setup lang="ts">
defineEmits<{
  maintenance: []
  clearCache: []
  reset: []
}>()
</script>

<style lang="scss" scoped>
.admin-settings-danger {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-md);

  &__header {
    display: flex;
    flex-direction: column;
    gap: var(--spacing-xs);
  }

  &__title {
    @include FluidFontBodyMd;
    color: var(--color-primary);
    font-weight: 600;
    margin: 0;
  }

  &__subtitle {
    @include FluidFontCaption;
    color: var(--color-text-secondary);
    margin: 0;
  }

  &__row {
    align-items: center;
    display: flex;
    gap: var(--spacing-md);
    justify-content: space-between;
  }

  &__info {
    display: flex;
    flex-direction: column;
    gap: var(--spacing-3xs);

    span {
      @include FluidFontBodySm;

      color: var(--color-text-tertiary);

    }
  }
}
</style>
