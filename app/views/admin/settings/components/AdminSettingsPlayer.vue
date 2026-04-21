<template>
  <AppCard
    :title="$t('ADMIN_SETTINGS_PLAYER_TITLE')"
    :subtitle="$t('ADMIN_SETTINGS_PLAYER_SUBTITLE')"
  >
    <div class="admin-settings-player">
      <div class="admin-settings-player__row">
        <AppSelect
          :model-value="modelValue.defaultQuality"
          :options="qualityOptions"
          item-title="title"
          item-value="value"
          :label="$t('ADMIN_SETTINGS_PLAYER_DEFAULT_QUALITY')"
          @update:model-value="updateField('defaultQuality', $event)"
        />
        <AppSelect
          :model-value="modelValue.maxQuality"
          :options="qualityOptions"
          item-title="title"
          item-value="value"
          :label="$t('ADMIN_SETTINGS_PLAYER_MAX_QUALITY')"
          @update:model-value="updateField('maxQuality', $event)"
        />
        <AppSelect
          :model-value="modelValue.autoplay"
          :options="autoplayOptions"
          item-title="title"
          item-value="value"
          :label="$t('ADMIN_SETTINGS_PLAYER_AUTOPLAY')"
          @update:model-value="updateField('autoplay', $event)"
        />
      </div>

      <div class="admin-settings-player__toggles">
        <div class="admin-settings-player__toggle-row">
          <div class="admin-settings-player__toggle-info">
            <p>{{ $t('ADMIN_SETTINGS_PLAYER_SUBTITLES') }}</p>
            <span>{{ $t('ADMIN_SETTINGS_PLAYER_SUBTITLES_DESC') }}</span>
          </div>
          <AppToggle
            :model-value="modelValue.defaultSubtitles"
            @update:model-value="updateField('defaultSubtitles', $event)"
          />
        </div>

        <div class="admin-settings-player__toggle-row">
          <div class="admin-settings-player__toggle-info">
            <p>{{ $t('ADMIN_SETTINGS_PLAYER_SKIP_INTRO') }}</p>
            <span>{{ $t('ADMIN_SETTINGS_PLAYER_SKIP_INTRO_DESC') }}</span>
          </div>
          <AppToggle
            :model-value="modelValue.skipIntro"
            @update:model-value="updateField('skipIntro', $event)"
          />
        </div>

        <div class="admin-settings-player__toggle-row">
          <div class="admin-settings-player__toggle-info">
            <p>{{ $t('ADMIN_SETTINGS_PLAYER_NEXT_EPISODE') }}</p>
            <span>{{ $t('ADMIN_SETTINGS_PLAYER_NEXT_EPISODE_DESC') }}</span>
          </div>
          <AppToggle
            :model-value="modelValue.nextEpisode"
            @update:model-value="updateField('nextEpisode', $event)"
          />
        </div>
      </div>
    </div>
  </AppCard>
</template>

<script setup lang="ts">
import type { ISettingsPlayer } from '../domain'

const props = defineProps<{
  modelValue: ISettingsPlayer
  qualityOptions: { title: string; value: string }[]
  autoplayOptions: { title: string; value: string }[]
}>()

const emit = defineEmits<{
  'update:modelValue': [value: ISettingsPlayer]
}>()

const updateField = <K extends keyof ISettingsPlayer>(field: K, value: ISettingsPlayer[K]) => {
  emit('update:modelValue', { ...props.modelValue, [field]: value })
}
</script>

<style lang="scss" scoped>
.admin-settings-player {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-lg);

  &__row {
    display: flex;
    gap: var(--spacing-md);

    > * {
      flex: 1;
    }
  }

  &__toggles {
    display: flex;
    flex-direction: column;
    gap: var(--spacing-md);
  }

  &__toggle-row {
    align-items: center;
    display: flex;
    gap: var(--spacing-md);
    justify-content: space-between;
  }

  &__toggle-info {
    display: flex;
    flex-direction: column;
    gap: var(--spacing-3xs);

    span {
      @include FluidFontBodySm;

      color: var(--color-text-tertiary);

    }
  }
}
</style>
