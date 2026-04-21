<template>
  <AppCard
    :title="$t('ADMIN_SETTINGS_GENERAL_TITLE')"
    :subtitle="$t('ADMIN_SETTINGS_GENERAL_SUBTITLE')"
  >
    <div class="admin-settings-general">
      <div class="admin-settings-general__row">
        <AppInput
          :model-value="modelValue.platformName"
          :label="$t('ADMIN_SETTINGS_GENERAL_PLATFORM_NAME')"
          @update:model-value="updateField('platformName', $event)"
        />
        <AppInput
          :model-value="modelValue.domain"
          :label="$t('ADMIN_SETTINGS_GENERAL_DOMAIN')"
          @update:model-value="updateField('domain', $event)"
        />
      </div>
      <div class="admin-settings-general__row">
        <AppSelect
          :model-value="modelValue.defaultLanguage"
          :options="languageOptions"
          item-title="title"
          item-value="value"
          :label="$t('ADMIN_SETTINGS_GENERAL_LANGUAGE')"
          @update:model-value="updateField('defaultLanguage', $event)"
        />
        <AppSelect
          :model-value="modelValue.timezone"
          :options="timezoneOptions"
          item-title="title"
          item-value="value"
          :label="$t('ADMIN_SETTINGS_GENERAL_TIMEZONE')"
          @update:model-value="updateField('timezone', $event)"
        />
      </div>
      <AppTextarea
        :model-value="modelValue.seoDescription"
        :label="$t('ADMIN_SETTINGS_GENERAL_SEO')"
        :placeholder="$t('ADMIN_SETTINGS_GENERAL_SEO_PLACEHOLDER')"
        :rows="3"
        @update:model-value="updateField('seoDescription', $event)"
      />
    </div>
  </AppCard>
</template>

<script setup lang="ts">
import type { ISettingsGeneral } from '../domain'

interface Props {
  modelValue: ISettingsGeneral
  languageOptions: { title: string; value: string }[]
  timezoneOptions: { title: string; value: string }[]
}

const props = defineProps<Props>()

const emit = defineEmits<{
  'update:modelValue': [value: ISettingsGeneral]
}>()

const updateField = <K extends keyof ISettingsGeneral>(field: K, value: ISettingsGeneral[K]) => {
  emit('update:modelValue', { ...props.modelValue, [field]: value })
}
</script>

<style lang="scss" scoped>
.admin-settings-general {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-md);

  &__row {
    display: flex;
    gap: var(--spacing-md);

    > * {
      flex: 1;
    }
  }
}
</style>
