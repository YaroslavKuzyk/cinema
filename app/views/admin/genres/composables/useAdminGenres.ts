import type { ISortState } from '~/components/System/AppTable/index.types'
import type { IGenre, IGenreStats, IGenreFilters } from '../domain'

export function useAdminGenres() {
  const { t } = useI18n()

  const genres = ref<IGenre[]>([
    { id: '1', name: 'Екшн', description: 'Бойовики, перестрілки, гонитви', icon: '🔥', color: '#e50914', slug: 'action', status: 'active', moviesCount: 342, seriesCount: 87, animeCount: 64 },
    { id: '2', name: 'Sci-Fi та фантастика', description: 'Космос, майбутнє, технології', icon: '🚀', color: '#3b82f6', slug: 'sci-fi', status: 'active', moviesCount: 256, seriesCount: 64, animeCount: 128 },
    { id: '3', name: 'Трилер', description: 'Напруга, саспенс, детективи', icon: '😈', color: '#fbbf24', slug: 'thriller', status: 'active', moviesCount: 289, seriesCount: 56, animeCount: 12 },
    { id: '4', name: 'Драма', description: 'Людські історії, конфлікти', icon: '🎭', color: '#a855f7', slug: 'drama', status: 'active', moviesCount: 521, seriesCount: 134, animeCount: 45 },
    { id: '5', name: 'Комедія', description: 'Гумор, пародії, ситкоми', icon: '😂', color: '#22c55e', slug: 'comedy', status: 'active', moviesCount: 412, seriesCount: 98, animeCount: 34 },
    { id: '6', name: 'Жахи', description: 'Хорор, містика, страшні історії', icon: '👻', color: '#ef4444', slug: 'horror', status: 'active', moviesCount: 198, seriesCount: 42, animeCount: 18 },
    { id: '7', name: 'Романтика', description: 'Любов, стосунки, почуття', icon: '💕', color: '#ec4899', slug: 'romance', status: 'active', moviesCount: 367, seriesCount: 89, animeCount: 56 },
    { id: '8', name: 'Анімація', description: 'Мультфільми, анімаційні серіали', icon: '🎨', color: '#f97316', slug: 'animation', status: 'active', moviesCount: 234, seriesCount: 67, animeCount: 312 },
    { id: '9', name: 'Документальний', description: 'Реальні події, наука, природа', icon: '📚', color: '#0ea5e9', slug: 'documentary', status: 'active', moviesCount: 156, seriesCount: 78, animeCount: 0 },
    { id: '10', name: 'Пригоди', description: 'Подорожі, відкриття, квести', icon: '🗺️', color: '#14b8a6', slug: 'adventure', status: 'active', moviesCount: 278, seriesCount: 45, animeCount: 89 },
    { id: '11', name: 'Кримінал', description: 'Злочини, розслідування, мафія', icon: '🔍', color: '#6366f1', slug: 'crime', status: 'active', moviesCount: 189, seriesCount: 67, animeCount: 8 },
    { id: '12', name: 'Фентезі', description: 'Магія, дракони, інші світи', icon: '🐉', color: '#8b5cf6', slug: 'fantasy', status: 'active', moviesCount: 145, seriesCount: 34, animeCount: 156 },
    { id: '13', name: 'Історичний', description: 'Минулі епохи, реальні події', icon: '⚔️', color: '#78716c', slug: 'historical', status: 'active', moviesCount: 98, seriesCount: 23, animeCount: 5 },
    { id: '14', name: 'Містика', description: 'Паранормальне, загадки', icon: '🌙', color: '#6366f1', slug: 'mystery', status: 'hidden', moviesCount: 112, seriesCount: 24, animeCount: 31 },
    { id: '15', name: 'Спортивні', description: 'Спорт, змагання, мотивація', icon: '🌟', color: '#14b8a6', slug: 'sports', status: 'active', moviesCount: 89, seriesCount: 18, animeCount: 12 },
    { id: '16', name: 'Мюзикл', description: 'Музика, танці, вистави', icon: '🎵', color: '#f97316', slug: 'musical', status: 'hidden', moviesCount: 67, seriesCount: 12, animeCount: 4 },
  ])

  const filters = reactive<IGenreFilters>({
    search: '',
    status: '',
    sort: '',
  })

  const sortBy = ref<ISortState>({ key: 'name', direction: 'asc' })
  const selectedRows = ref<string[]>([])
  const currentPage = ref(1)
  const itemsPerPage = ref(20)

  const stats = computed<IGenreStats>(() => {
    const allGenres = genres.value
    const totalContent = allGenres.reduce((sum, g) => sum + g.moviesCount + g.seriesCount + g.animeCount, 0)
    return {
      total: allGenres.length,
      active: allGenres.filter((g) => g.status === 'active').length,
      hidden: allGenres.filter((g) => g.status === 'hidden').length,
      popular: allGenres.filter((g) => g.moviesCount + g.seriesCount + g.animeCount > 300).length,
      totalContent,
    }
  })

  const filteredGenres = computed(() => {
    let result = genres.value.filter((genre) => {
      const matchesSearch = !filters.search
        || genre.name.toLowerCase().includes(filters.search.toLowerCase())
        || genre.description.toLowerCase().includes(filters.search.toLowerCase())
        || genre.slug.toLowerCase().includes(filters.search.toLowerCase())

      const matchesStatus = !filters.status || genre.status === filters.status

      return matchesSearch && matchesStatus
    })

    if (sortBy.value) {
      const { key, direction } = sortBy.value
      const mult = direction === 'asc' ? 1 : -1
      result = [...result].sort((a, b) => {
        const aVal = a[key as keyof IGenre]
        const bVal = b[key as keyof IGenre]
        if (typeof aVal === 'number' && typeof bVal === 'number') {
          return (aVal - bVal) * mult
        }
        return String(aVal).localeCompare(String(bVal), 'uk') * mult
      })
    }

    return result
  })

  const paginatedGenres = computed(() => {
    const start = (currentPage.value - 1) * itemsPerPage.value
    return filteredGenres.value.slice(start, start + itemsPerPage.value)
  })

  const statusOptions = computed(() => [
    { title: t('ADMIN_GENRES_FILTER_STATUS_ALL'), value: '' },
    { title: t('ADMIN_GENRES_FILTER_STATUS_ACTIVE'), value: 'active' },
    { title: t('ADMIN_GENRES_FILTER_STATUS_HIDDEN'), value: 'hidden' },
  ])

  const updateSort = (sort: ISortState) => {
    sortBy.value = sort
  }

  const bulkActivate = () => {
    genres.value = genres.value.map((g) =>
      selectedRows.value.includes(g.id) ? { ...g, status: 'active' as const } : g,
    )
    selectedRows.value = []
  }

  const bulkHide = () => {
    genres.value = genres.value.map((g) =>
      selectedRows.value.includes(g.id) ? { ...g, status: 'hidden' as const } : g,
    )
    selectedRows.value = []
  }

  const bulkDelete = () => {
    genres.value = genres.value.filter((g) => !selectedRows.value.includes(g.id))
    selectedRows.value = []
  }

  const formatNumber = (num: number) => num.toLocaleString('uk-UA')

  return {
    genres,
    filters,
    selectedRows,
    currentPage,
    itemsPerPage,
    stats,
    filteredGenres,
    paginatedGenres,
    sortBy,
    statusOptions,
    updateSort,
    bulkActivate,
    bulkHide,
    bulkDelete,
    formatNumber,
  }
}
