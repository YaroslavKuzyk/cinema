<template>
  <div class="plan-form-header">
    <div class="plan-form-header__left">
      <AppButton variant="secondary" size="small" square :icon-left="ArrowLeft" @click="navigateTo('/admin/plans')" />
      <div class="plan-form-header__text"><h1>{{ $t(`ADMIN_PLAN_FORM_TITLE_${mode.toUpperCase()}`) }}</h1><p>{{ $t('ADMIN_PLAN_FORM_SUBTITLE') }}</p></div>
    </div>
    <div v-if="!isReadonly" class="plan-form-header__actions">
      <AppButton size="medium" :icon-left="Check" @click="$emit('save')">{{ $t('ADMIN_PLAN_FORM_SAVE') }}</AppButton>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ArrowLeft, Check } from 'lucide-vue-next'
import type { PlanFormMode } from '../domain'
defineProps<{ mode: PlanFormMode; isReadonly: boolean }>()
defineEmits<{ save: [] }>()
</script>
<style lang="scss" scoped>
.plan-form-header {
  align-items: center;
  display: flex;
  justify-content: space-between;

  &__left { align-items: center;
  display: flex;
  gap: var(--spacing-sm);
}

  &__text {
    display: flex;
    flex-direction: column;
    gap: var(--spacing-3xs);

    h1 { @include FluidFontH2;
    color: var(--color-white);
    }

 p { @include FluidFontCaption;
    color: var(--color-text-secondary);
    };
  }

  &__actions {
    display: flex;
    gap: var(--spacing-sm);
    };
  }
</style>
