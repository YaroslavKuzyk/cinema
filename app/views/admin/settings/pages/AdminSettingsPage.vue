<template>
  <div class="admin-settings-page">
    <AdminSettingsHeader @save="saveSettings" />

    <div class="admin-settings-page__layout">
      <AdminSettingsSidebar
        :tabs="tabs"
        :active-tab="activeTab"
        @update:active-tab="handleTabChange"
      />

      <div ref="contentRef" class="admin-settings-page__content">
        <AdminSettingsGeneral
          id="section-general"
          v-model="general"
          :language-options="languageOptions"
          :timezone-options="timezoneOptions"
        />

        <AdminSettingsAppearance
          id="section-appearance"
          v-model="appearance"
          :color-presets="colorPresets"
        />

        <AdminSettingsNotifications
          id="section-notifications"
          v-model="notifications"
        />

        <AdminSettingsPlayer
          id="section-player"
          v-model="player"
          :quality-options="qualityOptions"
          :autoplay-options="autoplayOptions"
        />

        <AdminSettingsSecurity
          id="section-api"
          :api="api"
          @copy-public-key="copyPublicKey"
          @toggle-secret-key="toggleSecretKey"
          @regenerate-secret-key="regenerateSecretKey"
        />

        <AdminSettingsDangerZone
          id="section-danger"
          @maintenance="enableMaintenance"
          @clear-cache="clearCache"
          @reset="resetSettings"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {
  AdminSettingsHeader,
  AdminSettingsSidebar,
  AdminSettingsGeneral,
  AdminSettingsAppearance,
  AdminSettingsNotifications,
  AdminSettingsPlayer,
  AdminSettingsSecurity,
  AdminSettingsDangerZone,
} from '../components'
import { useAdminSettings } from '../composables'

const {
  activeTab,
  tabs,
  general,
  appearance,
  notifications,
  player,
  api,
  colorPresets,
  languageOptions,
  timezoneOptions,
  qualityOptions,
  autoplayOptions,
  saveSettings,
  resetSettings,
  copyPublicKey,
  toggleSecretKey,
  regenerateSecretKey,
  enableMaintenance,
  clearCache,
} = useAdminSettings()

const contentRef = ref<HTMLElement | null>(null)
const isScrolling = ref(false)
const sectionIds = ['general', 'appearance', 'notifications', 'player', 'api', 'danger']

const handleTabChange = (tab: string) => {
  isScrolling.value = true
  activeTab.value = tab
  nextTick(() => {
    const element = document.getElementById(`section-${tab}`)
    if (element && contentRef.value) {
      contentRef.value.scrollTo({
        top: element.offsetTop - contentRef.value.offsetTop,
        behavior: 'smooth',
      })
    }
    setTimeout(() => {
      isScrolling.value = false
    }, 500)
  })
}

onMounted(() => {
  const observer = new IntersectionObserver(
    (entries) => {
      if (isScrolling.value) return
      for (const entry of entries) {
        if (entry.isIntersecting) {
          const id = entry.target.id.replace('section-', '')
          if (sectionIds.includes(id)) {
            activeTab.value = id
          }
        }
      }
    },
    {
      root: contentRef.value,
      rootMargin: '-10px 0px -50% 0px',
      threshold: 0,
    },
  )

  sectionIds.forEach((id) => {
    const element = document.getElementById(`section-${id}`)
    if (element) {
      observer.observe(element)
    }
  })

  onUnmounted(() => {
    observer.disconnect()
  })
})
</script>

<style lang="scss" scoped>
.admin-settings-page {
  display: flex;
  flex-direction: column;
  height: calc(100vh - var(--spacing-xl) * 2);

  &__layout {
    display: flex;
    flex: 1;
    gap: var(--spacing-xl);
    overflow: hidden;
  }

  &__content {
    display: flex;
    flex: 1;
    flex-direction: column;
    gap: var(--spacing-lg);
    min-height: 0;
    overflow-y: auto;
    padding-bottom: var(--spacing-xl);
    padding-right: var(--spacing-xs);

    > * {
      flex-shrink: 0;
    }
  }
}
</style>
