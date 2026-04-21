import type { ISortState } from '~/components/System/AppTable/index.types'
import type { IAnime, IAnimeStats, IAnimeFilters } from '../domain'

export function useAdminAnime() {
  const { t } = useI18n()

  const anime = ref<IAnime[]>([
    { id: '1', title: 'Attack on Titan: Фінал', studio: 'MAPPA', episodes: 87, image: '', genres: 'Shonen, Екшн', seasons: '4 сезони', status: 'published', views: '521K', rating: 9.2, date: '18.03.2026' },
    { id: '2', title: 'Jujutsu Kaisen S3', studio: 'MAPPA', episodes: 72, image: '', genres: 'Shonen', seasons: '3 сезони', status: 'moderation', views: '', rating: null, date: '20.03.2026' },
    { id: '3', title: 'Demon Slayer', studio: 'ufotable', episodes: 55, image: '', genres: 'Shonen', seasons: '4 сезони', status: 'published', views: '412K', rating: 8.9, date: '15.03.2026' },
    { id: '4', title: 'Chainsaw Man', studio: 'MAPPA', episodes: 24, image: '', genres: 'Seinen', seasons: '2 сезони', status: 'published', views: '345K', rating: 8.7, date: '12.03.2026' },
    { id: '5', title: 'Spy x Family', studio: 'WIT Studio', episodes: 37, image: '', genres: 'Комедія', seasons: '3 сезони', status: 'published', views: '298K', rating: 8.3, date: '10.03.2026' },
    { id: '6', title: 'Vinland Saga', studio: 'MAPPA', episodes: 48, image: '', genres: 'Seinen', seasons: '2 сезони', status: 'published', views: '234K', rating: 8.8, date: '08.03.2026' },
    { id: '7', title: 'One Punch Man S3', studio: 'J.C.Staff', episodes: 36, image: '', genres: 'Shonen', seasons: '3 сезони', status: 'draft', views: '', rating: null, date: '20.03.2026' },
    { id: '8', title: 'Mob Psycho 100', studio: 'Bones', episodes: 37, image: '', genres: 'Shonen', seasons: '3 сезони', status: 'published', views: '187K', rating: 8.5, date: '05.03.2026' },
    { id: '9', title: 'My Hero Academia S7', studio: 'Bones', episodes: 150, image: '', genres: 'Shonen', seasons: '7 сезонів', status: 'published', views: '456K', rating: 8.1, date: '01.03.2026' },
    { id: '10', title: 'Tokyo Revengers S3', studio: 'LIDENFILMS', episodes: 50, image: '', genres: 'Shonen', seasons: '3 сезони', status: 'published', views: '178K', rating: 7.8, date: '25.02.2026' },
    { id: '11', title: 'Bleach: TYBW', studio: 'Pierrot', episodes: 52, image: '', genres: 'Shonen', seasons: '4 сезони', status: 'published', views: '389K', rating: 8.6, date: '22.02.2026' },
    { id: '12', title: 'Solo Leveling', studio: 'A-1 Pictures', episodes: 12, image: '', genres: 'Shonen, Екшн', seasons: '1 сезон', status: 'published', views: '312K', rating: 8.4, date: '20.02.2026' },
    { id: '13', title: 'Frieren', studio: 'Madhouse', episodes: 28, image: '', genres: 'Фентезі', seasons: '1 сезон', status: 'published', views: '267K', rating: 9.0, date: '18.02.2026' },
    { id: '14', title: 'Oshi no Ko S2', studio: 'Doga Kobo', episodes: 24, image: '', genres: 'Драма', seasons: '2 сезони', status: 'published', views: '198K', rating: 8.2, date: '15.02.2026' },
    { id: '15', title: 'Mushoku Tensei S3', studio: 'Studio Bind', episodes: 36, image: '', genres: 'Фентезі', seasons: '3 сезони', status: 'moderation', views: '', rating: null, date: '22.03.2026' },
    { id: '16', title: 'Dr. Stone S4', studio: 'TMS Entertainment', episodes: 48, image: '', genres: 'Shonen', seasons: '4 сезони', status: 'published', views: '145K', rating: 8.0, date: '10.02.2026' },
    { id: '17', title: 'Black Clover: Sword', studio: 'Pierrot', episodes: 170, image: '', genres: 'Shonen', seasons: '5 сезонів', status: 'published', views: '289K', rating: 7.9, date: '05.02.2026' },
    { id: '18', title: 'Dandadan', studio: 'Science SARU', episodes: 12, image: '', genres: 'Shonen, Комедія', seasons: '1 сезон', status: 'published', views: '156K', rating: 8.3, date: '01.02.2026' },
    { id: '19', title: 'Kaiju No. 8', studio: 'Production I.G', episodes: 12, image: '', genres: 'Shonen, Екшн', seasons: '1 сезон', status: 'draft', views: '', rating: null, date: '25.03.2026' },
    { id: '20', title: 'Hell\'s Paradise', studio: 'MAPPA', episodes: 26, image: '', genres: 'Shonen', seasons: '2 сезони', status: 'published', views: '134K', rating: 7.7, date: '28.01.2026' },
    { id: '21', title: 'Haikyuu!! Movie', studio: 'Production I.G', episodes: 1, image: '', genres: 'Спорт', seasons: '1 фільм', status: 'published', views: '98K', rating: 8.9, date: '25.01.2026' },
    { id: '22', title: 'Blue Lock S2', studio: 'Eight Bit', episodes: 24, image: '', genres: 'Спорт', seasons: '2 сезони', status: 'published', views: '201K', rating: 8.1, date: '20.01.2026' },
    { id: '23', title: 'Overlord S5', studio: 'Madhouse', episodes: 52, image: '', genres: 'Фентезі', seasons: '5 сезонів', status: 'draft', views: '', rating: null, date: '28.03.2026' },
    { id: '24', title: 'Re:Zero S3', studio: 'White Fox', episodes: 50, image: '', genres: 'Фентезі', seasons: '3 сезони', status: 'published', views: '276K', rating: 8.6, date: '15.01.2026' },
    { id: '25', title: 'Sword Art Online Progressive', studio: 'A-1 Pictures', episodes: 48, image: '', genres: 'Фентезі, Екшн', seasons: '2 сезони', status: 'published', views: '189K', rating: 7.5, date: '10.01.2026' },
    { id: '26', title: 'Konosuba S3', studio: 'Drive', episodes: 30, image: '', genres: 'Комедія, Фентезі', seasons: '3 сезони', status: 'published', views: '167K', rating: 8.0, date: '05.01.2026' },
    { id: '27', title: 'Made in Abyss S3', studio: 'Kinema Citrus', episodes: 25, image: '', genres: 'Фентезі', seasons: '3 сезони', status: 'published', views: '145K', rating: 8.7, date: '01.01.2026' },
    { id: '28', title: 'Berserk: New Arc', studio: 'Studio 4°C', episodes: 12, image: '', genres: 'Seinen', seasons: '1 сезон', status: 'published', views: '112K', rating: 8.4, date: '28.12.2025' },
  ])

  const filters = reactive<IAnimeFilters>({
    search: '',
    genre: '',
    status: '',
    seasons: '',
  })

  const sortBy = ref<ISortState>({ key: 'date', direction: 'desc' })
  const selectedRows = ref<string[]>([])
  const currentPage = ref(1)
  const itemsPerPage = ref(10)

  const stats = computed<IAnimeStats>(() => {
    const all = anime.value
    const published = all.filter((a) => a.status === 'published')
    const totalViews = published.reduce((sum, a) => {
      const num = parseInt(a.views.replace('K', ''))
      return sum + (isNaN(num) ? 0 : num)
    }, 0)
    const rated = published.filter((a) => a.rating !== null)
    const avgRating = rated.length ? +(rated.reduce((sum, a) => sum + (a.rating || 0), 0) / rated.length).toFixed(1) : 0

    return {
      total: all.length,
      published: published.length,
      drafts: all.filter((a) => a.status === 'draft').length,
      moderation: all.filter((a) => a.status === 'moderation').length,
      views: `${totalViews}K`,
      avgRating,
    }
  })

  const filteredAnime = computed(() => {
    let result = anime.value.filter((item) => {
      const matchesSearch = !filters.search
        || item.title.toLowerCase().includes(filters.search.toLowerCase())
        || item.studio.toLowerCase().includes(filters.search.toLowerCase())

      const matchesGenre = !filters.genre || item.genres.includes(filters.genre)
      const matchesStatus = !filters.status || item.status === filters.status
      const matchesSeasons = !filters.seasons || item.seasons.startsWith(filters.seasons)

      return matchesSearch && matchesGenre && matchesStatus && matchesSeasons
    })

    if (sortBy.value) {
      const { key, direction } = sortBy.value
      const mult = direction === 'asc' ? 1 : -1
      result = [...result].sort((a, b) => {
        const aVal = a[key as keyof IAnime]
        const bVal = b[key as keyof IAnime]
        if (aVal === null && bVal === null) return 0
        if (aVal === null) return 1
        if (bVal === null) return -1
        if (typeof aVal === 'number' && typeof bVal === 'number') return (aVal - bVal) * mult
        return String(aVal).localeCompare(String(bVal), 'uk') * mult
      })
    }

    return result
  })

  const paginatedAnime = computed(() => {
    const start = (currentPage.value - 1) * itemsPerPage.value
    return filteredAnime.value.slice(start, start + itemsPerPage.value)
  })

  const genreOptions = computed(() => [
    { title: t('ADMIN_ANIME_FILTER_ALL'), value: '' },
    { title: 'Shonen', value: 'Shonen' },
    { title: 'Seinen', value: 'Seinen' },
    { title: 'Комедія', value: 'Комедія' },
    { title: 'Фентезі', value: 'Фентезі' },
    { title: 'Драма', value: 'Драма' },
    { title: 'Екшн', value: 'Екшн' },
    { title: 'Спорт', value: 'Спорт' },
  ])

  const statusOptions = computed(() => [
    { title: t('ADMIN_ANIME_FILTER_ALL'), value: '' },
    { title: t('ADMIN_ANIME_STATUS_PUBLISHED'), value: 'published' },
    { title: t('ADMIN_ANIME_STATUS_MODERATION'), value: 'moderation' },
    { title: t('ADMIN_ANIME_STATUS_DRAFT'), value: 'draft' },
  ])

  const seasonsOptions = computed(() => [
    { title: t('ADMIN_ANIME_FILTER_ALL'), value: '' },
    { title: '1', value: '1' },
    { title: '2', value: '2' },
    { title: '3', value: '3' },
    { title: '4', value: '4' },
    { title: '5+', value: '5' },
  ])

  const updateSort = (sort: ISortState) => {
    sortBy.value = sort
  }

  const bulkPublish = () => {
    anime.value = anime.value.map((a) =>
      selectedRows.value.includes(a.id) ? { ...a, status: 'published' as const } : a,
    )
    selectedRows.value = []
  }

  const bulkArchive = () => {
    anime.value = anime.value.map((a) =>
      selectedRows.value.includes(a.id) ? { ...a, status: 'draft' as const } : a,
    )
    selectedRows.value = []
  }

  const bulkDelete = () => {
    anime.value = anime.value.filter((a) => !selectedRows.value.includes(a.id))
    selectedRows.value = []
  }

  return {
    anime,
    filters,
    sortBy,
    selectedRows,
    currentPage,
    itemsPerPage,
    stats,
    filteredAnime,
    paginatedAnime,
    genreOptions,
    statusOptions,
    seasonsOptions,
    updateSort,
    bulkPublish,
    bulkArchive,
    bulkDelete,
  }
}
