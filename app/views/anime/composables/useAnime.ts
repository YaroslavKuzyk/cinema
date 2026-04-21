import type { IHeroFeatured } from '~/components/Public/Hero/index.types'
import type { IGenreTile } from '~/components/Public/GenresRow/index.types'
import type { IMovie } from '~/components/Public/MovieCard/index.types'
import type { ITab } from '~/components/System/AppTabs/index.types'
import type { ICategoryRow } from '../domain'

const img = (id: string, w: number, h: number) =>
  `https://images.unsplash.com/${id}?w=${w}&h=${h}&fit=crop&auto=format&q=80`

export function useAnime() {
  const { t } = useI18n()

  const activeFilter = ref<string>('all')

  const featured = computed<IHeroFeatured>(() => ({
    id: 'jjk',
    title: t('MY_LIST_ANIME_JJK'),
    description: t('ANIME_HERO_DESCRIPTION'),
    tag: t('ANIME_HERO_TAG'),
    rating: 8.9,
    year: 2026,
    duration: `3 ${t('MY_LIST_SEASONS')}`,
    genres: ['Shonen', t('GENRES_ACTION')],
    image: img('photo-1578632767115-351597cf2477', 1920, 900),
  }))

  const filterTabs = computed<ITab[]>(() => [
    { value: 'all', title: t('MY_LIST_FILTER_ALL') },
    { value: 'shonen', title: 'Shonen' },
    { value: 'seinen', title: 'Seinen' },
    { value: 'shoujo', title: 'Shoujo' },
    { value: 'isekai', title: 'Isekai' },
    { value: 'mecha', title: 'Mecha' },
    { value: 'slice', title: t('ANIME_GENRE_SLICE') },
  ])

  const m = (id: string, title: string, meta: string, photoId: string, badge?: string): IMovie => ({
    id, title, meta, image: img(photoId, 600, 900), badge,
  })

  const popular = computed<IMovie[]>(() => [
    m('p-jjk', t('MY_LIST_ANIME_JJK'), `Shonen · 3 ${t('MY_LIST_SEASONS')}`, 'photo-1578632767115-351597cf2477'),
    m('p-demon-slayer', t('MY_LIST_ANIME_DEMON_SLAYER'), `Shonen · 4 ${t('MY_LIST_SEASONS')}`, 'photo-1585951237318-9ea5e175b891'),
    m('p-spy-family', t('MY_LIST_ANIME_SPY_FAMILY'), `${t('GENRES_COMEDY')} · 3 ${t('MY_LIST_SEASONS')}`, 'photo-1509248961158-e54f6934749c'),
    m('p-cyber-dawn', t('ANIME_SHOW_CYBER_DAWN'), `Seinen · 2 ${t('MY_LIST_SEASONS')}`, 'photo-1446776653964-20c1d3a81b06'),
    m('p-neon-path', t('ANIME_SHOW_NEON_PATH'), `Mecha · 1 ${t('MY_LIST_SEASONS')}`, 'photo-1594909122845-11baa439b7bf'),
  ])

  const topTen = computed<IMovie[]>(() => [
    m('t-jjk', t('MY_LIST_ANIME_JJK'), `Shonen · 3 ${t('MY_LIST_SEASONS')}`, 'photo-1578632767115-351597cf2477'),
    m('t-demon-slayer', t('MY_LIST_ANIME_DEMON_SLAYER'), `Shonen · 4 ${t('MY_LIST_SEASONS')}`, 'photo-1585951237318-9ea5e175b891'),
    m('t-spy-family', t('MY_LIST_ANIME_SPY_FAMILY'), `${t('GENRES_COMEDY')} · 3 ${t('MY_LIST_SEASONS')}`, 'photo-1509248961158-e54f6934749c'),
    m('t-cyber-dawn', t('ANIME_SHOW_CYBER_DAWN'), `Seinen · 2 ${t('MY_LIST_SEASONS')}`, 'photo-1446776653964-20c1d3a81b06'),
    m('t-neon-path', t('ANIME_SHOW_NEON_PATH'), `Mecha · 1 ${t('MY_LIST_SEASONS')}`, 'photo-1594909122845-11baa439b7bf'),
  ])

  const fresh = computed<IMovie[]>(() => [
    m('f-wanderer', t('ANIME_SHOW_WANDERER'), `${t('GENRES_ADVENTURE')} · S1:E8 · 2026`, 'photo-1542204165-65bf26472b9b', t('MY_LIST_BADGE_NEW')),
    m('f-silent-bloom', t('ANIME_SHOW_SILENT_BLOOM'), `Shoujo · S1:E5 · 2026`, 'photo-1519741497674-611481863552', t('MY_LIST_BADGE_NEW')),
    m('f-lost-moon', t('ANIME_SHOW_LOST_MOON'), `Isekai · S2:E3 · 2026`, 'photo-1532978879514-6cb6e6a4e7c1', t('MY_LIST_BADGE_NEW')),
  ])

  const shonen = computed<IMovie[]>(() => [
    m('sh-jjk', t('MY_LIST_ANIME_JJK'), `Shonen · 3 ${t('MY_LIST_SEASONS')}`, 'photo-1578632767115-351597cf2477'),
    m('sh-demon-slayer', t('MY_LIST_ANIME_DEMON_SLAYER'), `Shonen · 4 ${t('MY_LIST_SEASONS')}`, 'photo-1585951237318-9ea5e175b891'),
    m('sh-wanderer', t('ANIME_SHOW_WANDERER'), `Shonen · 1 ${t('MY_LIST_SEASONS')}`, 'photo-1542204165-65bf26472b9b'),
    m('sh-neon-path', t('ANIME_SHOW_NEON_PATH'), `Shonen · 1 ${t('MY_LIST_SEASONS')}`, 'photo-1594909122845-11baa439b7bf'),
    m('sh-blood-edge', t('ANIME_SHOW_BLOOD_EDGE'), `Shonen · 2 ${t('MY_LIST_SEASONS')}`, 'photo-1547234935-80c7145ec969'),
  ])

  const rows = computed<ICategoryRow[]>(() => [
    { key: 'popular', title: t('ANIME_ROW_POPULAR'), items: popular.value, columns: 5 },
    { key: 'top-ten', title: t('ANIME_ROW_TOP_TEN'), items: topTen.value, columns: 5, numbered: true },
    { key: 'fresh', title: t('ANIME_ROW_FRESH'), items: fresh.value, columns: 3, variant: 'wide' },
    { key: 'shonen', title: t('ANIME_ROW_SHONEN'), items: shonen.value, columns: 5 },
  ])

  const genres = computed<IGenreTile[]>(() => [
    { id: 'action', title: t('GENRES_ACTION'), image: img('photo-1547234935-80c7145ec969', 400, 300) },
    { id: 'scifi', title: 'Sci-Fi', image: img('photo-1446776653964-20c1d3a81b06', 400, 300) },
    { id: 'romance', title: t('GENRES_ROMANCE'), image: img('photo-1519741497674-611481863552', 400, 300) },
    { id: 'comedy', title: t('GENRES_COMEDY'), image: img('photo-1585951237318-9ea5e175b891', 400, 300) },
    { id: 'mystery', title: t('GENRES_MYSTERY'), image: img('photo-1532978879514-6cb6e6a4e7c1', 400, 300) },
    { id: 'adventure', title: t('GENRES_ADVENTURE'), image: img('photo-1464822759023-fed622ff2c3b', 400, 300) },
  ])

  return { activeFilter, featured, filterTabs, rows, genres }
}
