<!-- eslint-disable vue/no-mutating-props -->
<template>
  <div class="movie-sidebar">
    <div class="movie-sidebar__preview">
      <div class="movie-sidebar__poster"><Film :size="32" /></div>
      <div class="movie-sidebar__info">
        <h3>{{ form.title || $t('ADMIN_MOVIE_FORM_UNTITLED') }}</h3>
        <span>{{ form.year || '—' }} · {{ form.contentType === 'single' ? $t('ADMIN_MOVIE_FORM_TYPE_SINGLE') : $t('ADMIN_MOVIE_FORM_TYPE_MULTI') }} · {{ form.duration ? `${form.duration} ${$t('ADMIN_MOVIES_MIN')}` : '—' }}</span>
      </div>
      <div v-if="form.genres.length" class="movie-sidebar__genres">
        <AppBadge v-for="g in form.genres" :key="g.id" variant="primary" read-only>{{ g.label }}</AppBadge>
      </div>
      <div v-if="form.rating" class="movie-sidebar__rating">
        <Star :size="16" class="movie-sidebar__star" />
        <strong>{{ form.rating }}</strong>
        <span>/ 10</span>
      </div>
      <div class="movie-sidebar__details">
        <div class="movie-sidebar__detail-row"><span>{{ $t('ADMIN_MOVIE_FORM_COUNTRY') }}</span><strong>{{ form.countries.map(c => c.label).join(', ') || '—' }}</strong></div>
        <div class="movie-sidebar__detail-row"><span>{{ $t('ADMIN_MOVIE_FORM_AGE') }}</span><strong>{{ form.ageRestriction || '—' }}</strong></div>
        <div class="movie-sidebar__detail-row"><span>{{ $t('ADMIN_MOVIE_FORM_DURATION') }}</span><strong>{{ form.duration ? formatDuration(+form.duration) : '—' }}</strong></div>
        <div class="movie-sidebar__detail-row"><span>{{ $t('ADMIN_MOVIE_FORM_DIRECTOR_LABEL') }}</span><strong>{{ form.directors.map(d => d.label).join(', ') || '—' }}</strong></div>
        <div class="movie-sidebar__detail-row"><span>{{ $t('ADMIN_MOVIE_FORM_STUDIO') }}</span><strong>{{ form.studio || '—' }}</strong></div>
      </div>
    </div>

    <AppCard :title="$t('ADMIN_MOVIE_FORM_PUBLICATION')">
      <div class="movie-sidebar__pub">
        <div class="movie-sidebar__pub-row"><span>{{ $t('ADMIN_MOVIE_FORM_STATUS_LABEL') }}</span><strong class="movie-sidebar__pub-status">{{ statusLabel }}</strong></div>
        <div class="movie-sidebar__pub-row"><span>{{ $t('ADMIN_MOVIE_FORM_VISIBILITY') }}</span><AppToggle v-model="form.isPublic" :disabled="readonly" :label="$t('ADMIN_MOVIE_FORM_PUBLIC')" /></div>
        <div class="movie-sidebar__pub-row"><span>{{ $t('ADMIN_MOVIE_FORM_FEATURED') }}</span><AppToggle v-model="form.isFeatured" :disabled="readonly" :label="$t('ADMIN_MOVIE_FORM_YES')" /></div>
        <div class="movie-sidebar__pub-row"><span>SEO URL</span><span class="movie-sidebar__pub-url">{{ form.seoUrl || '—' }}</span></div>
      </div>
      <div v-if="!readonly" class="movie-sidebar__actions">
        <AppButton size="medium" variant="primary" @click="$emit('publish')">{{ $t('ADMIN_MOVIE_FORM_PUBLISH_NOW') }}</AppButton>
        <AppButton size="medium" variant="secondary" @click="$emit('schedule')">{{ $t('ADMIN_MOVIE_FORM_SCHEDULE') }}</AppButton>
        <AppButton size="medium" variant="ghost" @click="$emit('saveDraft')">{{ $t('ADMIN_MOVIE_FORM_SAVE_DRAFT') }}</AppButton>
      </div>
    </AppCard>

    <AppCard v-if="!isCreate" :title="$t('ADMIN_MOVIE_FORM_READINESS')">
      <div class="movie-sidebar__readiness">
        <div v-for="(item, i) in readiness" :key="i" class="movie-sidebar__readiness-item">
          <CheckCircle v-if="item.done" :size="16" class="movie-sidebar__readiness-done" />
          <Clock v-else :size="16" class="movie-sidebar__readiness-pending" />
          <span>{{ item.label }}{{ item.progress !== undefined ? ` — ${item.progress}%` : '' }}</span>
        </div>
        <div class="movie-sidebar__readiness-summary">
          <AppBadge variant="warning" read-only>{{ $t('ADMIN_MOVIE_FORM_ALMOST_READY') }}</AppBadge>
        </div>
      </div>
    </AppCard>
  </div>
