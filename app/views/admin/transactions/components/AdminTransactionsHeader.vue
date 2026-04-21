<template>
  <div class="admin-tx-header">
    <div class="admin-tx-header__text"><h1>{{ $t('ADMIN_TX_TITLE') }}</h1><p>{{ $t('ADMIN_TX_SUBTITLE') }}</p></div>
    <div class="admin-tx-header__actions">
      <AppButton variant="secondary" size="medium" :icon-left="Download" @click="$emit('export')">{{ $t('ADMIN_TX_EXPORT') }}</AppButton>
    </div>
  </div>
</template>
<script setup lang="ts">
import { Download } from 'lucide-vue-next'
defineEmits<{ export: [] }>()
</script>
<style lang="scss" scoped>
.admin-tx-header {
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
