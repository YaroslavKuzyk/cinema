import type { IPlanForm, PlanFormMode, ISystemFeature, IPlanFeatureValue } from '../domain'

// Global feature registry — matches backend schema
const SYSTEM_FEATURES: ISystemFeature[] = [
  // Quality
  { id: 'quality_sd', key: 'quality_sd', label: 'SD якість (480p)', description: 'Базова якість відео', category: 'quality', valueType: 'boolean' },
  { id: 'quality_hd', key: 'quality_hd', label: 'HD якість (720p)', description: 'Покращена якість відео', category: 'quality', valueType: 'boolean' },
  { id: 'quality_fhd', key: 'quality_fhd', label: 'Full HD якість (1080p)', description: 'Висока якість відео', category: 'quality', valueType: 'boolean' },
  { id: 'quality_4k', key: 'quality_4k', label: '4K якість (2160p)', description: 'Ультрависока якість', category: 'quality', valueType: 'boolean' },
  { id: 'quality_hdr', key: 'quality_hdr', label: 'HDR підтримка', description: 'Розширений динамічний діапазон', category: 'quality', valueType: 'boolean' },

  // Devices
  { id: 'max_devices', key: 'max_devices', label: 'Кількість пристроїв', description: 'Одночасний перегляд на пристроях', category: 'devices', valueType: 'number' },
  { id: 'max_profiles', key: 'max_profiles', label: 'Кількість профілів', description: 'Профілі в одному акаунті', category: 'devices', valueType: 'number' },

  // Content
  { id: 'no_ads', key: 'no_ads', label: 'Без реклами', description: 'Перегляд без рекламних вставок', category: 'content', valueType: 'boolean' },
  { id: 'offline_viewing', key: 'offline_viewing', label: 'Офлайн перегляд', description: 'Завантаження для перегляду без інтернету', category: 'content', valueType: 'boolean' },
  { id: 'early_access', key: 'early_access', label: 'Ранній доступ', description: 'Доступ до нового контенту раніше', category: 'content', valueType: 'boolean' },
  { id: 'exclusive_content', key: 'exclusive_content', label: 'Ексклюзивний контент', description: 'Доступ до ексклюзивних серій та фільмів', category: 'content', valueType: 'boolean' },

  // Audio
  { id: 'dolby_atmos', key: 'dolby_atmos', label: 'Dolby Atmos', description: 'Просторовий звук', category: 'audio', valueType: 'boolean' },
  { id: 'surround_51', key: 'surround_51', label: 'Surround 5.1', description: 'Багатоканальний звук', category: 'audio', valueType: 'boolean' },

  // Support
  { id: 'priority_support', key: 'priority_support', label: 'Пріоритетна підтримка', description: 'Швидша відповідь від підтримки', category: 'support', valueType: 'boolean' },
]

