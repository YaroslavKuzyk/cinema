<!-- eslint-disable vue/no-mutating-props -->
<template>
  <div class="user-sidebar">
    <div class="user-sidebar__preview">
      <AppAvatar :initials="initials" size="large" />
      <h3>{{ form.firstName || '—' }} {{ form.lastName }}</h3>
      <span class="user-sidebar__email">{{ form.email || '—' }}</span>
      <AppBadge :variant="getStatusVariant(form.status)" read-only>{{ getStatusLabel(form.status) }}</AppBadge>
    </div>

    <AppCard :title="$t('ADMIN_USER_FORM_STATUS_TITLE')">
      <div class="user-sidebar__settings">
        <AppSelect v-model="form.status" :options="statusOptions" item-title="title" item-value="value" :label="$t('ADMIN_USERS_COL_STATUS')" :disabled="readonly" />
      </div>
      <div v-if="!readonly" class="user-sidebar__actions">
        <AppButton size="medium" variant="primary" @click="$emit('save')">{{ $t('ADMIN_USER_FORM_SAVE') }}</AppButton>
      </div>
    </AppCard>

    <AppCard v-if="!isCreate" :title="$t('ADMIN_USER_FORM_ACTIVITY')">
      <div class="user-sidebar__activity">
        <div class="user-sidebar__activity-row"><span>{{ $t('ADMIN_USER_FORM_WATCHED') }}</span><strong>{{ activityStats.watchedHours }}{{ $t('ADMIN_USERS_HOURS_SHORT') }}</strong></div>
        <div class="user-sidebar__activity-row"><span>{{ $t('ADMIN_USER_FORM_FAV_GENRE') }}</span><strong>{{ activityStats.favoriteGenre }}</strong></div>
        <div class="user-sidebar__activity-row"><span>{{ $t('ADMIN_USER_FORM_WATCHLIST') }}</span><strong>{{ activityStats.watchlistCount }}</strong></div>
        <div class="user-sidebar__activity-row"><span>{{ $t('ADMIN_USER_FORM_COMMENTS') }}</span><strong>{{ activityStats.commentsCount }}</strong></div>
        <div class="user-sidebar__activity-row"><span>{{ $t('ADMIN_USER_FORM_RATINGS') }}</span><strong>{{ activityStats.ratingsCount }}</strong></div>
        <div class="user-sidebar__activity-row"><span>{{ $t('ADMIN_USER_FORM_LAST_ACTIVE') }}</span><strong>{{ activityStats.lastActive }}</strong></div>
      </div>
    </AppCard>
  </div>
</template>
<script setup lang="ts">
import type { IUserForm, IUserActivityStats } from '../domain'
const { t } = useI18n()
const props = defineProps<{ form: IUserForm; readonly: boolean; isCreate: boolean; activityStats: IUserActivityStats; statusOptions: { title: string; value: string }[] }>()
defineEmits<{ save: [] }>()
const initials = computed(() => `${props.form.firstName?.[0] || ''}${props.form.lastName?.[0] || ''}`)
const getStatusVariant = (s: string) => ({ active: 'success', banned: 'danger', inactive: 'basic' }[s] || 'basic')
const getStatusLabel = (s: string) => ({ active: t('ADMIN_USERS_STATUS_ACTIVE'), banned: t('ADMIN_USERS_STATUS_BANNED'), inactive: t('ADMIN_USERS_STATUS_INACTIVE') }[s] || s)
</script>
<style lang="scss" scoped>
.user-sidebar { display: flex; flex-direction: column; gap: var(--spacing-lg); width: var(--container-md);

  &__preview {

    align-items: center;

    background: var(--color-surface);

    border: 1px solid var(--color-border);

    border-radius: var(--radius-xl);

    display: flex;

    flex-direction: column;

    gap: var(--spacing-sm);

    padding: var(--spacing-xl);

    h3 { @include FluidFontBodyMd;

    color: var(--color-white);

    font-weight: 600;

    };

  }

  &__email {
    @include FluidFontCaption;
    color: var(--color-text-tertiary);
  }

  &__badges {
    display: flex;
    gap: var(--spacing-xs);
  }

  &__settings {
    display: flex;
    flex-direction: column;
    gap: var(--spacing-md);
  }

  &__actions {
    display: flex;
    flex-direction: column;
    gap: var(--spacing-xs);
    margin-top: var(--spacing-md);
  }

  &__activity {
    display: flex;
    flex-direction: column;
    gap: var(--spacing-sm);
  }

  &__activity-row {
    @include FluidFontCaption;

    display: flex;

    justify-content: space-between;

    span { color: var(--color-text-tertiary);

    }

 strong { color: var(--color-text-primary);

    } };

  }
</style>
