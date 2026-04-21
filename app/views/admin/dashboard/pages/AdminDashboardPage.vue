<template>
  <div class="admin-dashboard-page">
    <AdminDashboardHeader @export="() => {}" @create="navigateTo('/admin/movies/create')" />
    <AdminDashboardStats :stats="stats" />
    <div class="admin-dashboard-page__middle">
      <div class="admin-dashboard-page__chart">
        <AdminDashboardChart v-model="chartPeriod" :data="chartData" />
      </div>
      <div class="admin-dashboard-page__activity">
        <AdminDashboardActivity :activities="activities" />
      </div>
    </div>
    <AdminDashboardRecentContent :content="recentContent" />
    <AdminDashboardBottomCards :subscriptions="subscriptions" :top-content="topContent" :platforms="platforms" />
  </div>
</template>
<script setup lang="ts">
import { AdminDashboardHeader, AdminDashboardStats, AdminDashboardChart, AdminDashboardActivity, AdminDashboardRecentContent, AdminDashboardBottomCards } from '../components'
import { useAdminDashboard } from '../composables'
const { stats, chartPeriod, chartData, activities, recentContent, subscriptions, topContent, platforms } = useAdminDashboard()
</script>
<style lang="scss" scoped>
.admin-dashboard-page {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-lg);

  &__middle { align-items: stretch;
  display: grid;
  gap: var(--spacing-lg);
  grid-template-columns: 2fr 1fr;
}

  &__chart {
    display: flex;
    min-width: 0;

    :deep(.app-card) { display: flex;
    flex: 1;
    flex-direction: column;
    }

 :deep(.app-card__body) { flex: 1;
    };
  }

  &__activity {
    display: flex;
    min-width: 0;

    :deep(.app-card) { display: flex;
    flex: 1;
    flex-direction: column;
    } };
  }
</style>
