<template>
  <AppCard
    :title="$t('ADMIN_SETTINGS_APPEARANCE_TITLE')"
    :subtitle="$t('ADMIN_SETTINGS_APPEARANCE_SUBTITLE')"
  >
    <div class="admin-settings-appearance">
      <AppColorPicker
        :model-value="modelValue.primaryColor"
        :colors="colorPresets"
        :label="$t('ADMIN_SETTINGS_APPEARANCE_COLOR')"
        show-input
        @update:model-value="updateField('primaryColor', $event)"
      />

      <div class="admin-settings-appearance__row">
        <div class="admin-settings-appearance__upload">
          <label class="admin-settings-appearance__label">{{ $t('ADMIN_SETTINGS_APPEARANCE_LOGO') }}</label>
          <div class="admin-settings-appearance__upload-area">
            <span class="admin-settings-appearance__upload-logo">CINE<span class="admin-settings-appearance__upload-logo-accent">MA</span></span>
            <span class="admin-settings-appearance__upload-hint">{{ $t('ADMIN_SETTINGS_APPEARANCE_UPLOAD_HINT_SVG') }}</span>
          </div>
        </div>
        <div class="admin-settings-appearance__upload">
          <label class="admin-settings-appearance__label">{{ $t('ADMIN_SETTINGS_APPEARANCE_FAVICON') }}</label>
          <div class="admin-settings-appearance__upload-area">
            <span class="admin-settings-appearance__favicon">c</span>
            <span class="admin-settings-appearance__upload-hint">{{ $t('ADMIN_SETTINGS_APPEARANCE_UPLOAD_HINT_ICO') }}</span>
          </div>
        </div>
      </div>
    </div>
  </AppCard>
</template>

<script setup lang="ts">
import type { ISettingsAppearance } from '../domain'

interface Props {
  modelValue: ISettingsAppearance
  colorPresets: string[]
}

const props = defineProps<Props>()

const emit = defineEmits<{
  'update:modelValue': [value: ISettingsAppearance]
}>()

const updateField = <K extends keyof ISettingsAppearance>(field: K, value: ISettingsAppearance[K]) => {
  emit('update:modelValue', { ...props.modelValue, [field]: value })
}
</script>

<style lang="scss" scoped>
.admin-settings-appearance {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-lg);

  &__label {
    @include FluidFontLabel;
    color: var(--color-text-secondary);
    text-transform: uppercase;
  }

  &__row {
    display: flex;
    gap: var(--spacing-md);

    > * {
      flex: 1;
    }
  }

  &__upload {
    display: flex;
    flex-direction: column;
    gap: var(--spacing-sm);
  }

  &__upload-area {
    align-items: center;
    background: var(--color-divider);
    border: 1px dashed var(--color-border);
    border-radius: var(--radius-lg);
    cursor: pointer;
    display: flex;
    flex-direction: column;
    gap: var(--spacing-xs);
    justify-content: center;
    min-height: 100px;
    padding: var(--spacing-lg);
    transition: border-color 0.2s ease;

    &:hover {

      border-color: var(--color-text-tertiary);

      };

    }

  &__upload-logo {
    @include FluidFontH2;
    color: var(--color-white);
    font-weight: 900;
    letter-spacing: 2px;
  }

  &__upload-logo-accent {
    color: var(--color-primary);
  }

  &__favicon {
    @include FluidFontH3;
    align-items: center;
    background: var(--color-primary);
    border-radius: var(--radius-sm);
    color: var(--color-white);
    display: flex;
    font-weight: 700;
    height: 32px;
    justify-content: center;
    width: 32px;
  }

  &__upload-hint {
    @include FluidFontCaption;

    color: var(--color-text-tertiary);

  }
}
</style>