export function useAdminPlanForm(mode: Ref<PlanFormMode>) {
  const { t } = useI18n()
  const isReadonly = computed(() => mode.value === 'view')
  const isCreate = computed(() => mode.value === 'create')

  const systemFeatures = SYSTEM_FEATURES

  const featureCategories = computed(() => {
    const cats = new Map<string, { label: string; features: ISystemFeature[] }>()
    const categoryLabels: Record<string, string> = {
      quality: t('ADMIN_PLAN_FORM_CAT_QUALITY'),
      devices: t('ADMIN_PLAN_FORM_CAT_DEVICES'),
      content: t('ADMIN_PLAN_FORM_CAT_CONTENT'),
      audio: t('ADMIN_PLAN_FORM_CAT_AUDIO'),
      support: t('ADMIN_PLAN_FORM_CAT_SUPPORT'),
    }
    for (const f of systemFeatures) {
      if (!cats.has(f.category)) {
        cats.set(f.category, { label: categoryLabels[f.category] || f.category, features: [] })
      }
      cats.get(f.category)!.features.push(f)
    }
    return [...cats.entries()].map(([key, val]) => ({ key, ...val }))
  })

  const defaultFeatureValues = (): IPlanFeatureValue[] =>
    systemFeatures.map((f) => ({
      featureId: f.id,
      enabled: false,
      value: f.valueType === 'number' ? 1 : undefined,
    }))

  const premiumFeatureValues = (): IPlanFeatureValue[] => [
    { featureId: 'quality_sd', enabled: true },
    { featureId: 'quality_hd', enabled: true },
    { featureId: 'quality_fhd', enabled: true },
    { featureId: 'quality_4k', enabled: false },
    { featureId: 'quality_hdr', enabled: false },
    { featureId: 'max_devices', enabled: true, value: 4 },
    { featureId: 'max_profiles', enabled: true, value: 4 },
    { featureId: 'no_ads', enabled: true },
    { featureId: 'offline_viewing', enabled: true },
    { featureId: 'early_access', enabled: false },
    { featureId: 'exclusive_content', enabled: false },
    { featureId: 'dolby_atmos', enabled: false },
    { featureId: 'surround_51', enabled: true },
    { featureId: 'priority_support', enabled: false },
  ]

  const form = reactive<IPlanForm>({
    name: mode.value !== 'create' ? 'Premium' : '',
    slug: mode.value !== 'create' ? 'premium' : '',
    description: mode.value !== 'create' ? 'Full HD + офлайн перегляд' : '',
    price: mode.value !== 'create' ? '249' : '',
    currency: 'UAH',
    interval: mode.value !== 'create' ? 'month' : 'month',
    color: mode.value !== 'create' ? '#A855F7' : '#3B82F6',
    icon: mode.value !== 'create' ? '💎' : '',
    status: mode.value !== 'create' ? 'active' : 'active',
    isFeatured: mode.value !== 'create',
    trialDays: mode.value !== 'create' ? '14' : '0',
    featureValues: mode.value !== 'create' ? premiumFeatureValues() : defaultFeatureValues(),
  })

  const getFeatureValue = (featureId: string) => {
    return form.featureValues.find((fv) => fv.featureId === featureId)
  }

  const toggleFeature = (featureId: string) => {
    const fv = getFeatureValue(featureId)
    if (fv) fv.enabled = !fv.enabled
  }

  const updateFeatureValue = (featureId: string, value: string | number) => {
    const fv = getFeatureValue(featureId)
    if (fv) fv.value = value
  }

  const colorPresets = ['#6B7280', '#3B82F6', '#A855F7', '#FBBF24', '#22C55E', '#EC4899', '#E50914', '#F97316']
  const iconOptions = ['🆓', '⭐', '💎', '👑', '🎁', '♾️', '🚀', '🏆', '💫', '🎯']

  const intervalOptions = computed(() => [
    { title: t('ADMIN_PLANS_INTERVAL_MONTH'), value: 'month' },
    { title: t('ADMIN_PLANS_INTERVAL_YEAR'), value: 'year' },
    { title: t('ADMIN_PLANS_INTERVAL_LIFETIME'), value: 'lifetime' },
  ])

  const currencyOptions = [
    { title: 'UAH (₴)', value: 'UAH' },
    { title: 'USD ($)', value: 'USD' },
    { title: 'EUR (€)', value: 'EUR' },
  ]

  const statusOptions = computed(() => [
    { title: t('ADMIN_PLANS_STATUS_ACTIVE'), value: 'active' },
    { title: t('ADMIN_PLANS_STATUS_HIDDEN'), value: 'hidden' },
  ])

  const save = () => { console.log('Save plan', toRaw(form)) }

  return {
    form, isReadonly, isCreate, mode,
    systemFeatures, featureCategories,
    getFeatureValue, toggleFeature, updateFeatureValue,
    colorPresets, iconOptions, intervalOptions, currencyOptions, statusOptions,
    save,
  }
}
