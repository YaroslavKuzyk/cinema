<template>
  <div class="admin-movies-header">
    <div class="admin-movies-header__text">
      <h1>{{ $t('ADMIN_MOVIES_TITLE') }}</h1>
      <p>{{ $t('ADMIN_MOVIES_SUBTITLE') }}</p>
    </div>
    <div class="admin-movies-header__actions">
      <AppButton size="medium" :icon-left="Plus" @click="$emit('create')">{{ $t('ADMIN_MOVIES_CREATE') }}</AppButton>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Plus } from 'lucide-vue-next'
defineEmits<{ create: [] }>()
</script>

<style lang="scss" scoped>
.admin-movies-header {
  align-items: center;
  display: flex;
  justify-content: space-between;

  &__text { display: flex;
  flex-direction: column;
  gap: var(--spacing-2xs);

  h1 { @include FluidFontH2;
  color: var(--color-white);
  }

 p { @include FluidFontBodySm;
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
