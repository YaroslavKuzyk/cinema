import type { IHeroFeatured } from '~/components/Public/Hero/index.types'
import type { IGenreTile } from '~/components/Public/GenresRow/index.types'
import type { IMovie } from '~/components/Public/MovieCard/index.types'
import type { ITab } from '~/components/System/AppTabs/index.types'
import type { ICategoryRow } from '../domain'

const img = (id: string, w: number, h: number) =>
  `https://images.unsplash.com/${id}?w=${w}&h=${h}&fit=crop&auto=format&q=80`

export function useSeries() {
  const { t } = useI18n()

  const activeFilter = ref<string>('all')

  const featured = computed<IHeroFeatured>(() => ({
    id: 'thrones',
    title: t('MY_LIST_SERIES_THRONES'),
    description: t('SERIES_HERO_DESCRIPTION'),
    tag: t('SERIES_HERO_TAG'),
    rating: 9.2,
    year: 2025,
    duration: `8 ${t('MY_LIST_SEASONS')}`,
    genres: [t('GENRES_DRAMA'), t('GENRES_ADVENTURE')],
    image: img('photo-1536440136628-849c177e76a1', 1920, 900),
  }))

  const filterTabs = computed<ITab[]>(() => [
    { value: 'all', title: t('MY_LIST_FILTER_ALL') },
    { value: 'drama', title: t('GENRES_DRAMA') },
    { value: 'thriller', title: t('GENRES_THRILLER') },
    { value: 'comedy', title: t('GENRES_COMEDY') },
    { value: 'crime', title: t('GENRES_CRIME') },
    { value: 'mystery', title: t('GENRES_MYSTERY') },
    { value: 'scifi', title: 'Sci-Fi' },
  ])

  const m = (id: string, title: string, meta: string, photoId: string, badge?: string): IMovie => ({
    id, title, meta, image: img(photoId, 600, 900), badge,
  })

  const popular = computed<IMovie[]>(() => [
    m('p-thrones', t('MY_LIST_SERIES_THRONES'), `${t('GENRES_DRAMA')} · 8 ${t('MY_LIST_SEASONS')}`, 'photo-1536440136628-849c177e76a1'),
    m('p-shadow-fire', t('HOME_MOVIE_SHADOW_FIRE'), `${t('GENRES_THRILLER')} · 2 ${t('MY_LIST_SEASONS')}`, 'photo-1598899134739-24c46f58b8c0'),
    m('p-last-flight', t('HOME_MOVIE_LAST_FLIGHT'), `${t('GENRES_THRILLER')} · 4 ${t('MY_LIST_SEASONS')}`, 'photo-1594909122845-11baa439b7bf'),
    m('p-noir-city', t('SERIES_SHOW_NOIR_CITY'), `${t('GENRES_CRIME')} · 3 ${t('MY_LIST_SEASONS')}`, 'photo-1489599849927-2ee91cede3ba'),
    m('p-deep-sky', t('SERIES_SHOW_DEEP_SKY'), `Sci-Fi · 2 ${t('MY_LIST_SEASONS')}`, 'photo-1446776653964-20c1d3a81b06'),
  ])

  const topTen = computed<IMovie[]>(() => [
    m('t-thrones', t('MY_LIST_SERIES_THRONES'), `${t('GENRES_DRAMA')} · 8 ${t('MY_LIST_SEASONS')}`, 'photo-1536440136628-849c177e76a1'),
    m('t-last-flight', t('HOME_MOVIE_LAST_FLIGHT'), `${t('GENRES_THRILLER')} · 4 ${t('MY_LIST_SEASONS')}`, 'photo-1594909122845-11baa439b7bf'),
    m('t-shadow-fire', t('HOME_MOVIE_SHADOW_FIRE'), `${t('GENRES_DRAMA')} · 2 ${t('MY_LIST_SEASONS')}`, 'photo-1598899134739-24c46f58b8c0'),
    m('t-deep-sky', t('SERIES_SHOW_DEEP_SKY'), `Sci-Fi · 2 ${t('MY_LIST_SEASONS')}`, 'photo-1446776653964-20c1d3a81b06'),
    m('t-noir-city', t('SERIES_SHOW_NOIR_CITY'), `${t('GENRES_CRIME')} · 3 ${t('MY_LIST_SEASONS')}`, 'photo-1489599849927-2ee91cede3ba'),
  ])

  const recent = computed<IMovie[]>(() => [
    m('r-quiet-town', t('SERIES_SHOW_QUIET_TOWN'), `${t('GENRES_MYSTERY')} · S1 · 2026`, 'photo-1485846234645-a62644f84728', t('MY_LIST_BADGE_NEW')),
    m('r-code-turing-s', t('MOVIES_MOVIE_CODE_TURING'), `${t('MOVIES_GENRE_TECHNOTHRILLER')} · S2 · 2026`, 'photo-1522202176988-66273c2fd55f', t('MY_LIST_BADGE_NEW')),
    m('r-iron-line', t('SERIES_SHOW_IRON_LINE'), `${t('GENRES_CRIME')} · S1 · 2026`, 'photo-1494783367193-149034c05e8f', t('MY_LIST_BADGE_NEW')),
  ])

  const drama = computed<IMovie[]>(() => [
    m('d-thrones', t('MY_LIST_SERIES_THRONES'), `${t('GENRES_DRAMA')} · 8 ${t('MY_LIST_SEASONS')}`, 'photo-1536440136628-849c177e76a1'),
    m('d-quiet-town', t('SERIES_SHOW_QUIET_TOWN'), `${t('GENRES_DRAMA')} · 1 ${t('MY_LIST_SEASONS')}`, 'photo-1485846234645-a62644f84728'),
    m('d-letters-home', t('MOVIES_MOVIE_LETTERS_HOME'), `${t('GENRES_DRAMA')} · 2 ${t('MY_LIST_SEASONS')}`, 'photo-1489599849927-2ee91cede3ba'),
    m('d-morning-train', t('MOVIES_MOVIE_MORNING_TRAIN'), `${t('GENRES_DRAMA')} · 3 ${t('MY_LIST_SEASONS')}`, 'photo-1522202176988-66273c2fd55f'),
    m('d-between-us', t('MOVIES_MOVIE_BETWEEN_US'), `${t('GENRES_DRAMA')} · 2 ${t('MY_LIST_SEASONS')}`, 'photo-1478720568477-152d9b164e26'),
  ])

  const rows = computed<ICategoryRow[]>(() => [
    { key: 'popular', title: t('SERIES_ROW_POPULAR'), items: popular.value, columns: 5 },
    { key: 'top-ten', title: t('SERIES_ROW_TOP_TEN'), items: topTen.value, columns: 5, numbered: true },
    { key: 'recent', title: t('MOVIES_ROW_RECENT'), items: recent.value, columns: 3, variant: 'wide' },
    { key: 'drama', title: t('SERIES_ROW_DRAMA'), items: drama.value, columns: 5 },
  ])

  const genres = computed<IGenreTile[]>(() => [
    { id: 'drama', title: t('GENRES_DRAMA'), image: img('photo-1485846234645-a62644f84728', 400, 300) },
    { id: 'thriller', title: t('GENRES_THRILLER'), image: img('photo-1536440136628-849c177e76a1', 400, 300) },
    { id: 'crime', title: t('GENRES_CRIME'), image: img('photo-1494783367193-149034c05e8f', 400, 300) },
    { id: 'comedy', title: t('GENRES_COMEDY'), image: img('photo-1585951237318-9ea5e175b891', 400, 300) },
    { id: 'mystery', title: t('GENRES_MYSTERY'), image: img('photo-1478720568477-152d9b164e26', 400, 300) },
    { id: 'scifi', title: 'Sci-Fi', image: img('photo-1446776653964-20c1d3a81b06', 400, 300) },
  ])

  return { activeFilter, featured, filterTabs, rows, genres }
}
