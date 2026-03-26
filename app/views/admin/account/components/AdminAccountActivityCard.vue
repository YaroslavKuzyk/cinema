<template>
  <AppCard :title="$t('ADMIN_ACCOUNT_ACTIVITY')">
    <div class="admin-account-activity-card">
      <div
        v-for="activity in activities"
        :key="activity.id"
        class="admin-account-activity-card__item"
      >
        <span
          class="admin-account-activity-card__dot"
          :class="`admin-account-activity-card__dot--${activity.dotColor}`"
        />
        <div class="admin-account-activity-card__content">
          <p>
            <strong>{{ getActivityLabel(activity.type) }}</strong>
            {{ activity.description }}
          </p>
          <span>{{ formatTimestamp(activity.timestamp) }}</span>
        </div>
      </div>
    </div>
  </AppCard>
</template>

<script setup lang="ts">
import type { IAdminActivity, ActivityType } from '../domain'

interface Props {
  activities: IAdminActivity[]
}

defineProps<Props>()

const { t } = useI18n()

const activityLabels: Record<ActivityType, string> = {
  published: 'ADMIN_ACCOUNT_ACTIVITY_PUBLISHED',
  edited: 'ADMIN_ACCOUNT_ACTIVITY_EDITED',
  deleted: 'ADMIN_ACCOUNT_ACTIVITY_DELETED',
  blocked: 'ADMIN_ACCOUNT_ACTIVITY_BLOCKED',
  created: 'ADMIN_ACCOUNT_ACTIVITY_CREATED',
  invited: 'ADMIN_ACCOUNT_ACTIVITY_INVITED',
  updated: 'ADMIN_ACCOUNT_ACTIVITY_UPDATED',
}

const getActivityLabel = (type: ActivityType) => {
  return t(activityLabels[type])
}

const formatTimestamp = (timestamp: string) => {
  if (timestamp.endsWith('m')) {
    const minutes = parseInt(timestamp)
    return t('ADMIN_ACCOUNT_ACTIVITY_MIN_AGO', { count: minutes })
  }
  if (timestamp.endsWith('h')) {
    const hours = parseInt(timestamp)
    return t('ADMIN_ACCOUNT_ACTIVITY_HOUR_AGO', { count: hours })
  }
  if (timestamp.startsWith('yesterday:')) {
    const time = timestamp.replace('yesterday:', '')
    return t('ADMIN_ACCOUNT_ACTIVITY_YESTERDAY', { time })
  }
  return timestamp
}
</script>

<style lang="scss" scoped>
.admin-account-activity-card {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-lg);

  &__item {
    align-items: flex-start;
    display: flex;
    gap: var(--spacing-sm);
  }

  &__dot {
    border-radius: 50%;
    flex-shrink: 0;
    height: 8px;
    margin-top: 6px;
    width: 8px;

    &--success {
      background-color: var(--color-success);
    }

    &--danger {
      background-color: var(--color-primary);
    }

    &--info {
      background-color: var(--color-info);
    }

    &--muted {
      background-color: var(--color-text-tertiary);
    }

    &--purple {
      background-color: var(--color-purple);
    }

    &--warning {
      background-color: var(--color-warning);
    }
  }

  &__content {
    display: flex;
    flex-direction: column;
    gap: var(--spacing-3xs);

    p {
      @include FluidFontBodySm;
      color: var(--color-text-secondary);
      margin: 0;

      strong {
        color: var(--color-white);
        font-weight: 600;
      }
    }

    span {
      @include FluidFontCaption;
      color: var(--color-text-tertiary);
    }
  }
}
</style>
