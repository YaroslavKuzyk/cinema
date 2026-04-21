<template>
  <AppCard
    :title="$t('ADMIN_ACCOUNT_NOTIFICATIONS')"
    :subtitle="$t('ADMIN_ACCOUNT_NOTIFICATIONS_SUBTITLE')"
  >
    <div class="admin-account-notifications">
      <div class="admin-account-notifications__toggle-row">
        <div class="admin-account-notifications__toggle-left">
          <div>
            <p>{{ $t('ADMIN_ACCOUNT_EMAIL_NOTIFICATIONS') }}</p>
            <span>{{ $t('ADMIN_ACCOUNT_EMAIL_NOTIFICATIONS_DESCRIPTION') }}</span>
          </div>
        </div>
        <div class="admin-account-notifications__toggle-action">
          <AppToggle
            :model-value="modelValue.emailNotifications"
            :disabled="readonly"
            @update:model-value="updateField('emailNotifications', $event)"
          />
        </div>
      </div>

      <div class="admin-account-notifications__toggle-row">
        <div class="admin-account-notifications__toggle-left">
          <div>
            <p>{{ $t('ADMIN_ACCOUNT_PUSH_NOTIFICATIONS') }}</p>
            <span>{{ $t('ADMIN_ACCOUNT_PUSH_NOTIFICATIONS_DESCRIPTION') }}</span>
          </div>
        </div>
        <div class="admin-account-notifications__toggle-action">
          <AppToggle
            :model-value="modelValue.pushNotifications"
            :disabled="readonly"
            @update:model-value="updateField('pushNotifications', $event)"
          />
        </div>
      </div>

      <div class="admin-account-notifications__toggle-row">
        <div class="admin-account-notifications__toggle-left">
          <div>
            <p>{{ $t('ADMIN_ACCOUNT_DAILY_DIGEST') }}</p>
            <span>{{ $t('ADMIN_ACCOUNT_DAILY_DIGEST_DESCRIPTION') }}</span>
          </div>
        </div>
        <div class="admin-account-notifications__toggle-action">
          <AppToggle
            :model-value="modelValue.dailyDigest"
            :disabled="readonly"
            @update:model-value="updateField('dailyDigest', $event)"
          />
        </div>
      </div>

      <div class="admin-account-notifications__toggle-row">
        <div class="admin-account-notifications__toggle-left">
          <div>
            <p>{{ $t('ADMIN_ACCOUNT_MARKETING_EMAILS') }}</p>
            <span>{{ $t('ADMIN_ACCOUNT_MARKETING_EMAILS_DESCRIPTION') }}</span>
          </div>
        </div>
        <div class="admin-account-notifications__toggle-action">
          <AppToggle
            :model-value="modelValue.marketingEmails"
            :disabled="readonly"
            @update:model-value="updateField('marketingEmails', $event)"
          />
        </div>
      </div>

      <div v-if="!readonly" class="admin-account-notifications__actions">
        <AppButton size="small" :icon-left="Check" @click="$emit('save')">
          {{ $t('ADMIN_ACCOUNT_SAVE') }}
        </AppButton>
      </div>
    </div>
  </AppCard>
</template>

<script setup lang="ts">
import { Check } from 'lucide-vue-next'
import type { IAdminAccountNotifications } from '../domain'

interface Props {
  modelValue: IAdminAccountNotifications
  readonly?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  readonly: true,
})

const emit = defineEmits<{
  'update:modelValue': [value: IAdminAccountNotifications]
  save: []
}>()

const updateField = <K extends keyof IAdminAccountNotifications>(
  field: K,
  value: IAdminAccountNotifications[K]
) => {
  emit('update:modelValue', { ...props.modelValue, [field]: value })
}
</script>

<style lang="scss" scoped>
.admin-account-notifications {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-md);

  &__toggle-row {
    align-items: center;
    display: flex;
    gap: var(--spacing-md);
    justify-content: space-between;
  }

  &__toggle-left {
    align-items: center;
    display: flex;
    gap: var(--spacing-sm);

    div {
      display: flex;
      flex-direction: column;
      gap: var(--spacing-3xs);
    }

    span {
      @include FluidFontBodySm;

      color: var(--color-text-tertiary);

    }
  }

  &__actions {
    display: flex;
    gap: var(--spacing-md);
    justify-content: flex-end;
  }
}
</style>
