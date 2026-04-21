<template>
  <AppCard :title="$t('ADMIN_MOVIE_FORM_RELATED')" :subtitle="$t('ADMIN_MOVIE_FORM_RELATED_DESC')">
    <template #icon>🔗</template>
    <div class="related">
      <div class="related__grid">
        <div v-for="item in items" :key="item.id" class="related__card">
          <div class="related__poster"><Film :size="20" /></div>
          <div class="related__overlay">
            <span class="related__title">{{ item.title }}</span>
            <span class="related__meta">{{ item.year }} · {{ item.genre }}</span>
          </div>
        </div>
      </div>
      <AppInput v-if="!readonly" :placeholder="$t('ADMIN_MOVIE_FORM_RELATED_SEARCH')" />
    </div>
  </AppCard>
</template>

<script setup lang="ts">
import { Film } from 'lucide-vue-next'
import type { IRelatedItem } from '../domain'
defineProps<{ items: IRelatedItem[]; readonly: boolean }>()
</script>

<style lang="scss" scoped>
.related {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-md);

  &__grid { display: grid;
  gap: var(--spacing-md);
  grid-template-columns: repeat(3, 1fr);
}

  &__card {

    aspect-ratio: 16/9;

    background: var(--color-divider);

    border-radius: var(--radius-lg);

    display: flex;

    overflow: hidden;

    position: relative;

  }

  &__poster {
    align-items: center;
    color: var(--color-text-tertiary);
    display: flex;
    height: 100%;
    justify-content: center;
    width: 100%;
  }

  &__overlay {

    background: linear-gradient(transparent 40%, rgba(0, 0, 0, 0.8));

    bottom: 0;

    display: flex;

    flex-direction: column;

    gap: var(--spacing-3xs);

    justify-content: flex-end;

    left: 0;

    padding: var(--spacing-sm);

    position: absolute;

    right: 0;

  }

  &__title {
    @include FluidFontCaption;
    color: var(--color-white);
    font-weight: 600;
  }

  &__meta {
    @include FluidFontCaption;
    color: var(--color-text-tertiary);
    };
  }
</style>
