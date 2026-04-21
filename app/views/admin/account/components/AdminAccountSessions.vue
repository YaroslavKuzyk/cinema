<template>
  <AppCard
    :title="$t('ADMIN_ACCOUNT_SESSIONS')"
    :subtitle="$t('ADMIN_ACCOUNT_SESSIONS_SUBTITLE')"
  >
    <div class="admin-account-sessions">
      <div
        v-for="session in sessions"
        :key="session.id"
        class="admin-account-sessions__item"
      >
        <div class="admin-account-sessions__left">
          <div class="admin-account-sessions__icon">
            <Smartphone />
          </div>
          <div>
            <p>{{ session.device }} · {{ session.browser }}</p>
            <span>{{ session.location }} · {{ session.ipAddress }} · {{ formatLastActive(session.lastActive) }}</span>
          </div>
        </div>
        <div class="admin-account-sessions__action">
          <AppBadge
            v-if="session.isCurrent"
            variant="success"
            :read-only="true"
          >
            {{ $t('ADMIN_ACCOUNT_SESSION_CURRENT') }}
          </AppBadge>
          <AppBadge
            v-else
            variant="primary"
            :read-only="false"
            @click="$emit('endSession', session.id)"
          >
            {{ $t('ADMIN_ACCOUNT_SESSION_END') }}
          </AppBadge>
        </div>
      </div>
    </div>
  </AppCard>
</template>

<script setup lang="ts">
import { Smartphone } from 'lucide-vue-next'
import type { IAdminSession } from '../domain'

interface Props {
  sessions: IAdminSession[]
}

defineProps<Props>()

defineEmits<{
  endSession: [sessionId: string]
}>()

const { t } = useI18n()

const formatLastActive = (lastActive: string) => {
  if (lastActive === 'now') {
    return t('ADMIN_ACCOUNT_INFO_LAST_LOGIN_NOW')
  }
  if (lastActive.endsWith('h')) {
    const hours = parseInt(lastActive)
    return t('ADMIN_ACCOUNT_ACTIVITY_HOUR_AGO', { count: hours })
  }
  return lastActive
}
</script>

<style lang="scss" scoped>
.admin-account-sessions {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-md);

  &__item {
    align-items: center;
    display: flex;
    gap: var(--spacing-md);
    justify-content: space-between;
  }

  &__left {
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

  &__icon {
    align-items: center;
    background-color: var(--color-white-10);
    border-radius: var(--radius-md);
    color: var(--color-text-tertiary);
    display: flex;
    height: 40px;
    justify-content: center;
    width: 40px;
  }
}
</style>
