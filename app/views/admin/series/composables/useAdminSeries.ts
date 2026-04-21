import type { ISortState } from '~/components/System/AppTable/index.types'
import type { ISeries, ISeriesStats, ISeriesFilters } from '../domain'

export function useAdminSeries() {
  const { t } = useI18n()

  const series = ref<ISeries[]>([
    { id: '1', title: 'Гра престолів: Нова ера', studio: 'HBO', seasonsCount: 6, image: '', genre: 'Фентезі, Драма', seasons: '6 сезонів', status: 'published', views: '892K', rating: 9.1, date: '18.03.2026' },
    { id: '2', title: 'Темна сторона', studio: 'Netflix', seasonsCount: 2, image: '', genre: 'Трилер', seasons: '2 сезони', status: 'published', views: '456K', rating: 8.4, date: '15.03.2026' },
    { id: '3', title: 'Патруль', studio: 'Amazon', seasonsCount: 4, image: '', genre: 'Екшн', seasons: '4 сезони', status: 'published', views: '321K', rating: 7.9, date: '12.03.2026' },
    { id: '4', title: 'Клініка', studio: 'Apple TV+', seasonsCount: 5, image: '', genre: 'Драма', seasons: '5 сезонів', status: 'published', views: '287K', rating: 8.0, date: '10.03.2026' },
    { id: '5', title: 'За межею', studio: 'Disney+', seasonsCount: 2, image: '', genre: 'Пригоди', seasons: '2 сезони', status: 'draft', views: '', rating: null, date: '20.03.2026' },
    { id: '6', title: 'Нічне місто', studio: 'HBO', seasonsCount: 3, image: '', genre: 'Детектив', seasons: '3 сезони', status: 'published', views: '198K', rating: 7.9, date: '08.03.2026' },
    { id: '7', title: 'Код Тьюрінга', studio: 'Netflix', seasonsCount: 2, image: '', genre: 'Технотрилер', seasons: '2 сезони', status: 'moderation', views: '', rating: null, date: '20.03.2026' },
    { id: '8', title: 'Тінь вогню', studio: 'Amazon', seasonsCount: 2, image: '', genre: 'Трилер', seasons: '2 сезони', status: 'archived', views: '234K', rating: 7.8, date: '01.03.2026' },
    { id: '9', title: 'Останній рубіж', studio: 'HBO', seasonsCount: 4, image: '', genre: 'Sci-Fi', seasons: '4 сезони', status: 'published', views: '567K', rating: 8.7, date: '25.02.2026' },
    { id: '10', title: 'Династія', studio: 'Netflix', seasonsCount: 6, image: '', genre: 'Драма', seasons: '6 сезонів', status: 'published', views: '412K', rating: 8.2, date: '22.02.2026' },
    { id: '11', title: 'Привиди Праги', studio: 'HBO', seasonsCount: 1, image: '', genre: 'Містика', seasons: '1 сезон', status: 'published', views: '189K', rating: 8.5, date: '20.02.2026' },
    { id: '12', title: 'Кібермісто', studio: 'Amazon', seasonsCount: 3, image: '', genre: 'Sci-Fi', seasons: '3 сезони', status: 'published', views: '345K', rating: 8.3, date: '18.02.2026' },
    { id: '13', title: 'Холодна кров', studio: 'Netflix', seasonsCount: 2, image: '', genre: 'Кримінал', seasons: '2 сезони', status: 'published', views: '267K', rating: 7.6, date: '15.02.2026' },
    { id: '14', title: 'Відлуння', studio: 'Apple TV+', seasonsCount: 1, image: '', genre: 'Трилер', seasons: '1 сезон', status: 'published', views: '156K', rating: 8.1, date: '12.02.2026' },
    { id: '15', title: 'Новий світ', studio: 'Disney+', seasonsCount: 3, image: '', genre: 'Фентезі', seasons: '3 сезони', status: 'published', views: '298K', rating: 7.7, date: '10.02.2026' },
    { id: '16', title: 'Межа закону', studio: 'HBO', seasonsCount: 5, image: '', genre: 'Кримінал', seasons: '5 сезонів', status: 'published', views: '478K', rating: 8.8, date: '05.02.2026' },
    { id: '17', title: 'Сигнал', studio: 'Netflix', seasonsCount: 1, image: '', genre: 'Sci-Fi', seasons: '1 сезон', status: 'draft', views: '', rating: null, date: '22.03.2026' },
    { id: '18', title: 'Королівство', studio: 'Amazon', seasonsCount: 4, image: '', genre: 'Фентезі', seasons: '4 сезони', status: 'published', views: '389K', rating: 8.6, date: '01.02.2026' },
    { id: '19', title: 'Паралельні', studio: 'Apple TV+', seasonsCount: 2, image: '', genre: 'Sci-Fi', seasons: '2 сезони', status: 'published', views: '201K', rating: 8.0, date: '28.01.2026' },
    { id: '20', title: 'Темний ліс', studio: 'Netflix', seasonsCount: 3, image: '', genre: 'Містика', seasons: '3 сезони', status: 'published', views: '312K', rating: 8.4, date: '25.01.2026' },
    { id: '21', title: 'Зоряний шлях', studio: 'HBO', seasonsCount: 2, image: '', genre: 'Sci-Fi', seasons: '2 сезони', status: 'moderation', views: '', rating: null, date: '25.03.2026' },
    { id: '22', title: 'Вулиці Чикаго', studio: 'Amazon', seasonsCount: 7, image: '', genre: 'Кримінал', seasons: '7 сезонів', status: 'published', views: '534K', rating: 7.5, date: '20.01.2026' },
    { id: '23', title: 'Поклик волі', studio: 'Disney+', seasonsCount: 2, image: '', genre: 'Пригоди', seasons: '2 сезони', status: 'published', views: '178K', rating: 7.3, date: '15.01.2026' },
    { id: '24', title: 'Четвертий вимір', studio: 'Netflix', seasonsCount: 4, image: '', genre: 'Sci-Fi', seasons: '4 сезони', status: 'published', views: '423K', rating: 8.9, date: '10.01.2026' },
    { id: '25', title: 'Клан', studio: 'HBO', seasonsCount: 3, image: '', genre: 'Драма', seasons: '3 сезони', status: 'published', views: '267K', rating: 8.1, date: '05.01.2026' },
    { id: '26', title: 'Операція Фенікс', studio: 'Amazon', seasonsCount: 2, image: '', genre: 'Екшн', seasons: '2 сезони', status: 'draft', views: '', rating: null, date: '28.03.2026' },
    { id: '27', title: 'Вічне місто', studio: 'Apple TV+', seasonsCount: 1, image: '', genre: 'Історичний', seasons: '1 сезон', status: 'published', views: '145K', rating: 8.3, date: '01.01.2026' },
    { id: '28', title: 'Тіні минулого', studio: 'Netflix', seasonsCount: 2, image: '', genre: 'Трилер', seasons: '2 сезони', status: 'published', views: '198K', rating: 7.7, date: '28.12.2025' },
    { id: '29', title: 'Заборонена зона', studio: 'HBO', seasonsCount: 3, image: '', genre: 'Екшн', seasons: '3 сезони', status: 'published', views: '356K', rating: 8.0, date: '25.12.2025' },
    { id: '30', title: 'Дзеркало душі', studio: 'Disney+', seasonsCount: 1, image: '', genre: 'Драма', seasons: '1 сезон', status: 'published', views: '134K', rating: 7.9, date: '20.12.2025' },
    { id: '31', title: 'Архіпелаг', studio: 'Amazon', seasonsCount: 2, image: '', genre: 'Пригоди', seasons: '2 сезони', status: 'published', views: '212K', rating: 7.4, date: '15.12.2025' },
    { id: '32', title: 'Нульова точка', studio: 'Netflix', seasonsCount: 5, image: '', genre: 'Sci-Fi', seasons: '5 сезонів', status: 'published', views: '489K', rating: 8.5, date: '10.12.2025' },
    { id: '33', title: 'Останній шанс', studio: 'HBO', seasonsCount: 2, image: '', genre: 'Драма', seasons: '2 сезони', status: 'published', views: '167K', rating: 7.8, date: '05.12.2025' },
    { id: '34', title: 'Полум\'я', studio: 'Apple TV+', seasonsCount: 3, image: '', genre: 'Екшн', seasons: '3 сезони', status: 'published', views: '278K', rating: 8.2, date: '01.12.2025' },
    { id: '35', title: 'Загублені файли', studio: 'Netflix', seasonsCount: 1, image: '', genre: 'Детектив', seasons: '1 сезон', status: 'draft', views: '', rating: null, date: '30.03.2026' },
    { id: '36', title: 'Острів', studio: 'Amazon', seasonsCount: 2, image: '', genre: 'Містика', seasons: '2 сезони', status: 'published', views: '189K', rating: 8.0, date: '25.11.2025' },
    { id: '37', title: 'Протокол', studio: 'HBO', seasonsCount: 4, image: '', genre: 'Технотрилер', seasons: '4 сезони', status: 'published', views: '345K', rating: 8.4, date: '20.11.2025' },
    { id: '38', title: 'Світло у темряві', studio: 'Disney+', seasonsCount: 1, image: '', genre: 'Драма', seasons: '1 сезон', status: 'published', views: '112K', rating: 7.6, date: '15.11.2025' },
    { id: '39', title: 'Кордон', studio: 'Netflix', seasonsCount: 3, image: '', genre: 'Кримінал', seasons: '3 сезони', status: 'published', views: '234K', rating: 7.9, date: '10.11.2025' },
    { id: '40', title: 'Спадок', studio: 'HBO', seasonsCount: 5, image: '', genre: 'Драма', seasons: '5 сезонів', status: 'published', views: '567K', rating: 9.0, date: '05.11.2025' },
    { id: '41', title: 'Магнат', studio: 'Amazon', seasonsCount: 3, image: '', genre: 'Драма', seasons: '3 сезони', status: 'published', views: '298K', rating: 8.1, date: '01.11.2025' },
    { id: '42', title: 'Таємний агент', studio: 'Apple TV+', seasonsCount: 2, image: '', genre: 'Екшн', seasons: '2 сезони', status: 'published', views: '201K', rating: 7.7, date: '28.10.2025' },
    { id: '43', title: 'Цитадель', studio: 'Netflix', seasonsCount: 2, image: '', genre: 'Sci-Fi', seasons: '2 сезони', status: 'published', views: '178K', rating: 7.5, date: '25.10.2025' },
    { id: '44', title: 'Провісник', studio: 'HBO', seasonsCount: 1, image: '', genre: 'Містика', seasons: '1 сезон', status: 'published', views: '145K', rating: 8.3, date: '20.10.2025' },
    { id: '45', title: 'Фронтір', studio: 'Amazon', seasonsCount: 3, image: '', genre: 'Історичний', seasons: '3 сезони', status: 'published', views: '223K', rating: 7.8, date: '15.10.2025' },
    { id: '46', title: 'Ребут', studio: 'Disney+', seasonsCount: 1, image: '', genre: 'Комедія', seasons: '1 сезон', status: 'published', views: '167K', rating: 7.2, date: '10.10.2025' },
    { id: '47', title: 'Карантин', studio: 'Netflix', seasonsCount: 2, image: '', genre: 'Трилер', seasons: '2 сезони', status: 'published', views: '289K', rating: 8.0, date: '05.10.2025' },
    { id: '48', title: 'Рубікон', studio: 'HBO', seasonsCount: 4, image: '', genre: 'Кримінал', seasons: '4 сезони', status: 'published', views: '412K', rating: 8.6, date: '01.10.2025' },
    { id: '49', title: 'Горизонт', studio: 'Apple TV+', seasonsCount: 2, image: '', genre: 'Пригоди', seasons: '2 сезони', status: 'published', views: '156K', rating: 7.4, date: '28.09.2025' },
    { id: '50', title: 'Слід', studio: 'Amazon', seasonsCount: 3, image: '', genre: 'Детектив', seasons: '3 сезони', status: 'published', views: '234K', rating: 8.2, date: '25.09.2025' },
    { id: '51', title: 'Легіон', studio: 'Netflix', seasonsCount: 2, image: '', genre: 'Sci-Fi', seasons: '2 сезони', status: 'published', views: '189K', rating: 7.9, date: '20.09.2025' },
    { id: '52', title: 'Варта', studio: 'HBO', seasonsCount: 6, image: '', genre: 'Фентезі', seasons: '6 сезонів', status: 'published', views: '623K', rating: 8.8, date: '15.09.2025' },
    { id: '53', title: 'Реванш', studio: 'Disney+', seasonsCount: 2, image: '', genre: 'Екшн', seasons: '2 сезони', status: 'published', views: '178K', rating: 7.6, date: '10.09.2025' },
    { id: '54', title: 'Контакт', studio: 'Amazon', seasonsCount: 1, image: '', genre: 'Sci-Fi', seasons: '1 сезон', status: 'published', views: '134K', rating: 8.1, date: '05.09.2025' },
    { id: '55', title: 'Перехрестя', studio: 'Netflix', seasonsCount: 4, image: '', genre: 'Кримінал', seasons: '4 сезони', status: 'published', views: '356K', rating: 8.3, date: '01.09.2025' },
    { id: '56', title: 'Крила', studio: 'HBO', seasonsCount: 2, image: '', genre: 'Драма', seasons: '2 сезони', status: 'published', views: '198K', rating: 7.8, date: '28.08.2025' },
    { id: '57', title: 'Лабіринт', studio: 'Apple TV+', seasonsCount: 3, image: '', genre: 'Містика', seasons: '3 сезони', status: 'published', views: '245K', rating: 8.5, date: '25.08.2025' },
    { id: '58', title: 'Наслідки', studio: 'Amazon', seasonsCount: 2, image: '', genre: 'Трилер', seasons: '2 сезони', status: 'published', views: '167K', rating: 7.7, date: '20.08.2025' },
    { id: '59', title: 'Мережа', studio: 'Netflix', seasonsCount: 3, image: '', genre: 'Технотрилер', seasons: '3 сезони', status: 'published', views: '289K', rating: 8.0, date: '15.08.2025' },
    { id: '60', title: 'Хроніки', studio: 'HBO', seasonsCount: 5, image: '', genre: 'Фентезі', seasons: '5 сезонів', status: 'published', views: '512K', rating: 8.7, date: '10.08.2025' },
    { id: '61', title: 'Арена', studio: 'Disney+', seasonsCount: 2, image: '', genre: 'Екшн', seasons: '2 сезони', status: 'published', views: '145K', rating: 7.3, date: '05.08.2025' },
    { id: '62', title: 'Обрій', studio: 'Amazon', seasonsCount: 1, image: '', genre: 'Драма', seasons: '1 сезон', status: 'published', views: '112K', rating: 7.9, date: '01.08.2025' },
    { id: '63', title: 'Маяк', studio: 'Netflix', seasonsCount: 2, image: '', genre: 'Містика', seasons: '2 сезони', status: 'published', views: '178K', rating: 8.2, date: '28.07.2025' },
    { id: '64', title: 'Імперія', studio: 'HBO', seasonsCount: 4, image: '', genre: 'Драма', seasons: '4 сезони', status: 'published', views: '445K', rating: 8.6, date: '25.07.2025' },
  ])

  const filters = reactive<ISeriesFilters>({ search: '', genre: '', status: '', seasons: '' })
  const sortBy = ref<ISortState>({ key: 'date', direction: 'desc' })
  const selectedRows = ref<string[]>([])
  const currentPage = ref(1)
  const itemsPerPage = ref(10)

  const stats = computed<ISeriesStats>(() => {
    const all = series.value
    const published = all.filter((s) => s.status === 'published')
    const totalViews = published.reduce((sum, s) => sum + (parseInt(s.views.replace('K', '')) || 0), 0)
    const rated = published.filter((s) => s.rating !== null)
    const avgRating = rated.length ? +(rated.reduce((sum, s) => sum + (s.rating || 0), 0) / rated.length).toFixed(1) : 0
    return {
      total: all.length,
      published: published.length,
      drafts: all.filter((s) => s.status === 'draft').length,
      moderation: all.filter((s) => s.status === 'moderation').length,
      views: `${totalViews}K`,
      avgRating,
    }
  })

  const filteredSeries = computed(() => {
    let result = series.value.filter((item) => {
      const matchesSearch = !filters.search || item.title.toLowerCase().includes(filters.search.toLowerCase()) || item.studio.toLowerCase().includes(filters.search.toLowerCase())
      const matchesGenre = !filters.genre || item.genre.includes(filters.genre)
      const matchesStatus = !filters.status || item.status === filters.status
      const matchesSeasons = !filters.seasons || item.seasons.startsWith(filters.seasons)
      return matchesSearch && matchesGenre && matchesStatus && matchesSeasons
    })
    if (sortBy.value) {
      const { key, direction } = sortBy.value
      const mult = direction === 'asc' ? 1 : -1
      result = [...result].sort((a, b) => {
        const aVal = a[key as keyof ISeries]; const bVal = b[key as keyof ISeries]
        if (aVal === null && bVal === null) return 0
        if (aVal === null) return 1
        if (bVal === null) return -1
        if (typeof aVal === 'number' && typeof bVal === 'number') return (aVal - bVal) * mult
        return String(aVal).localeCompare(String(bVal), 'uk') * mult
      })
    }
    return result
  })

  const paginatedSeries = computed(() => {
    const start = (currentPage.value - 1) * itemsPerPage.value
    return filteredSeries.value.slice(start, start + itemsPerPage.value)
  })

  const genreOptions = computed(() => [
    { title: t('ADMIN_SERIES_FILTER_ALL'), value: '' },
    { title: 'Драма', value: 'Драма' },
    { title: 'Трилер', value: 'Трилер' },
    { title: 'Екшн', value: 'Екшн' },
    { title: 'Sci-Fi', value: 'Sci-Fi' },
    { title: 'Фентезі', value: 'Фентезі' },
    { title: 'Кримінал', value: 'Кримінал' },
    { title: 'Містика', value: 'Містика' },
    { title: 'Детектив', value: 'Детектив' },
    { title: 'Пригоди', value: 'Пригоди' },
    { title: 'Комедія', value: 'Комедія' },
    { title: 'Історичний', value: 'Історичний' },
    { title: 'Технотрилер', value: 'Технотрилер' },
  ])

  const statusOptions = computed(() => [
    { title: t('ADMIN_SERIES_FILTER_ALL'), value: '' },
    { title: t('ADMIN_SERIES_STATUS_PUBLISHED'), value: 'published' },
    { title: t('ADMIN_SERIES_STATUS_MODERATION'), value: 'moderation' },
    { title: t('ADMIN_SERIES_STATUS_DRAFT'), value: 'draft' },
    { title: t('ADMIN_SERIES_STATUS_ARCHIVED'), value: 'archived' },
  ])

  const seasonsOptions = computed(() => [
    { title: t('ADMIN_SERIES_FILTER_ALL'), value: '' },
    { title: '1', value: '1' },
    { title: '2', value: '2' },
    { title: '3', value: '3' },
    { title: '4', value: '4' },
    { title: '5+', value: '5' },
  ])

  const updateSort = (sort: ISortState) => { sortBy.value = sort }

  const bulkPublish = () => { series.value = series.value.map((s) => selectedRows.value.includes(s.id) ? { ...s, status: 'published' as const } : s); selectedRows.value = [] }
  const bulkArchive = () => { series.value = series.value.map((s) => selectedRows.value.includes(s.id) ? { ...s, status: 'archived' as const } : s); selectedRows.value = [] }
  const bulkDelete = () => { series.value = series.value.filter((s) => !selectedRows.value.includes(s.id)); selectedRows.value = [] }

  return {
    series, filters, sortBy, selectedRows, currentPage, itemsPerPage,
    stats, filteredSeries, paginatedSeries,
    genreOptions, statusOptions, seasonsOptions,
    updateSort, bulkPublish, bulkArchive, bulkDelete,
  }
}
