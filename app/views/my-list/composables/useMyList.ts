import type { IMovie } from '~/components/Public/MovieCard/index.types'
import type {
  IMyListFilterOption,
  IMyListItem,
  IMyListStats,
  TMyListFilter,
} from '../domain'

const img = (id: string, w: number, h: number) =>
  `https://images.unsplash.com/${id}?w=${w}&h=${h}&fit=crop&auto=format&q=80`

export function useMyList() {
  const { t } = useI18n()

  const activeFilter = ref<TMyListFilter>('all')

  const continueWatching = computed<IMovie[]>(() => [
    { id: 'last-flight', title: t('HOME_MOVIE_LAST_FLIGHT'), meta: `S1:E4 · ${t('HOME_REMAINING')} 32 ${t('HOME_MIN_SHORT')}`, progress: 62, image: img('photo-1594909122845-11baa439b7bf', 800, 450) },
    { id: 'shadow-fire', title: t('HOME_MOVIE_SHADOW_FIRE'), meta: `S2:E1 · ${t('HOME_REMAINING')} 58 ${t('HOME_MIN_SHORT')}`, progress: 38, image: img('photo-1478720568477-152d9b164e26', 800, 450) },
    { id: 'heart-of-ocean', title: t('HOME_MOVIE_HEART_OF_OCEAN'), meta: `${t('MY_LIST_MOVIE')} · ${t('HOME_REMAINING')} 19 ${t('HOME_MIN_SHORT')}`, progress: 21, image: img('photo-1489599849927-2ee91cede3ba', 800, 450) },
    { id: 'space-around', title: t('HOME_MOVIE_SPACE_AROUND'), meta: `S1:E2 · ${t('HOME_REMAINING')} 45 ${t('HOME_MIN_SHORT')}`, progress: 75, image: img('photo-1440404653325-ab127d49abc1', 800, 450) },
  ])

  const saved = computed<IMyListItem[]>(() => [
    { id: 'interstellar-2', title: t('HOME_MOVIE_INTERSTELLAR_2'), meta: 'Sci-Fi · 2026', badge: t('MY_LIST_BADGE_NEW'), category: 'movies', image: img('photo-1478720568477-152d9b164e26', 600, 900) },
    { id: 'signal-mars', title: t('MY_LIST_MOVIE_SIGNAL_MARS'), meta: 'Sci-Fi · 2025', category: 'movies', image: img('photo-1446776653964-20c1d3a81b06', 600, 900) },
    { id: 'last-flight-s', title: t('HOME_MOVIE_LAST_FLIGHT'), meta: `${t('HOME_GENRE_THRILLER')} · 4 ${t('MY_LIST_SEASONS')}`, category: 'series', image: img('photo-1594909122845-11baa439b7bf', 600, 900) },
    { id: 'jujutsu-kaisen', title: t('MY_LIST_ANIME_JJK'), meta: `Shonen · 3 ${t('MY_LIST_SEASONS')}`, category: 'anime', image: img('photo-1578632767115-351597cf2477', 600, 900) },
    { id: 'shadow-fire-s', title: t('HOME_MOVIE_SHADOW_FIRE'), meta: `${t('HOME_GENRE_THRILLER')} · 2 ${t('MY_LIST_SEASONS')}`, category: 'series', image: img('photo-1598899134739-24c46f58b8c0', 600, 900) },
    { id: 'heart-ocean-s', title: t('HOME_MOVIE_HEART_OF_OCEAN'), meta: `${t('HOME_GENRE_DRAMA')} · 2026`, category: 'movies', image: img('photo-1489599849927-2ee91cede3ba', 600, 900) },

    { id: 'demon-slayer', title: t('MY_LIST_ANIME_DEMON_SLAYER'), meta: `Shonen · 4 ${t('MY_LIST_SEASONS')}`, category: 'anime', image: img('photo-1585951237318-9ea5e175b891', 600, 900) },
    { id: 'point-strike', title: t('MY_LIST_MOVIE_POINT_STRIKE'), meta: `${t('HOME_GENRE_ACTION')} · 2025`, category: 'movies', image: img('photo-1547234935-80c7145ec969', 600, 900) },
    { id: 'game-of-thrones', title: t('MY_LIST_SERIES_THRONES'), meta: `${t('HOME_GENRE_DRAMA')} · 8 ${t('MY_LIST_SEASONS')}`, category: 'series', image: img('photo-1536440136628-849c177e76a1', 600, 900) },
    { id: 'beyond-horizon', title: t('MY_LIST_MOVIE_HORIZON'), meta: `${t('GENRES_ADVENTURE')} · 2026`, category: 'movies', image: img('photo-1446776653964-20c1d3a81b06', 600, 900) },
    { id: 'spy-x-family', title: t('MY_LIST_ANIME_SPY_FAMILY'), meta: `${t('HOME_GENRE_COMEDY')} · 3 ${t('MY_LIST_SEASONS')}`, category: 'anime', image: img('photo-1536440136628-849c177e76a1', 600, 900) },
    { id: 'lost-code', title: t('MY_LIST_MOVIE_LOST_CODE'), meta: `${t('HOME_GENRE_ACTION')} · 2026`, badge: t('MY_LIST_BADGE_NEW'), category: 'movies', image: img('photo-1598899134739-24c46f58b8c0', 600, 900) },
  ])

  const stats = computed<IMyListStats>(() => ({
    movies: saved.value.filter(i => i.category === 'movies').length,
    series: saved.value.filter(i => i.category === 'series').length,
    anime: saved.value.filter(i => i.category === 'anime').length,
  }))

  const total = computed(() => saved.value.length)

  const filterOptions = computed<IMyListFilterOption[]>(() => [
    { key: 'all', label: t('MY_LIST_FILTER_ALL'), count: total.value },
    { key: 'movies', label: t('MY_LIST_FILTER_MOVIES'), count: stats.value.movies },
    { key: 'series', label: t('MY_LIST_FILTER_SERIES'), count: stats.value.series },
    { key: 'anime', label: t('MY_LIST_FILTER_ANIME'), count: stats.value.anime },
  ])

  const filteredSaved = computed(() => {
    if (activeFilter.value === 'all') return saved.value
    return saved.value.filter(i => i.category === activeFilter.value)
  })

  return {
    activeFilter,
    continueWatching,
    filteredSaved,
    filterOptions,
    stats,
  }
}
