<template>
  <div class="dash-header">
    <div class="dash-header__text"><h1>{{ $t('ADMIN_DASH_TITLE') }}</h1><p>{{ $t('ADMIN_DASH_SUBTITLE') }}</p></div>
    <div class="dash-header__actions">
      <AppButton variant="secondary" size="medium" :icon-left="Download" @click="$emit('export')">{{ $t('ADMIN_DASH_EXPORT') }}</AppButton>
      <AppButton size="medium" :icon-left="Plus" @click="$emit('create')">{{ $t('ADMIN_DASH_ADD_CONTENT') }}</AppButton>
    </div>
  </div>
</template>
<script setup lang="ts">
import { Download, Plus } from 'lucide-vue-next'
defineEmits<{ export: []; create: [] }>()
</script>
<style lang="scss" scoped>
.dash-header {
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
    display: flex;
    gap: var(--spacing-sm);
    };
  }
</style>
