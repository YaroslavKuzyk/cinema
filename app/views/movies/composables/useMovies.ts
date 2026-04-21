import type { IHeroFeatured } from '~/components/Public/Hero/index.types'
import type { IGenreTile } from '~/components/Public/GenresRow/index.types'
import type { IMovie } from '~/components/Public/MovieCard/index.types'
import type { ITab } from '~/components/System/AppTabs/index.types'
import type { ICategoryRow } from '../domain'

const img = (id: string, w: number, h: number) =>
  `https://images.unsplash.com/${id}?w=${w}&h=${h}&fit=crop&auto=format&q=80`

export function useMovies() {
  const { t } = useI18n()

  const activeFilter = ref<string>('all')

  const featured = computed<IHeroFeatured>(() => ({
    id: 'interstellar-2',
    title: t('HOME_MOVIE_INTERSTELLAR_2'),
    description: t('MOVIES_HERO_DESCRIPTION'),
    tag: t('MOVIES_HERO_TAG'),
    rating: 8.7,
    year: 2026,
    duration: '165 ' + t('HOME_MIN'),
    genres: ['Sci-Fi', t('GENRES_ADVENTURE')],
    image: img('photo-1478720568477-152d9b164e26', 1920, 900),
  }))

  const filterTabs = computed<ITab[]>(() => [
    { value: 'all', title: t('MY_LIST_FILTER_ALL') },
    { value: 'action', title: t('GENRES_ACTION') },
    { value: 'scifi', title: 'Sci-Fi' },
    { value: 'thriller', title: t('GENRES_THRILLER') },
    { value: 'drama', title: t('GENRES_DRAMA') },
    { value: 'comedy', title: t('GENRES_COMEDY') },
    { value: 'horror', title: t('GENRES_HORROR') },
    { value: 'adventure', title: t('GENRES_ADVENTURE') },
    { value: 'romance', title: t('GENRES_ROMANCE') },
    { value: 'documentary', title: t('GENRES_DOCUMENTARY') },
  ])

  const m = (id: string, title: string, meta: string, photoId: string, badge?: string): IMovie => ({
    id, title, meta, image: img(photoId, 600, 900), badge,
  })

  const popular = computed<IMovie[]>(() => [
    m('interstellar-2', t('HOME_MOVIE_INTERSTELLAR_2'), 'Sci-Fi · 2026', 'photo-1478720568477-152d9b164e26'),
    m('shadow-fire', t('HOME_MOVIE_SHADOW_FIRE'), `${t('GENRES_THRILLER')} · 2026`, 'photo-1598899134739-24c46f58b8c0'),
    m('last-flight', t('HOME_MOVIE_LAST_FLIGHT'), `${t('GENRES_DRAMA')} · 2026`, 'photo-1594909122845-11baa439b7bf'),
    m('heart-ocean', t('HOME_MOVIE_HEART_OF_OCEAN'), `${t('GENRES_DRAMA')} · 2026`, 'photo-1489599849927-2ee91cede3ba'),
    m('space-around', t('HOME_MOVIE_SPACE_AROUND'), `${t('GENRES_ADVENTURE')} · 2026`, 'photo-1440404653325-ab127d49abc1'),
  ])

  const topTen = computed<IMovie[]>(() => [
    m('t-interstellar-2', t('HOME_MOVIE_INTERSTELLAR_2'), 'Sci-Fi · 2026', 'photo-1478720568477-152d9b164e26'),
    m('t-last-flight', t('HOME_MOVIE_LAST_FLIGHT'), `${t('GENRES_THRILLER')} · 2026`, 'photo-1594909122845-11baa439b7bf'),
    m('t-shadow-fire', t('HOME_MOVIE_SHADOW_FIRE'), `${t('GENRES_DRAMA')} · 2026`, 'photo-1598899134739-24c46f58b8c0'),
    m('t-heart-ocean', t('HOME_MOVIE_HEART_OF_OCEAN'), `${t('GENRES_DRAMA')} · 2026`, 'photo-1489599849927-2ee91cede3ba'),
    m('t-space-around', t('HOME_MOVIE_SPACE_AROUND'), `${t('GENRES_DRAMA')} · 2026`, 'photo-1440404653325-ab127d49abc1'),
  ])

  const recent = computed<IMovie[]>(() => [
    m('night-city', t('MOVIES_MOVIE_NIGHT_CITY'), `${t('MOVIES_GENRE_DETECTIVE')} · 2026 · 128 ${t('HOME_MIN_SHORT')}`, 'photo-1485846234645-a62644f84728', t('MY_LIST_BADGE_NEW')),
    m('code-turing', t('MOVIES_MOVIE_CODE_TURING'), `${t('MOVIES_GENRE_TECHNOTHRILLER')} · 2026 · 142 ${t('HOME_MIN_SHORT')}`, 'photo-1522202176988-66273c2fd55f', t('MY_LIST_BADGE_NEW')),
    m('beyond-horizon', t('MY_LIST_MOVIE_HORIZON'), `${t('GENRES_ADVENTURE')} · 2026 · 156 ${t('HOME_MIN_SHORT')}`, 'photo-1446776653964-20c1d3a81b06', t('MY_LIST_BADGE_NEW')),
  ])

  const bestAction = computed<IMovie[]>(() => [
    m('a-last-flight', t('HOME_MOVIE_LAST_FLIGHT'), `${t('GENRES_ACTION')} · 2026`, 'photo-1594909122845-11baa439b7bf'),
    m('a-strike-point', t('MY_LIST_MOVIE_POINT_STRIKE'), `${t('GENRES_ACTION')} · 2025`, 'photo-1547234935-80c7145ec969'),
    m('a-silent-wars', t('MOVIES_MOVIE_SILENT_WARS'), `${t('GENRES_ACTION')} · 2025`, 'photo-1578632767115-351597cf2477'),
    m('a-black-horizon', t('MOVIES_MOVIE_BLACK_HORIZON'), `${t('GENRES_ACTION')} · 2025`, 'photo-1509248961158-e54f6934749c'),
    m('a-lost-code', t('MY_LIST_MOVIE_LOST_CODE'), `${t('GENRES_ACTION')} · 2026`, 'photo-1598899134739-24c46f58b8c0'),
  ])

  const dramas = computed<IMovie[]>(() => [
    m('d-heart-ocean', t('HOME_MOVIE_HEART_OF_OCEAN'), `${t('GENRES_DRAMA')} · 2026`, 'photo-1489599849927-2ee91cede3ba'),
    m('d-quiet-days', t('MOVIES_MOVIE_QUIET_DAYS'), `${t('GENRES_DRAMA')} · 2025`, 'photo-1485846234645-a62644f84728'),
    m('d-letters-home', t('MOVIES_MOVIE_LETTERS_HOME'), `${t('GENRES_DRAMA')} · 2026`, 'photo-1536440136628-849c177e76a1'),
    m('d-between-us', t('MOVIES_MOVIE_BETWEEN_US'), `${t('GENRES_DRAMA')} · 2025`, 'photo-1478720568477-152d9b164e26'),
    m('d-morning-train', t('MOVIES_MOVIE_MORNING_TRAIN'), `${t('GENRES_DRAMA')} · 2026`, 'photo-1522202176988-66273c2fd55f'),
  ])

  const sciFi = computed<IMovie[]>(() => [
    m('s-interstellar-2', t('HOME_MOVIE_INTERSTELLAR_2'), 'Sci-Fi · 2026', 'photo-1478720568477-152d9b164e26'),
    m('s-signal-mars', t('MY_LIST_MOVIE_SIGNAL_MARS'), 'Sci-Fi · 2026', 'photo-1446776653964-20c1d3a81b06'),
    m('s-space-around', t('HOME_MOVIE_SPACE_AROUND'), 'Sci-Fi · 2025', 'photo-1440404653325-ab127d49abc1'),
    m('s-parallel-world', t('MOVIES_MOVIE_PARALLEL_WORLD'), 'Sci-Fi · 2025', 'photo-1534447677768-be436bb09401'),
    m('s-zero-gravity', t('MOVIES_MOVIE_ZERO_GRAVITY'), 'Sci-Fi · 2026', 'photo-1585951237318-9ea5e175b891'),
  ])

  const rows = computed<ICategoryRow[]>(() => [
    { key: 'popular', title: t('HOME_ROW_POPULAR'), items: popular.value, columns: 5 },
    { key: 'top-ten', title: t('HOME_ROW_TOP_TEN'), items: topTen.value, columns: 5, numbered: true },
    { key: 'recent', title: t('MOVIES_ROW_RECENT'), items: recent.value, columns: 3, variant: 'wide' },
    { key: 'best-action', title: t('MOVIES_ROW_BEST_ACTION'), items: bestAction.value, columns: 5 },
    { key: 'dramas', title: t('MOVIES_ROW_DRAMAS'), items: dramas.value, columns: 5 },
    { key: 'scifi', title: t('MOVIES_ROW_SCIFI'), items: sciFi.value, columns: 5 },
  ])

  const genres = computed<IGenreTile[]>(() => [
    { id: 'action', title: t('GENRES_ACTION'), image: img('photo-1547234935-80c7145ec969', 400, 300) },
    { id: 'scifi', title: 'Sci-Fi', image: img('photo-1446776653964-20c1d3a81b06', 400, 300) },
    { id: 'thriller', title: t('GENRES_THRILLER'), image: img('photo-1536440136628-849c177e76a1', 400, 300) },
    { id: 'drama', title: t('GENRES_DRAMA'), image: img('photo-1485846234645-a62644f84728', 400, 300) },
    { id: 'comedy', title: t('GENRES_COMEDY'), image: img('photo-1585951237318-9ea5e175b891', 400, 300) },
    { id: 'horror', title: t('GENRES_HORROR'), image: img('photo-1509248961158-e54f6934749c', 400, 300) },
  ])

  return { activeFilter, featured, filterTabs, rows, genres }
}
