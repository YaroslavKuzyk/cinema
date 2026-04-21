import type { ISortState } from '~/components/System/AppTable/index.types'
import type { IMovie, IMovieStats, IMovieFilters } from '../domain'

export function useAdminMovies() {
  const { t } = useI18n()

  const movies = ref<IMovie[]>([
    { id: '1', title: 'Інтерстеллар 2', director: 'Christopher Nolan', duration: 165, image: '', genre: 'Sci-Fi, Драма', year: 2026, status: 'published', views: '1.2M', rating: 8.7 },
    { id: '2', title: 'Останній рейс', director: 'Michael Bay', duration: 148, image: '', genre: 'Екшн', year: 2026, status: 'published', views: '654K', rating: 8.2 },
    { id: '3', title: 'Серце океану', director: 'James Cameron', duration: 132, image: '', genre: 'Драма', year: 2026, status: 'draft', views: '', rating: null },
    { id: '4', title: 'Космос навколо', director: 'Ridley Scott', duration: 142, image: '', genre: 'Sci-Fi, Пригоди', year: 2026, status: 'published', views: '421K', rating: 8.4 },
    { id: '5', title: 'Точка удару', director: 'Guy Ritchie', duration: 128, image: '', genre: 'Екшн', year: 2025, status: 'published', views: '312K', rating: 7.6 },
    { id: '6', title: 'Сигнал з Марса', director: 'Denis Villeneuve', duration: 155, image: '', genre: 'Sci-Fi', year: 2026, status: 'moderation', views: '', rating: null },
    { id: '7', title: 'За горизонтом', director: 'Steven Spielberg', duration: 156, image: '', genre: 'Пригоди', year: 2026, status: 'published', views: '287K', rating: 8.1 },
    { id: '8', title: 'Нічне місто', director: 'David Fincher', duration: 128, image: '', genre: 'Детектив', year: 2026, status: 'published', views: '198K', rating: 7.9 },
    { id: '9', title: 'Загублений код', director: 'Christopher McQuarrie', duration: 138, image: '', genre: 'Екшн', year: 2026, status: 'draft', views: '', rating: null },
    { id: '10', title: 'Марсіанин', director: 'Ridley Scott', duration: 144, image: '', genre: 'Sci-Fi', year: 2015, status: 'published', views: '156K', rating: 8.0 },
    { id: '11', title: 'Тіні Берліна', director: 'Martin Scorsese', duration: 178, image: '', genre: 'Трилер', year: 2026, status: 'published', views: '534K', rating: 8.9 },
    { id: '12', title: 'Останній самурай 2', director: 'Edward Zwick', duration: 152, image: '', genre: 'Історичний', year: 2026, status: 'published', views: '289K', rating: 7.8 },
    { id: '13', title: 'Полярна ніч', director: 'Kathryn Bigelow', duration: 118, image: '', genre: 'Трилер', year: 2026, status: 'published', views: '201K', rating: 7.5 },
    { id: '14', title: 'Дракон і вітер', director: 'Guillermo del Toro', duration: 136, image: '', genre: 'Фентезі', year: 2026, status: 'published', views: '456K', rating: 8.6 },
    { id: '15', title: 'Формула перемоги', director: 'Ron Howard', duration: 124, image: '', genre: 'Драма', year: 2025, status: 'published', views: '178K', rating: 7.4 },
    { id: '16', title: 'Ехо', director: 'Alex Garland', duration: 115, image: '', genre: 'Sci-Fi', year: 2026, status: 'moderation', views: '', rating: null },
    { id: '17', title: 'Чорний лебідь 2', director: 'Darren Aronofsky', duration: 108, image: '', genre: 'Драма, Трилер', year: 2026, status: 'published', views: '345K', rating: 8.3 },
    { id: '18', title: 'Гравітація 2', director: 'Alfonso Cuarón', duration: 98, image: '', genre: 'Sci-Fi', year: 2026, status: 'published', views: '267K', rating: 7.7 },
    { id: '19', title: 'Імперія мрій', director: 'Wes Anderson', duration: 112, image: '', genre: 'Комедія, Драма', year: 2026, status: 'published', views: '189K', rating: 8.1 },
    { id: '20', title: 'Залізна воля', director: 'Mel Gibson', duration: 158, image: '', genre: 'Екшн, Історичний', year: 2026, status: 'published', views: '234K', rating: 7.3 },
    { id: '21', title: 'Зоряні війни: Відродження', director: 'Dave Filoni', duration: 162, image: '', genre: 'Sci-Fi, Пригоди', year: 2026, status: 'published', views: '892K', rating: 8.5 },
    { id: '22', title: 'Безодня', director: 'James Cameron', duration: 145, image: '', genre: 'Sci-Fi, Трилер', year: 2025, status: 'published', views: '567K', rating: 8.8 },
    { id: '23', title: 'Привид опери', director: 'Robert Zemeckis', duration: 130, image: '', genre: 'Містика', year: 2026, status: 'published', views: '156K', rating: 7.2 },
    { id: '24', title: 'Крила свободи', director: 'Clint Eastwood', duration: 142, image: '', genre: 'Драма', year: 2025, status: 'published', views: '201K', rating: 7.9 },
    { id: '25', title: 'Матриця: Пробудження', director: 'Lana Wachowski', duration: 148, image: '', genre: 'Sci-Fi, Екшн', year: 2026, status: 'published', views: '723K', rating: 8.0 },
    { id: '26', title: 'Таємниця озера', director: 'Denis Villeneuve', duration: 135, image: '', genre: 'Містика', year: 2026, status: 'published', views: '178K', rating: 8.2 },
    { id: '27', title: 'Пульс', director: 'Edgar Wright', duration: 110, image: '', genre: 'Екшн, Комедія', year: 2026, status: 'published', views: '234K', rating: 7.8 },
    { id: '28', title: 'Вічний вогонь', director: 'Terrence Malick', duration: 168, image: '', genre: 'Драма', year: 2025, status: 'published', views: '98K', rating: 8.4 },
    { id: '29', title: 'Код хаосу', director: 'Christopher Nolan', duration: 152, image: '', genre: 'Трилер', year: 2026, status: 'moderation', views: '', rating: null },
    { id: '30', title: 'Нова Атлантида', director: 'James Cameron', duration: 175, image: '', genre: 'Sci-Fi, Пригоди', year: 2026, status: 'published', views: '456K', rating: 8.6 },
    { id: '31', title: 'Шторм', director: 'Michael Bay', duration: 132, image: '', genre: 'Екшн', year: 2025, status: 'published', views: '289K', rating: 6.8 },
    { id: '32', title: 'Тихий голос', director: 'Sofia Coppola', duration: 105, image: '', genre: 'Драма', year: 2026, status: 'published', views: '134K', rating: 7.6 },
    { id: '33', title: 'Острів забутих', director: 'M. Night Shyamalan', duration: 118, image: '', genre: 'Містика, Трилер', year: 2026, status: 'draft', views: '', rating: null },
    { id: '34', title: 'Легенда про дракона', director: 'Guillermo del Toro', duration: 145, image: '', genre: 'Фентезі', year: 2026, status: 'published', views: '367K', rating: 8.3 },
    { id: '35', title: 'Ребут', director: 'Taika Waititi', duration: 115, image: '', genre: 'Комедія, Sci-Fi', year: 2026, status: 'published', views: '245K', rating: 7.9 },
    { id: '36', title: 'Залізний кулак', director: 'Guy Ritchie', duration: 122, image: '', genre: 'Екшн', year: 2025, status: 'published', views: '198K', rating: 7.1 },
    { id: '37', title: 'Межа реальності', director: 'Alex Garland', duration: 128, image: '', genre: 'Sci-Fi', year: 2026, status: 'published', views: '167K', rating: 8.0 },
    { id: '38', title: 'Діамантова лихоманка', director: 'Martin Scorsese', duration: 162, image: '', genre: 'Кримінал', year: 2026, status: 'published', views: '423K', rating: 8.7 },
    { id: '39', title: 'Вежа мовчання', director: 'Park Chan-wook', duration: 138, image: '', genre: 'Трилер', year: 2026, status: 'published', views: '189K', rating: 8.5 },
    { id: '40', title: 'Поклик моря', director: 'Steven Spielberg', duration: 148, image: '', genre: 'Пригоди', year: 2026, status: 'published', views: '312K', rating: 8.1 },
    { id: '41', title: 'Рубікон', director: 'David Fincher', duration: 135, image: '', genre: 'Трилер', year: 2025, status: 'published', views: '267K', rating: 8.3 },
    { id: '42', title: 'Хроніки часу', director: 'Christopher Nolan', duration: 158, image: '', genre: 'Sci-Fi', year: 2026, status: 'moderation', views: '', rating: null },
    { id: '43', title: 'Кров і честь', director: 'Ridley Scott', duration: 165, image: '', genre: 'Історичний, Екшн', year: 2026, status: 'published', views: '345K', rating: 7.8 },
    { id: '44', title: 'Темрява', director: 'Jordan Peele', duration: 112, image: '', genre: 'Жахи', year: 2026, status: 'published', views: '278K', rating: 7.4 },
    { id: '45', title: 'Останній танець', director: 'Damien Chazelle', duration: 128, image: '', genre: 'Драма', year: 2026, status: 'published', views: '156K', rating: 8.2 },
    { id: '46', title: 'Фортеця', director: 'Christopher McQuarrie', duration: 142, image: '', genre: 'Екшн', year: 2025, status: 'published', views: '234K', rating: 7.7 },
    { id: '47', title: 'Місячне світло', director: 'Barry Jenkins', duration: 108, image: '', genre: 'Драма', year: 2026, status: 'published', views: '112K', rating: 8.6 },
    { id: '48', title: 'Квантовий стрибок', director: 'Denis Villeneuve', duration: 152, image: '', genre: 'Sci-Fi', year: 2026, status: 'draft', views: '', rating: null },
    { id: '49', title: 'Привиди війни', director: 'Sam Mendes', duration: 138, image: '', genre: 'Історичний, Драма', year: 2026, status: 'published', views: '298K', rating: 8.4 },
    { id: '50', title: 'Нуар', director: 'David Lynch', duration: 125, image: '', genre: 'Містика, Трилер', year: 2025, status: 'published', views: '145K', rating: 7.9 },
  ])

  // Generate more movies to reach ~156
  for (let i = 51; i <= 156; i++) {
    const directors = ['Christopher Nolan', 'Steven Spielberg', 'James Cameron', 'Martin Scorsese', 'Ridley Scott', 'Denis Villeneuve', 'David Fincher', 'Quentin Tarantino', 'Alfonso Cuarón', 'Guillermo del Toro']
    const genres = ['Екшн', 'Драма', 'Sci-Fi', 'Трилер', 'Комедія', 'Фентезі', 'Пригоди', 'Кримінал', 'Жахи', 'Детектив', 'Історичний', 'Містика']
    const statuses: ('published' | 'draft' | 'moderation')[] = ['published', 'published', 'published', 'published', 'published', 'published', 'published', 'draft', 'moderation', 'published']
    const status = statuses[i % statuses.length]
    const rating = status === 'published' ? +(6.5 + Math.random() * 3).toFixed(1) : null
    const views = status === 'published' ? `${Math.floor(50 + Math.random() * 500)}K` : ''
    movies.value.push({
      id: String(i),
      title: `Фільм ${i}`,
      director: directors[i % directors.length],
      duration: 90 + Math.floor(Math.random() * 80),
      image: '',
      genre: genres[i % genres.length],
      year: 2024 + Math.floor(Math.random() * 3),
      status,
      views,
      rating,
    })
  }

  const filters = reactive<IMovieFilters>({ search: '', genre: '', status: '', year: '' })
  const sortBy = ref<ISortState>({ key: 'views', direction: 'desc' })
  const selectedRows = ref<string[]>([])
  const currentPage = ref(1)
  const itemsPerPage = ref(10)

  const stats = computed<IMovieStats>(() => {
    const all = movies.value
    const published = all.filter((m) => m.status === 'published')
    const totalViews = published.reduce((sum, m) => {
      if (m.views.endsWith('M')) return sum + parseFloat(m.views) * 1000
      return sum + (parseInt(m.views.replace('K', '')) || 0)
    }, 0)
    const rated = published.filter((m) => m.rating !== null)
    const avgRating = rated.length ? +(rated.reduce((sum, m) => sum + (m.rating || 0), 0) / rated.length).toFixed(1) : 0
    return {
      total: all.length,
      published: published.length,
      drafts: all.filter((m) => m.status === 'draft').length,
      moderation: all.filter((m) => m.status === 'moderation').length,
      views: totalViews >= 1000 ? `${(totalViews / 1000).toFixed(1)}M` : `${totalViews}K`,
      avgRating,
    }
  })

  const filteredMovies = computed(() => {
    let result = movies.value.filter((item) => {
      const matchesSearch = !filters.search || item.title.toLowerCase().includes(filters.search.toLowerCase()) || item.director.toLowerCase().includes(filters.search.toLowerCase())
      const matchesGenre = !filters.genre || item.genre.includes(filters.genre)
      const matchesStatus = !filters.status || item.status === filters.status
      const matchesYear = !filters.year || String(item.year) === filters.year
      return matchesSearch && matchesGenre && matchesStatus && matchesYear
    })
    if (sortBy.value) {
      const { key, direction } = sortBy.value
      const mult = direction === 'asc' ? 1 : -1
      result = [...result].sort((a, b) => {
        const aVal = a[key as keyof IMovie]; const bVal = b[key as keyof IMovie]
        if (aVal === null && bVal === null) return 0
        if (aVal === null) return 1
        if (bVal === null) return -1
        if (typeof aVal === 'number' && typeof bVal === 'number') return (aVal - bVal) * mult
        return String(aVal).localeCompare(String(bVal), 'uk') * mult
      })
    }
    return result
  })

  const paginatedMovies = computed(() => {
    const start = (currentPage.value - 1) * itemsPerPage.value
    return filteredMovies.value.slice(start, start + itemsPerPage.value)
  })

  const genreOptions = computed(() => [
    { title: t('ADMIN_MOVIES_FILTER_ALL'), value: '' },
    { title: 'Екшн', value: 'Екшн' }, { title: 'Драма', value: 'Драма' }, { title: 'Sci-Fi', value: 'Sci-Fi' },
    { title: 'Трилер', value: 'Трилер' }, { title: 'Комедія', value: 'Комедія' }, { title: 'Фентезі', value: 'Фентезі' },
    { title: 'Пригоди', value: 'Пригоди' }, { title: 'Кримінал', value: 'Кримінал' }, { title: 'Жахи', value: 'Жахи' },
    { title: 'Детектив', value: 'Детектив' }, { title: 'Історичний', value: 'Історичний' }, { title: 'Містика', value: 'Містика' },
  ])

  const statusOptions = computed(() => [
    { title: t('ADMIN_MOVIES_FILTER_ALL'), value: '' },
    { title: t('ADMIN_MOVIES_STATUS_PUBLISHED'), value: 'published' },
    { title: t('ADMIN_MOVIES_STATUS_MODERATION'), value: 'moderation' },
    { title: t('ADMIN_MOVIES_STATUS_DRAFT'), value: 'draft' },
  ])

  const yearOptions = computed(() => [
    { title: t('ADMIN_MOVIES_FILTER_ALL'), value: '' },
    { title: '2026', value: '2026' }, { title: '2025', value: '2025' }, { title: '2024', value: '2024' },
  ])

  const updateSort = (sort: ISortState) => { sortBy.value = sort }
  const bulkPublish = () => { movies.value = movies.value.map((m) => selectedRows.value.includes(m.id) ? { ...m, status: 'published' as const } : m); selectedRows.value = [] }
  const bulkArchive = () => { movies.value = movies.value.map((m) => selectedRows.value.includes(m.id) ? { ...m, status: 'draft' as const } : m); selectedRows.value = [] }
  const bulkDelete = () => { movies.value = movies.value.filter((m) => !selectedRows.value.includes(m.id)); selectedRows.value = [] }

  return {
    movies, filters, sortBy, selectedRows, currentPage, itemsPerPage,
    stats, filteredMovies, paginatedMovies,
    genreOptions, statusOptions, yearOptions,
    updateSort, bulkPublish, bulkArchive, bulkDelete,
  }
}
