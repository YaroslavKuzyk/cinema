<template>
  <div class="admin-user-form-page">
    <AdminUserFormHeader :mode="mode" :is-readonly="isReadonly" @save="save" />
    <div class="admin-user-form-page__layout">
      <div class="admin-user-form-page__content">
        <AdminUserFormBasicInfo :form="form" :readonly="isReadonly" :country-options="countryOptions" :language-options="languageOptions" />
        <AdminUserFormSubscription :form="form" :readonly="isReadonly" :plan-options="planOptions" :duration-options="durationOptions" />
      </div>
      <div class="admin-user-form-page__sidebar">
        <AdminUserFormSidebar :form="form" :readonly="isReadonly" :is-create="isCreate" :activity-stats="activityStats" :status-options="statusOptions" @save="save" />
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { AdminUserFormHeader, AdminUserFormBasicInfo, AdminUserFormSubscription, AdminUserFormSidebar } from '../components'
import { useAdminUserForm } from '../composables'
import type { UserFormMode } from '../domain'
const props = defineProps<{ mode: UserFormMode }>()
const modeRef = computed(() => props.mode)
const { form, isReadonly, isCreate, activityStats, statusOptions, countryOptions, languageOptions, planOptions, durationOptions, save } = useAdminUserForm(modeRef)
</script>
<style lang="scss" scoped>
.admin-user-form-page {
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
