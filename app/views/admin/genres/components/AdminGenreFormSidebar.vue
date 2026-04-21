<!-- eslint-disable vue/no-mutating-props -->
<template>
  <div class="genre-sidebar">
    <div class="genre-sidebar__preview">
      <div class="genre-sidebar__icon-preview" :style="{ backgroundColor: form.color + '20' }">
        <span class="genre-sidebar__icon-large">{{ form.icon || '🎬' }}</span>
      </div>
      <div class="genre-sidebar__info">
        <h3>{{ form.name || $t('ADMIN_GENRE_FORM_UNTITLED') }}</h3>
        <span class="genre-sidebar__slug">/genres/{{ form.slug || '...' }}</span>
      </div>
      <div v-if="form.color" class="genre-sidebar__color-row">
        <span class="genre-sidebar__color-dot" :style="{ backgroundColor: form.color }" />
        <span>{{ form.color }}</span>
      </div>
    </div>

    <AppCard v-if="!isCreate" :title="$t('ADMIN_GENRE_FORM_CONTENT_STATS')">
      <div class="genre-sidebar__stats">
        <div class="genre-sidebar__stat"><span class="genre-sidebar__stat-number">{{ contentStats.movies }}</span><span>{{ $t('ADMIN_GENRE_FORM_STAT_MOVIES') }}</span></div>
        <div class="genre-sidebar__stat"><span class="genre-sidebar__stat-number">{{ contentStats.series }}</span><span>{{ $t('ADMIN_GENRE_FORM_STAT_SERIES') }}</span></div>
        <div class="genre-sidebar__stat"><span class="genre-sidebar__stat-number">{{ contentStats.anime }}</span><span>{{ $t('ADMIN_GENRE_FORM_STAT_ANIME') }}</span></div>
        <div class="genre-sidebar__stat genre-sidebar__stat--total"><span class="genre-sidebar__stat-number">{{ contentStats.total }}</span><span>{{ $t('ADMIN_GENRE_FORM_STAT_TOTAL') }}</span></div>
      </div>
    </AppCard>

    <AppCard :title="$t('ADMIN_GENRE_FORM_PUBLICATION')">
      <div class="genre-sidebar__pub">
        <div class="genre-sidebar__pub-row">
          <span>{{ $t('ADMIN_GENRE_FORM_STATUS') }}</span>
          <AppSelect v-if="!readonly" v-model="form.status" :options="statusOptions" item-title="title" item-value="value" />
          <AppBadge v-else :variant="form.status === 'active' ? 'success' : 'basic'" read-only>
            {{ form.status === 'active' ? $t('ADMIN_GENRE_FORM_STATUS_ACTIVE') : $t('ADMIN_GENRE_FORM_STATUS_HIDDEN') }}
          </AppBadge>
        </div>
      </div>
      <div v-if="!readonly" class="genre-sidebar__actions">
        <AppButton size="medium" variant="primary" @click="$emit('publish')">{{ $t('ADMIN_GENRE_FORM_SAVE_PUBLISH') }}</AppButton>
        <AppButton size="medium" variant="ghost" @click="$emit('save')">{{ $t('ADMIN_GENRE_FORM_SAVE') }}</AppButton>
      </div>
    </AppCard>
  </div>
</template>

<script setup lang="ts">
import type { IGenreForm, IGenreContentStats } from '../domain'
defineProps<{
  form: IGenreForm
  readonly: boolean
  isCreate: boolean
  contentStats: IGenreContentStats
  statusOptions: { title: string; value: string }[]
}>()
defineEmits<{ publish: []; save: [] }>()
</script>

<style lang="scss" scoped>
.genre-sidebar {
  display: flex; flex-direction: column; gap: var(--spacing-lg); width: var(--container-md);

  &__preview {

    background: var(--color-surface);

    border: 1px solid var(--color-border);

    border-radius: var(--radius-xl);

    display: flex;

    flex-direction: column;

    gap: var(--spacing-md);

    padding: var(--spacing-lg);

  }

  &__icon-preview {

    align-items: center;

    border-radius: var(--radius-xl);

    display: flex;

    height: 80px;

    justify-content: center;

    width: 100%;

  }
  &__icon-large { font-size: 40px; }

  &__info {

    display: flex;

    flex-direction: column;

    gap: var(--spacing-3xs);

    h3 { @include FluidFontBodyMd;

    color: var(--color-white);

    font-weight: 600;

    };

  }

  &__slug {
    @include FluidFontCaption;
    color: var(--color-text-tertiary);
  }

  &__color-row {
    @include FluidFontCaption;
    align-items: center;
    color: var(--color-text-secondary);
    display: flex;
    gap: var(--spacing-xs);
  }

  &__color-dot {
    border-radius: var(--radius-full);
    height: 12px;
    width: 12px;
  }

  &__stats {

    display: grid;

    gap: var(--spacing-sm);

    grid-template-columns: repeat(2, 1fr);

  }

  &__stat {

    background: var(--color-divider);

    border-radius: var(--radius-md);

    display: flex;

    flex-direction: column;

    gap: var(--spacing-3xs);

    padding: var(--spacing-sm);

    span { @include FluidFontCaption;

    color: var(--color-text-tertiary);

  }

    &--total {
      grid-column: span 2;
      };
    }

  &__stat-number {
    @include FluidFontBodyMd;
    color: var(--color-white);
    font-weight: 700;
  }

  &__pub {

    display: flex;

    flex-direction: column;

    gap: var(--spacing-sm);

  }

  &__pub-row {

    align-items: center;

    display: flex;

    justify-content: space-between;

    span { @include FluidFontCaption;

    color: var(--color-text-tertiary);

    };

  }

  &__actions {
    display: flex;
    flex-direction: column;
    gap: var(--spacing-xs);
    margin-top: var(--spacing-md);
    };
  }
</style>
