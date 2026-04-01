<template>
  <AppCard :title="$t('ADMIN_ACCOUNT_ACTIVITY')">
    <AdminActivityList :activities="activities" />
  </AppCard>
</template>

<script setup lang="ts">
import type { IAdminActivity } from '../domain'

interface Props {
  activities: IAdminActivity[]
}

defineProps<Props>()
</script>
