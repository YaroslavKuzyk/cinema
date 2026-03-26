<template>
  <AppCard>
    <template #header>
      <h3 class="admin-account-danger-zone__title">
        {{ $t('ADMIN_ACCOUNT_DANGER_ZONE') }}
      </h3>
    </template>
    <div class="admin-account-danger-zone__actions">
      <AppButton variant="error" size="medium" @click="$emit('logoutAll')">
        {{ $t('ADMIN_ACCOUNT_LOGOUT_ALL') }}
      </AppButton>
      <AppButton variant="secondary" size="medium" @click="$emit('deactivate')">
        {{ $t('ADMIN_ACCOUNT_DEACTIVATE') }}
      </AppButton>
    </div>
  </AppCard>
</template>

<script setup lang="ts">
defineEmits<{
  logoutAll: []
  deactivate: []
}>()
</script>

<style lang="scss" scoped>
.admin-account-danger-zone {
  &__title {
    @include FluidFontBodyMd;
    color: var(--color-primary);
    font-weight: 600;
    margin: 0;
  }

  &__actions {
    display: flex;
    flex-direction: column;
    gap: var(--spacing-sm);
  }
}
</style>
