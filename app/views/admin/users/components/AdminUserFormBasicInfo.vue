<!-- eslint-disable vue/no-mutating-props -->
<template>
  <AppCard :title="$t('ADMIN_USER_FORM_PERSONAL')" :subtitle="$t('ADMIN_USER_FORM_PERSONAL_DESC')">
    <template #icon>👤</template>
    <div class="user-basic">
      <div class="user-basic__row">
        <AppInput v-model="form.firstName" :label="$t('ADMIN_USER_FORM_FIRST_NAME') + ' *'" :readonly="readonly" />
        <AppInput v-model="form.lastName" :label="$t('ADMIN_USER_FORM_LAST_NAME') + ' *'" :readonly="readonly" />
      </div>
      <div class="user-basic__row">
        <AppInput v-model="form.email" :label="$t('ADMIN_USER_FORM_EMAIL') + ' *'" :readonly="readonly" type="email" />
        <AppInput v-model="form.phone" :label="$t('ADMIN_USER_FORM_PHONE')" :readonly="readonly" />
      </div>
      <div class="user-basic__row">
        <AppSelect v-model="form.country" :options="countryOptions" item-title="title" item-value="value" :label="$t('ADMIN_USER_FORM_COUNTRY')" :disabled="readonly" />
        <AppSelect v-model="form.language" :options="languageOptions" item-title="title" item-value="value" :label="$t('ADMIN_USER_FORM_LANGUAGE')" :disabled="readonly" />
      </div>
      <AppTextarea v-model="form.bio" :label="$t('ADMIN_USER_FORM_BIO')" :readonly="readonly" :rows="3" />
    </div>
  </AppCard>
</template>
<script setup lang="ts">
import type { IUserForm } from '../domain'
defineProps<{ form: IUserForm; readonly: boolean; countryOptions: { title: string; value: string }[]; languageOptions: { title: string; value: string }[] }>()
</script>
<style lang="scss" scoped>
.user-basic {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-md);

  &__row { display: flex;
  gap: var(--spacing-md);

  > * { flex: 1;
  } };
}
</style>
