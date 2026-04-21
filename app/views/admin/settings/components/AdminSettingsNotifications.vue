<template>
  <AppCard
    :title="$t('ADMIN_SETTINGS_NOTIFICATIONS_TITLE')"
    :subtitle="$t('ADMIN_SETTINGS_NOTIFICATIONS_SUBTITLE')"
  >
    <div class="admin-settings-notifications">
      <div class="admin-settings-notifications__row">
        <div class="admin-settings-notifications__info">
          <p>{{ $t('ADMIN_SETTINGS_NOTIFICATIONS_EMAIL_CONTENT') }}</p>
          <span>{{ $t('ADMIN_SETTINGS_NOTIFICATIONS_EMAIL_CONTENT_DESC') }}</span>
        </div>
        <AppToggle
          :model-value="modelValue.emailOnNewContent"
          @update:model-value="updateField('emailOnNewContent', $event)"
        />
      </div>

      <div class="admin-settings-notifications__row">
        <div class="admin-settings-notifications__info">
          <p>{{ $t('ADMIN_SETTINGS_NOTIFICATIONS_EMAIL_COMPLAINTS') }}</p>
          <span>{{ $t('ADMIN_SETTINGS_NOTIFICATIONS_EMAIL_COMPLAINTS_DESC') }}</span>
        </div>
        <AppToggle
          :model-value="modelValue.emailOnComplaints"
          @update:model-value="updateField('emailOnComplaints', $event)"
        />
      </div>

      <div class="admin-settings-notifications__row">
        <div class="admin-settings-notifications__info">
          <p>{{ $t('ADMIN_SETTINGS_NOTIFICATIONS_DAILY_REPORT') }}</p>
          <span>{{ $t('ADMIN_SETTINGS_NOTIFICATIONS_DAILY_REPORT_DESC') }}</span>
        </div>
        <AppToggle
          :model-value="modelValue.dailyReport"
          @update:model-value="updateField('dailyReport', $event)"
        />
      </div>

      <div class="admin-settings-notifications__row">
        <div class="admin-settings-notifications__info">
          <p>{{ $t('ADMIN_SETTINGS_NOTIFICATIONS_PUSH') }}</p>
          <span>{{ $t('ADMIN_SETTINGS_NOTIFICATIONS_PUSH_DESC') }}</span>
        </div>
        <AppToggle
          :model-value="modelValue.pushNotifications"
          @update:model-value="updateField('pushNotifications', $event)"
        />
      </div>

      <div class="admin-settings-notifications__row">
        <div class="admin-settings-notifications__info">
          <p>{{ $t('ADMIN_SETTINGS_NOTIFICATIONS_ERRORS') }}</p>
          <span>{{ $t('ADMIN_SETTINGS_NOTIFICATIONS_ERRORS_DESC') }}</span>
        </div>
        <AppToggle
          :model-value="modelValue.errorNotifications"
          @update:model-value="updateField('errorNotifications', $event)"
        />
      </div>
    </div>
  </AppCard>
</template>

<script setup lang="ts">
import type { ISettingsNotifications } from '../domain'

const props = defineProps<{
  modelValue: ISettingsNotifications
}>()

const emit = defineEmits<{
  'update:modelValue': [value: ISettingsNotifications]
}>()

const updateField = <K extends keyof ISettingsNotifications>(field: K, value: ISettingsNotifications[K]) => {
  emit('update:modelValue', { ...props.modelValue, [field]: value })
}
</script>

<style lang="scss" scoped>
.admin-settings-notifications {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-md);

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
