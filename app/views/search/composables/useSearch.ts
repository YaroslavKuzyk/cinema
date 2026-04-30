import type { TMediaType } from '~/components/Public/MediaDetails/index.types'
import type {
  ISearchItem,
  TSearchSort,
  TSearchTypeFilter,
} from '../domain'

const img = (id: string, w: number, h: number) =>
  `https://images.unsplash.com/${id}?w=${w}&h=${h}&fit=crop&auto=format&q=80`

const SYNC_DEBOUNCE_MS = 250

export function useSearch() {
  const { t } = useI18n()
  const route = useRoute()
  const router = useRouter()

  const query = ref<string>(String(route.query.q ?? ''))
  const typeFilter = ref<TSearchTypeFilter>(
    (route.query.type as TSearchTypeFilter | undefined) ?? 'all',
  )
  const genreFilter = ref<string>(String(route.query.genre ?? 'all'))
  const yearFilter = ref<string>(String(route.query.year ?? 'all'))
  const sort = ref<TSearchSort>((route.query.sort as TSearchSort | undefined) ?? 'rating')

  const typeLabelMap = computed<Record<TMediaType, string>>(() => ({
    movie: t('MEDIA_TYPE_MOVIE'),
    series: t('MEDIA_TYPE_SERIES'),
    anime: t('MEDIA_TYPE_ANIME'),
  }))

  const item = (
    id: string,
    type: TMediaType,
    title: string,
    image: string,
    rating: number,
    year: number,
    genres: string[],
  ): ISearchItem => ({
    id,
    type,
    title,
    image: img(image, 600, 900),
    rating,
    year,
    genres,
    typeLabel: typeLabelMap.value[type],
  })

  const allItems = computed<ISearchItem[]>(() => [
    item('interstellar-2', 'movie', t('HOME_MOVIE_INTERSTELLAR_2'), 'photo-1478720568477-152d9b164e26', 8.7, 2026, ['Sci-Fi']),
    item('interstellar', 'movie', 'Інтерстеллар', 'photo-1446776653964-20c1d3a81b06', 8.6, 2014, ['Sci-Fi']),
    item('space-around', 'movie', t('HOME_MOVIE_SPACE_AROUND'), 'photo-1440404653325-ab127d49abc1', 8.4, 2026, ['Sci-Fi']),
    item('starway', 'series', t('SEARCH_MOVIE_STARWAY'), 'photo-1534447677768-be436bb09401', 7.9, 2025, ['Sci-Fi']),
    item('beyond-horizon', 'movie', t('MY_LIST_MOVIE_HORIZON'), 'photo-1532978879514-6cb6e6a4e7c1', 8.1, 2026, [t('GENRES_ADVENTURE')]),
    item('gravity', 'movie', t('SEARCH_MOVIE_GRAVITY'), 'photo-1534447677768-be436bb09401', 7.7, 2013, ['Sci-Fi', t('GENRES_DRAMA')]),
    item('arrival', 'movie', t('SEARCH_MOVIE_ARRIVAL'), 'photo-1585951237318-9ea5e175b891', 7.9, 2016, ['Sci-Fi', t('GENRES_DRAMA')]),
    item('martian', 'movie', t('MEDIA_MOVIE_MARTIAN'), 'photo-1547234935-80c7145ec969', 8.0, 2015, ['Sci-Fi', t('GENRES_ADVENTURE')]),
    item('contact', 'movie', t('MEDIA_MOVIE_CONTACT'), 'photo-1598899134739-24c46f58b8c0', 7.5, 1997, ['Sci-Fi', t('GENRES_DRAMA')]),
    item('expanse', 'series', t('SEARCH_SERIES_EXPANSE'), 'photo-1509248961158-e54f6934749c', 8.5, 2026, ['Sci-Fi']),
    item('shadow-fire', 'movie', t('HOME_MOVIE_SHADOW_FIRE'), 'photo-1594909122845-11baa439b7bf', 7.8, 2026, [t('GENRES_THRILLER')]),
    item('aot-final', 'anime', t('MEDIA_ANIME_TITLE'), 'photo-1578632767115-351597cf2477', 9.2, 2024, [t('GENRES_ACTION'), t('GENRES_DRAMA')]),
  ])

  const typeFilterOptions = computed(() => [
    { value: 'all' as TSearchTypeFilter, label: t('SEARCH_TYPE_ALL') },
    { value: 'movie' as TSearchTypeFilter, label: t('HOME_NAV_MOVIES') },
    { value: 'series' as TSearchTypeFilter, label: t('HOME_NAV_SERIES') },
    { value: 'anime' as TSearchTypeFilter, label: t('HOME_NAV_ANIME') },
  ])

  const genreFilterOptions = computed(() => [
    { value: 'all', label: t('SEARCH_GENRE_ALL') },
    { value: 'action', label: t('GENRES_ACTION') },
    { value: 'scifi', label: 'Sci-Fi' },
    { value: 'thriller', label: t('GENRES_THRILLER') },
    { value: 'drama', label: t('GENRES_DRAMA') },
    { value: 'comedy', label: t('GENRES_COMEDY') },
  ])

  const genreLabelMap: Record<string, (item: ISearchItem) => boolean> = {
    action: i => i.genres.some(g => g.toLowerCase().includes('екш') || g.toLowerCase().includes('action')),
    scifi: i => i.genres.some(g => /sci-?fi/i.test(g)),
    thriller: i => i.genres.some(g => /трилер|thriller/i.test(g)),
    drama: i => i.genres.some(g => /драм|drama/i.test(g)),
    comedy: i => i.genres.some(g => /комед|comedy/i.test(g)),
  }

  const yearFilterOptions = computed(() => [
    { value: 'all', label: t('SEARCH_YEAR_ALL') },
    { value: '2026', label: '2026' },
    { value: '2025', label: '2025' },
    { value: '2024', label: '2024' },
  ])

  const sortOptions = computed(() => [
    { value: 'rating' as TSearchSort, label: t('SEARCH_SORT_RATING') },
    { value: 'year' as TSearchSort, label: t('SEARCH_SORT_YEAR') },
    { value: 'title' as TSearchSort, label: t('SEARCH_SORT_TITLE') },
  ])

  const popularQueries = computed(() => [
    'Інтерстеллар',
    'Attack on Titan',
    'Дюна',
    'Гра престолів',
    'Jujutsu Kaisen',
    t('HOME_MOVIE_LAST_FLIGHT'),
    'Spy x Family',
  ])

  const filtered = computed<ISearchItem[]>(() => {
    const q = query.value.trim().toLowerCase()

    let list = allItems.value.slice()

    if (q) {
      list = list.filter(i => i.title.toLowerCase().includes(q))
    }

    if (typeFilter.value !== 'all') {
      list = list.filter(i => i.type === typeFilter.value)
    }

    const genreCheck = genreLabelMap[genreFilter.value]
    if (genreCheck) {
      list = list.filter(genreCheck)
    }

    if (yearFilter.value !== 'all') {
      const y = Number(yearFilter.value)
      if (!Number.isNaN(y)) list = list.filter(i => i.year === y)
    }

    if (sort.value === 'rating') {
      list.sort((a, b) => b.rating - a.rating)
    } else if (sort.value === 'year') {
      list.sort((a, b) => b.year - a.year)
    } else {
      list.sort((a, b) => a.title.localeCompare(b.title))
    }

    return list
  })

  const hasActiveSearch = computed(() => query.value.trim().length > 0)
  const hasResults = computed(() => filtered.value.length > 0)

  function reset() {
    query.value = ''
    typeFilter.value = 'all'
    genreFilter.value = 'all'
    yearFilter.value = 'all'
    sort.value = 'rating'
  }

  function submit() {
    // Placeholder: triggers computed re-evaluation; reserved for API integration.
    syncUrl()
  }

  function usePopularQuery(value: string) {
    query.value = value
    submit()
  }

  let syncTimer: ReturnType<typeof setTimeout> | null = null
  function syncUrl() {
    if (syncTimer) clearTimeout(syncTimer)
    syncTimer = setTimeout(() => {
      const q: Record<string, string> = {}
      if (query.value.trim()) q.q = query.value.trim()
      if (typeFilter.value !== 'all') q.type = typeFilter.value
      if (genreFilter.value !== 'all') q.genre = genreFilter.value
      if (yearFilter.value !== 'all') q.year = yearFilter.value
      if (sort.value !== 'rating') q.sort = sort.value
      router.replace({ path: route.path, query: q })
    }, SYNC_DEBOUNCE_MS)
  }

  watch([query, typeFilter, genreFilter, yearFilter, sort], () => {
    syncUrl()
  })

  return {
    query,
    typeFilter,
    genreFilter,
    yearFilter,
    sort,
    filtered,
    hasActiveSearch,
    hasResults,
    typeFilterOptions,
    genreFilterOptions,
    yearFilterOptions,
    sortOptions,
    popularQueries,
    submit,
    reset,
    usePopularQuery,
  }
}
