import type { ISortState } from '~/components/System/AppTable/index.types'
import type { IPlan, IPlanStats, IPlanFilters } from '../domain'

export function useAdminPlans() {
  const { t } = useI18n()

  const plans = ref<IPlan[]>([
    { id: '1', name: 'Free', slug: 'free', description: 'Базовий доступ з рекламою', price: 0, currency: 'UAH', interval: 'month', color: '#6B7280', icon: '🆓', status: 'active', usersCount: 12450, isFeatured: false, trialDays: 0, featureValues: [{ featureId: 'quality_sd', enabled: true }, { featureId: 'max_devices', enabled: true, value: 1 }] },
    { id: '2', name: 'Basic', slug: 'basic', description: 'HD якість без реклами', price: 149, currency: 'UAH', interval: 'month', color: '#3B82F6', icon: '⭐', status: 'active', usersCount: 8320, isFeatured: false, trialDays: 7, featureValues: [{ featureId: 'quality_sd', enabled: true }, { featureId: 'quality_hd', enabled: true }, { featureId: 'max_devices', enabled: true, value: 2 }, { featureId: 'no_ads', enabled: true }] },
    { id: '3', name: 'Premium', slug: 'premium', description: 'Full HD + офлайн перегляд', price: 249, currency: 'UAH', interval: 'month', color: '#A855F7', icon: '💎', status: 'active', usersCount: 5670, isFeatured: true, trialDays: 14, featureValues: [{ featureId: 'quality_sd', enabled: true }, { featureId: 'quality_hd', enabled: true }, { featureId: 'quality_fhd', enabled: true }, { featureId: 'max_devices', enabled: true, value: 4 }, { featureId: 'no_ads', enabled: true }, { featureId: 'offline_viewing', enabled: true }, { featureId: 'surround_51', enabled: true }] },
    { id: '4', name: 'Ultra', slug: 'ultra', description: '4K + HDR + Dolby Atmos', price: 399, currency: 'UAH', interval: 'month', color: '#FBBF24', icon: '👑', status: 'active', usersCount: 2340, isFeatured: false, trialDays: 14, featureValues: [{ featureId: 'quality_sd', enabled: true }, { featureId: 'quality_hd', enabled: true }, { featureId: 'quality_fhd', enabled: true }, { featureId: 'quality_4k', enabled: true }, { featureId: 'quality_hdr', enabled: true }, { featureId: 'max_devices', enabled: true, value: 6 }, { featureId: 'no_ads', enabled: true }, { featureId: 'offline_viewing', enabled: true }, { featureId: 'dolby_atmos', enabled: true }, { featureId: 'surround_51', enabled: true }] },
    { id: '5', name: 'Annual Premium', slug: 'annual-premium', description: 'Premium на рік зі знижкою', price: 2499, currency: 'UAH', interval: 'year', color: '#22C55E', icon: '🎁', status: 'active', usersCount: 1890, isFeatured: false, trialDays: 0, featureValues: [{ featureId: 'quality_fhd', enabled: true }, { featureId: 'max_devices', enabled: true, value: 4 }, { featureId: 'no_ads', enabled: true }, { featureId: 'offline_viewing', enabled: true }] },
    { id: '6', name: 'Lifetime', slug: 'lifetime', description: 'Разова покупка назавжди', price: 9999, currency: 'UAH', interval: 'lifetime', color: '#EC4899', icon: '♾️', status: 'hidden', usersCount: 156, isFeatured: false, trialDays: 0, featureValues: [{ featureId: 'quality_4k', enabled: true }, { featureId: 'quality_hdr', enabled: true }, { featureId: 'max_devices', enabled: true, value: 10 }, { featureId: 'no_ads', enabled: true }, { featureId: 'offline_viewing', enabled: true }, { featureId: 'early_access', enabled: true }, { featureId: 'exclusive_content', enabled: true }, { featureId: 'dolby_atmos', enabled: true }, { featureId: 'priority_support', enabled: true }] },
  ])

  const filters = reactive<IPlanFilters>({ search: '', status: '' })
  const sortBy = ref<ISortState>({ key: 'price', direction: 'asc' })
  const selectedRows = ref<string[]>([])

  const stats = computed<IPlanStats>(() => {
    const all = plans.value
    const totalSubs = all.reduce((sum, p) => sum + p.usersCount, 0)
    const monthlyRev = all.reduce((sum, p) => {
      if (p.interval === 'month') return sum + p.price * p.usersCount
      if (p.interval === 'year') return sum + (p.price / 12) * p.usersCount
      return sum
    }, 0)
    return {
      total: all.length,
      active: all.filter((p) => p.status === 'active').length,
      totalSubscribers: totalSubs,
      monthlyRevenue: `${(monthlyRev / 1000000).toFixed(1)}M`,
    }
  })

  const filteredPlans = computed(() => {
    let result = plans.value.filter((p) => {
      const matchesSearch = !filters.search || p.name.toLowerCase().includes(filters.search.toLowerCase())
      const matchesStatus = !filters.status || p.status === filters.status
      return matchesSearch && matchesStatus
    })
    if (sortBy.value) {
      const { key, direction } = sortBy.value
      const mult = direction === 'asc' ? 1 : -1
      result = [...result].sort((a, b) => {
        const aVal = a[key as keyof IPlan]; const bVal = b[key as keyof IPlan]
        if (typeof aVal === 'number' && typeof bVal === 'number') return (aVal - bVal) * mult
        return String(aVal).localeCompare(String(bVal), 'uk') * mult
      })
    }
    return result
  })

  const statusOptions = computed(() => [
    { title: t('ADMIN_PLANS_FILTER_ALL'), value: '' },
    { title: t('ADMIN_PLANS_STATUS_ACTIVE'), value: 'active' },
    { title: t('ADMIN_PLANS_STATUS_HIDDEN'), value: 'hidden' },
  ])

  const updateSort = (sort: ISortState) => { sortBy.value = sort }
  const bulkActivate = () => { plans.value = plans.value.map((p) => selectedRows.value.includes(p.id) ? { ...p, status: 'active' as const } : p); selectedRows.value = [] }
  const bulkHide = () => { plans.value = plans.value.map((p) => selectedRows.value.includes(p.id) ? { ...p, status: 'hidden' as const } : p); selectedRows.value = [] }
  const bulkDelete = () => { plans.value = plans.value.filter((p) => !selectedRows.value.includes(p.id)); selectedRows.value = [] }

  return {
    plans, filters, sortBy, selectedRows,
    stats, filteredPlans, statusOptions,
    updateSort, bulkActivate, bulkHide, bulkDelete,
  }
}