</template>

<script setup lang="ts">
import { Film, Star, CheckCircle, Clock } from 'lucide-vue-next'
import type { IMovieForm, IReadinessItem } from '../domain'

defineProps<{
  form: IMovieForm
  readonly: boolean
  isCreate: boolean
  statusLabel: string
  readiness: IReadinessItem[]
}>()

defineEmits<{ publish: []; schedule: []; saveDraft: [] }>()

const formatDuration = (min: number) => {
  const h = Math.floor(min / 60)
  const m = min % 60
  return h > 0 ? `${h}г ${m}хв` : `${m}хв`
}
</script>

<style lang="scss" scoped>
.movie-sidebar {
  display: flex; flex-direction: column; gap: var(--spacing-lg); max-width: var(--container-md); width: 100%;

  &__preview {

    background: var(--color-surface);

    border: 1px solid var(--color-border);

    border-radius: var(--radius-xl);

    display: flex;

    flex-direction: column;

    gap: var(--spacing-md);

    overflow: hidden;

  }

  &__poster {
    align-items: center;
    aspect-ratio: 16/9;
    background: var(--color-divider);
    color: var(--color-text-tertiary);
    display: flex;
    justify-content: center;
    width: 100%;
  }

  &__info {

    display: flex;

    flex-direction: column;

    gap: var(--spacing-3xs);

    padding: 0 var(--spacing-lg);

    h3 { @include FluidFontBodyMd;

    color: var(--color-white);

    font-weight: 600;

  }

    span {
      @include FluidFontCaption;
      color: var(--color-text-tertiary);
      };
    }

  &__genres {
    display: flex;
    flex-wrap: wrap;
    gap: var(--spacing-xs);
    padding: 0 var(--spacing-lg);
  }

  &__rating {

    align-items: center;

    background: var(--color-divider);

    border-radius: var(--radius-md);

    display: flex;

    gap: var(--spacing-xs);

    margin: 0 var(--spacing-lg);

    padding: var(--spacing-sm) var(--spacing-md);

    strong { @include FluidFontH3;

    color: var(--color-white);

    }

 span { @include FluidFontCaption;

    color: var(--color-text-tertiary);

    };

  }
  &__star { color: var(--color-warning); }

  &__details {
    display: flex;
    flex-direction: column;
    gap: var(--spacing-xs);
    padding: 0 var(--spacing-lg) var(--spacing-lg);
  }

  &__detail-row {
    @include FluidFontCaption;

    display: flex;

    justify-content: space-between;

    span { color: var(--color-text-tertiary);

    }

 strong { color: var(--color-text-primary);

    };

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

  &__pub-status {
    @include FluidFontCaption;
    color: var(--color-warning);
  }

  &__pub-url {
    @include FluidFontCaption;
    color: var(--color-text-secondary);
  }

  &__actions {

    display: flex;

    flex-direction: column;

    gap: var(--spacing-xs);

    margin-top: var(--spacing-md);

  }

  &__readiness {

    display: flex;

    flex-direction: column;

    gap: var(--spacing-sm);

  }

  &__readiness-item {
    @include FluidFontCaption;
    align-items: center;
    color: var(--color-text-primary);
    display: flex;
    gap: var(--spacing-sm);
  }
  &__readiness-done { color: var(--color-success); }
  &__readiness-pending { color: var(--color-info); }

  &__readiness-summary {
    margin-top: var(--spacing-sm);
    };
  }
</style>
