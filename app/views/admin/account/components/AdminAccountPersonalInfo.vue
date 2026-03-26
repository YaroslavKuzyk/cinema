<template>
  <AppCard
    :title="$t('ADMIN_ACCOUNT_PERSONAL_INFO')"
    :subtitle="$t('ADMIN_ACCOUNT_PERSONAL_INFO_SUBTITLE')"
  >
    <div class="admin-account-personal-info">
      <div class="admin-account-personal-info__row">
        <AppInput
          :label="$t('FIRST_NAME')"
          :model-value="modelValue.firstName"
          :placeholder="$t('FIRST_NAME_PLACEHOLDER')"
          :disabled="readonly"
          @update:model-value="updateField('firstName', $event)"
        />
        <AppInput
          :label="$t('LAST_NAME')"
          :model-value="modelValue.lastName"
          :placeholder="$t('LAST_NAME_PLACEHOLDER')"
          :disabled="readonly"
          @update:model-value="updateField('lastName', $event)"
        />
      </div>
      <div class="admin-account-personal-info__row">
        <AppInput
          :label="$t('EMAIL')"
          :model-value="modelValue.email"
          :placeholder="$t('EMAIL_PLACEHOLDER')"
          :disabled="readonly"
          @update:model-value="updateField('email', $event)"
        />
        <AppInput
          :label="$t('ADMIN_ACCOUNT_PHONE')"
          :model-value="modelValue.phone"
          :placeholder="$t('ADMIN_ACCOUNT_PHONE_PLACEHOLDER')"
          :disabled="readonly"
          @update:model-value="updateField('phone', $event)"
        />
      </div>
      <div class="admin-account-personal-info__row">
        <AppInput
          :label="$t('ADMIN_ACCOUNT_ABOUT')"
          :model-value="modelValue.about"
          :placeholder="$t('ADMIN_ACCOUNT_ABOUT_PLACEHOLDER')"
          :disabled="readonly"
          @update:model-value="updateField('about', $event)"
        />
      </div>
      <div v-if="!readonly" class="admin-account-personal-info__actions">
        <AppButton size="small" :icon-left="Check" @click="$emit('save')">
          {{ $t('ADMIN_ACCOUNT_SAVE') }}
        </AppButton>
      </div>
    </div>
  </AppCard>
</template>

<script setup lang="ts">
import { Check } from 'lucide-vue-next'
import type { IAdminAccountPersonalInfo } from '../domain'

interface Props {
  modelValue: IAdminAccountPersonalInfo
  readonly?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  readonly: true,
})

const emit = defineEmits<{
  'update:modelValue': [value: IAdminAccountPersonalInfo]
  save: []
}>()

const updateField = (field: keyof IAdminAccountPersonalInfo, value: string) => {
  emit('update:modelValue', { ...props.modelValue, [field]: value })
}
</script>

<style lang="scss" scoped>
.admin-account-personal-info {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-md);

  &__row {
    display: flex;
    gap: var(--spacing-md);
  }

  &__actions {
    display: flex;
    gap: var(--spacing-md);
    justify-content: flex-end;
  }
}
</style>
