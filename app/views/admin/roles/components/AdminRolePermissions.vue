<template>
  <div class="admin-role-permissions">
    <div
      v-for="group in permissionGroups"
      :key="group.title"
      class="admin-role-permissions__group"
    >
      <span class="admin-role-permissions__group-title">{{ group.title }}</span>
      <div class="admin-role-permissions__list">
        <div
          v-for="permission in group.permissions"
          :key="permission.key"
          class="admin-role-permissions__item"
          :class="{ 'admin-role-permissions__item--disabled': !permission.enabled }"
        >
          <AppCheckbox :model-value="permission.enabled" variant="success" disabled />
          <span>{{ permission.label }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { IRolePermissionGroup } from '../domain'

defineProps<{
  permissionGroups: IRolePermissionGroup[]
}>()
</script>

<style lang="scss" scoped>
.admin-role-permissions {
  display: grid;
  gap: var(--spacing-lg);
  grid-template-columns: repeat(6, 1fr);
  padding: var(--spacing-lg) 0;

  @media (width <= 1200px) {
    grid-template-columns: repeat(3, 1fr);
  }

  @media (width <= 768px) {
    grid-template-columns: repeat(2, 1fr);
  }

  &__group {
    display: flex;
    flex-direction: column;
    gap: var(--spacing-sm);
  }

  &__group-title {
    @include FluidFontCaption;
    color: var(--color-text-tertiary);
    letter-spacing: 0.5px;
    text-transform: uppercase;
  }

  &__list {
    display: flex;
    flex-direction: column;
    gap: var(--spacing-xs);
  }

  &__item {
    @include FluidFontBodySm;
    align-items: center;
    color: var(--color-white);
    display: flex;
    gap: var(--spacing-xs);

    &--disabled {

      color: var(--color-text-tertiary);

      };

    }

}
</style>
