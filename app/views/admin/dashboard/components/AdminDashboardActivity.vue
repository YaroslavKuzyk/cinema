<template>
  <AppCard :title="$t('ADMIN_DASH_ACTIVITY_TITLE')">
    <div class="activity">
      <div v-for="item in activities" :key="item.id" class="activity__item">
        <span class="activity__dot" :class="`activity__dot--${item.dotColor}`" />
        <div class="activity__content">
          <p><strong v-if="item.highlight">{{ item.highlight }}</strong> {{ item.text }}</p>
          <span>{{ item.time }}</span>
        </div>
      </div>
    </div>
  </AppCard>
</template>
<script setup lang="ts">
import type { IDashboardActivity } from '../domain'
defineProps<{ activities: IDashboardActivity[] }>()
</script>
<style lang="scss" scoped>
.activity {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-md);

  &__item { align-items: flex-start;
  display: flex;
  gap: var(--spacing-sm);
}

  &__dot {

    border-radius: 50%;

    flex-shrink: 0;

    height: 8px;

    margin-top: 6px;

    width: 8px;

    &--success { background: var(--color-success);

    }

 &--info { background: var(--color-info);

  }

    &--warning {
      background: var(--color-warning);
      }

 &--danger { background: var(--color-primary);
    }

    &--purple {
      background: var(--color-purple);
      };
    }

  &__content {

    display: flex;

    flex: 1;

    justify-content: space-between;

    p { @include FluidFontBodySm;

    color: var(--color-text-secondary);

    margin: 0;

    strong { color: var(--color-white);

    font-weight: 600;

    };

  }

    span {
      @include FluidFontCaption;
      color: var(--color-text-tertiary);
      flex-shrink: 0;
      } };
    }
</style>
