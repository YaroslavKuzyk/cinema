<!-- eslint-disable vue/no-mutating-props -->
<template>
  <AppCard :title="$t('ADMIN_USER_FORM_SUBSCRIPTION')" :subtitle="$t('ADMIN_USER_FORM_SUBSCRIPTION_DESC')">
    <template #icon>💎</template>
    <div class="subscription">
      <div class="subscription__row">
        <AppSelect
          v-model="form.planId"
          :options="planOptions"
          item-title="title"
          item-value="value"
          :label="$t('ADMIN_USER_FORM_PLAN')"
          :disabled="readonly"
        />
        <AppSelect
          v-model="form.planDuration"
          :options="durationOptions"
          item-title="title"
          item-value="value"
          :label="$t('ADMIN_USER_FORM_PLAN_DURATION')"
          :disabled="readonly || !form.planId"
        />
      </div>
      <AppDatePicker v-if="form.planId" v-model="premiumDate" :label="$t('ADMIN_USER_FORM_PREMIUM_UNTIL')" :placeholder="$t('ADMIN_USER_FORM_PREMIUM_UNTIL_PLACEHOLDER')" :disabled="readonly" />
      <div class="subscription__toggle-row">
        <span>{{ $t('ADMIN_USER_FORM_EMAIL_VERIFIED') }}</span>
        <AppToggle v-model="form.isEmailVerified" :disabled="readonly" />
      </div>
      <AppTextarea v-model="form.notes" :label="$t('ADMIN_USER_FORM_NOTES')" :readonly="readonly" :rows="2" :placeholder="$t('ADMIN_USER_FORM_NOTES_PLACEHOLDER')" />
    </div>
  </AppCard>
</template>
<script setup lang="ts">
import type { IUserForm } from '../domain'

const premiumDate = ref<Date[] | null>(null)

defineProps<{
  form: IUserForm
  readonly: boolean
  planOptions: { title: string; value: string }[]
  durationOptions: { title: string; value: string }[]
}>()
</script>
<style lang="scss" scoped>
.subscription {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-md);

  &__row { display: flex;
  gap: var(--spacing-md);

  > * { flex: 1;
  };
}

  &__toggle-row {
    align-items: center;
    display: flex;
    justify-content: space-between;

    span { @include FluidFontBodySm;
    color: var(--color-text-primary);
    } };
  }
</style>
