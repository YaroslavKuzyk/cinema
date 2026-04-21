import type {
  ISettingsGeneral,
  ISettingsAppearance,
  ISettingsNotifications,
  ISettingsPlayer,
  ISettingsApi,
  ISettingsTab,
} from '../domain'

export function useAdminSettings() {
  const { t } = useI18n()

  const activeTab = ref('general')

  const tabs = computed<ISettingsTab[]>(() => [
    { title: t('ADMIN_SETTINGS_TAB_GENERAL'), value: 'general', icon: 'settings' },
    { title: t('ADMIN_SETTINGS_TAB_APPEARANCE'), value: 'appearance', icon: 'palette' },
    { title: t('ADMIN_SETTINGS_TAB_NOTIFICATIONS'), value: 'notifications', icon: 'bell' },
    { title: t('ADMIN_SETTINGS_TAB_PLAYER'), value: 'player', icon: 'play' },
    { title: t('ADMIN_SETTINGS_TAB_SECURITY'), value: 'security', icon: 'shield' },
    { title: t('ADMIN_SETTINGS_TAB_API'), value: 'api', icon: 'link' },
    { title: t('ADMIN_SETTINGS_TAB_DANGER'), value: 'danger', icon: 'alert-triangle' },
  ])

  const general = reactive<ISettingsGeneral>({
    platformName: 'CINEMA',
    domain: 'cinema.ua',
    defaultLanguage: 'uk',
    timezone: 'Europe/Kyiv',
    seoDescription: '',
  })

  const appearance = reactive<ISettingsAppearance>({
    primaryColor: '#e50914',
    logoUrl: '',
    faviconUrl: '',
  })

  const notifications = reactive<ISettingsNotifications>({
    emailOnNewContent: true,
    emailOnComplaints: true,
    dailyReport: true,
    pushNotifications: false,
    errorNotifications: true,
  })

  const player = reactive<ISettingsPlayer>({
    defaultQuality: '1080p',
    maxQuality: '4K',
    autoplay: 'on',
    defaultSubtitles: true,
    skipIntro: true,
    nextEpisode: true,
  })

  const api = reactive<ISettingsApi>({
    publicKey: 'pk_live_cinema_8f3a2b1c4d5e6f7g8h9i0j...',
    secretKey: 'sk_live_cinema_••••••••••••••••••••••',
    secretKeyLastGenerated: '10.03.2026',
    webhookUrl: 'https://api.cinema.ua/webhooks/v1',
  })

  const isSecretKeyVisible = ref(false)

  const colorPresets = [
    '#E50914',
    '#3B82F6',
    '#7C3AED',
    '#22C55E',
    '#F59E0B',
    '#EC4899',
  ]

  const languageOptions = computed(() => [
    { title: 'Українська', value: 'uk' },
    { title: 'English', value: 'en' },
  ])

  const timezoneOptions = computed(() => [
    { title: 'Europe/Kyiv (UTC+2)', value: 'Europe/Kyiv' },
    { title: 'Europe/London (UTC+0)', value: 'Europe/London' },
    { title: 'America/New_York (UTC-5)', value: 'America/New_York' },
  ])

  const qualityOptions = computed(() => [
    { title: '480p', value: '480p' },
    { title: '720p', value: '720p' },
    { title: '1080p', value: '1080p' },
    { title: '4K', value: '4K' },
  ])

  const autoplayOptions = computed(() => [
    { title: t('ADMIN_SETTINGS_PLAYER_AUTOPLAY_ON'), value: 'on' },
    { title: t('ADMIN_SETTINGS_PLAYER_AUTOPLAY_OFF'), value: 'off' },
    { title: t('ADMIN_SETTINGS_PLAYER_AUTOPLAY_WIFI'), value: 'wifi' },
  ])

  const saveSettings = () => {
    // TODO: API call
    console.log('Settings saved')
  }

  const resetSettings = () => {
    // TODO: API call
    console.log('Settings reset')
  }

  const copyPublicKey = () => {
    navigator.clipboard.writeText(api.publicKey)
  }

  const toggleSecretKey = () => {
    isSecretKeyVisible.value = !isSecretKeyVisible.value
  }

  const regenerateSecretKey = () => {
    // TODO: API call
    console.log('Secret key regenerated')
    api.secretKeyLastGenerated = new Date().toLocaleDateString('uk-UA')
  }

  const enableMaintenance = () => {
    // TODO: API call
    console.log('Maintenance mode enabled')
  }

  const clearCache = () => {
    // TODO: API call
    console.log('Cache cleared')
  }

  return {
    activeTab,
    tabs,
    general,
    appearance,
    notifications,
    player,
    api,
    isSecretKeyVisible,
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
  }
}
