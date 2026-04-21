export interface IMainNavItem {
  key: string
  label: string
  to: string
}

export function useMainNavigation() {
  const { t } = useI18n()

  const items = computed<IMainNavItem[]>(() => [
    { key: 'home', label: t('HOME_NAV_HOME'), to: '/' },
    { key: 'movies', label: t('HOME_NAV_MOVIES'), to: '/movies' },
    { key: 'series', label: t('HOME_NAV_SERIES'), to: '/series' },
    { key: 'anime', label: t('HOME_NAV_ANIME'), to: '/anime' },
    { key: 'genres', label: t('HOME_NAV_GENRES'), to: '/genres' },
    { key: 'my-list', label: t('HOME_NAV_MY_LIST'), to: '/my-list' },
  ])

  return { items }
}
