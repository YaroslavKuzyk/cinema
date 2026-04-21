<template>
  <div class="admin-plan-form-page">
    <AdminPlanFormHeader :mode="mode" :is-readonly="isReadonly" @save="save" />
    <div class="admin-plan-form-page__layout">
      <div class="admin-plan-form-page__content">
        <AdminPlanFormBasicInfo :form="form" :readonly="isReadonly" :icon-options="iconOptions" :color-presets="colorPresets" :interval-options="intervalOptions" :currency-options="currencyOptions" />
        <AdminPlanFormFeatures :feature-categories="featureCategories" :get-feature-value="getFeatureValue" :readonly="isReadonly" @toggle-feature="toggleFeature" @update-feature-value="updateFeatureValue" />
      </div>
      <div class="admin-plan-form-page__sidebar">
        <AdminPlanFormSidebar :form="form" :readonly="isReadonly" :status-options="statusOptions" :system-features="systemFeatures" @save="save" />
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { AdminPlanFormHeader, AdminPlanFormBasicInfo, AdminPlanFormFeatures, AdminPlanFormSidebar } from '../components'
import { useAdminPlanForm } from '../composables'
import type { PlanFormMode } from '../domain'
const props = defineProps<{ mode: PlanFormMode }>()
const modeRef = computed(() => props.mode)
const { form, isReadonly, systemFeatures, featureCategories, getFeatureValue, toggleFeature, updateFeatureValue, colorPresets, iconOptions, intervalOptions, currencyOptions, statusOptions, save } = useAdminPlanForm(modeRef)
</script>
<style lang="scss" scoped>
.admin-plan-form-page {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-lg);

  &__layout { display: flex;
  gap: var(--spacing-xl);
}

  &__content {
    display: flex;
    flex: 1;
    flex-direction: column;
    gap: var(--spacing-lg);
  }

  &__sidebar {
    flex-shrink: 0;
    width: var(--container-md);
    };
  }
</style>
