<template>
  <div class="admin-admins-header">
    <div class="admin-admins-header__text">
      <h1>{{ $t("ADMIN_ADMINS_TITLE") }}</h1>
      <p>{{ $t("ADMIN_ADMINS_SUBTITLE") }}</p>
    </div>
    <div class="admin-admins-header__actions">
      <AppButton size="medium" :icon-left="UserPlus" @click="$emit('invite')">
        {{ $t("ADMIN_ADMINS_INVITE") }}
      </AppButton>
    </div>
  </div>
</template>

<script setup lang="ts">
import { UserPlus } from "lucide-vue-next";

defineEmits<{
  invite: [];
}>();
</script>

<style lang="scss" scoped>
.admin-admins-header {
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
