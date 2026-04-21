<template>
  <AppCard :title="$t('ADMIN_DASH_RECENT_TITLE')">
    <template #header-action>
      <AppInput :placeholder="$t('ADMIN_DASH_RECENT_SEARCH')" width="200px" />
    </template>
    <div class="recent">
      <table class="recent__table">
        <thead><tr>
          <th>{{ $t('ADMIN_DASH_RECENT_COL_TITLE') }}</th><th>{{ $t('ADMIN_DASH_RECENT_COL_TYPE') }}</th><th>{{ $t('ADMIN_DASH_RECENT_COL_GENRE') }}</th>
          <th>{{ $t('ADMIN_DASH_RECENT_COL_STATUS') }}</th><th>{{ $t('ADMIN_DASH_RECENT_COL_VIEWS') }}</th><th>{{ $t('ADMIN_DASH_RECENT_COL_RATING') }}</th><th>{{ $t('ADMIN_DASH_RECENT_COL_DATE') }}</th>
        </tr></thead>
        <tbody>
          <tr v-for="item in content" :key="item.id">
            <td><div class="recent__title"><div class="recent__poster"><Film :size="14" /></div>{{ item.title }}</div></td>
            <td>{{ item.type }}</td><td>{{ item.genre }}</td>
            <td><AppBadge :variant="item.statusVariant" read-only>{{ getStatusLabel(item.status) }}</AppBadge></td>
            <td><strong v-if="item.views">{{ item.views }}</strong><span v-else class="recent__empty">—</span></td>
            <td><span v-if="item.rating" class="recent__rating"><Star :size="12" class="recent__star" /> {{ item.rating }}</span><span v-else class="recent__empty">—</span></td>
            <td>{{ item.date }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </AppCard>
</template>
<script setup lang="ts">
import { Film, Star } from 'lucide-vue-next'
import type { IDashboardContent } from '../domain'
const { t } = useI18n()
defineProps<{ content: IDashboardContent[] }>()
const getStatusLabel = (s: string) => ({ published: t('ADMIN_DASH_STATUS_PUBLISHED'), draft: t('ADMIN_DASH_STATUS_DRAFT'), archived: t('ADMIN_DASH_STATUS_ARCHIVED'), moderation: t('ADMIN_DASH_STATUS_MODERATION') }[s] || s)
</script>
<style lang="scss" scoped>
.recent { overflow-x: auto;

  &__table {

    border-collapse: collapse;

    width: 100%;

    th { @include FluidFontCaption;

    border-bottom: 1px solid var(--color-border);

    color: var(--color-text-secondary);

    font-weight: 600;

    padding: var(--spacing-sm) var(--spacing-md);

    text-align: left;

    text-transform: uppercase;

  }

    td {
      @include FluidFontCaption;
      border-bottom: 1px solid var(--color-border);
      color: var(--color-text-primary);
      padding: var(--spacing-sm) var(--spacing-md);
      white-space: nowrap;
    }
    tr:last-child td { border-bottom: none; }

    strong {
      color: var(--color-white);
      font-weight: 600;
      };
    }

  &__title {

    align-items: center;

    color: var(--color-white);

    display: flex;

    font-weight: 600;

    gap: var(--spacing-sm);

    @include FluidFontBodySm;

  }

  &__poster {
    align-items: center;
    background: var(--color-divider);
    border-radius: var(--radius-sm);
    color: var(--color-text-tertiary);
    display: flex;
    flex-shrink: 0;
    height: 32px;
    justify-content: center;
    width: 32px;
  }

  &__rating {
    align-items: center;
    display: inline-flex;
    gap: var(--spacing-3xs);
  }
  &__star { color: var(--color-warning); }

  &__empty {
    color: var(--color-text-tertiary);
    };
  }
</style>
