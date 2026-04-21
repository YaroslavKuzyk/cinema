import type { IHomeFeatured, IHomeGenre, IHomeRow } from '../domain'

const img = (id: string, w: number, h: number) =>
  `https://images.unsplash.com/${id}?w=${w}&h=${h}&fit=crop&auto=format&q=80`

export function useHome() {
  const { t } = useI18n()

  const featured = computed<IHomeFeatured>(() => ({
    id: 'dune-3',
    title: t('HOME_HERO_TITLE'),
    description: t('HOME_HERO_DESCRIPTION'),
    tag: t('HOME_HERO_TAG'),
    rating: 9,
    year: 2026,
    duration: '166 ' + t('HOME_MIN'),
    genres: ['Sci-Fi', t('HOME_GENRE_DRAMA')],
    image: img('photo-1542204165-65bf26472b9b', 1920, 900),
  }))

  const continueWatching = computed<IHomeRow>(() => ({
    title: t('HOME_ROW_CONTINUE'),
    items: [
      { id: 'last-flight', title: t('HOME_MOVIE_LAST_FLIGHT'), meta: `S1:E4 · ${t('HOME_REMAINING')} 32 ${t('HOME_MIN_SHORT')}`, progress: 62, image: img('photo-1594909122845-11baa439b7bf', 800, 450) },
      { id: 'shadow-fire', title: t('HOME_MOVIE_SHADOW_FIRE'), meta: `${t('HOME_GENRE_DRAMA')} · ${t('HOME_REMAINING')} 58 ${t('HOME_MIN_SHORT')}`, progress: 38, image: img('photo-1478720568477-152d9b164e26', 800, 450) },
      { id: 'heart-of-ocean', title: t('HOME_MOVIE_HEART_OF_OCEAN'), meta: `${t('HOME_GENRE_DRAMA')} · ${t('HOME_REMAINING')} 19 ${t('HOME_MIN_SHORT')}`, progress: 21, image: img('photo-1489599849927-2ee91cede3ba', 800, 450) },
      { id: 'space-around', title: t('HOME_MOVIE_SPACE_AROUND'), meta: `2022 · ${t('HOME_REMAINING')} 43 ${t('HOME_MIN_SHORT')}`, progress: 75, image: img('photo-1440404653325-ab127d49abc1', 800, 450) },
    ],
  }))

  const popular = computed<IHomeRow>(() => ({
    title: t('HOME_ROW_POPULAR'),
    items: [
      { id: 'interstellar-2', title: t('HOME_MOVIE_INTERSTELLAR_2'), meta: `Sci-Fi · 2026`, image: img('photo-1478720568477-152d9b164e26', 600, 900) },
      { id: 'shadow-fire-2', title: t('HOME_MOVIE_SHADOW_FIRE'), meta: `${t('HOME_GENRE_THRILLER')} · 2026`, image: img('photo-1598899134739-24c46f58b8c0', 600, 900) },
      { id: 'last-flight-2', title: t('HOME_MOVIE_LAST_FLIGHT'), meta: `${t('HOME_GENRE_DRAMA')} · 2026`, image: img('photo-1594909122845-11baa439b7bf', 600, 900) },
      { id: 'heart-ocean-2', title: t('HOME_MOVIE_HEART_OF_OCEAN'), meta: `${t('HOME_GENRE_DRAMA')} · 2026`, image: img('photo-1489599849927-2ee91cede3ba', 600, 900) },
      { id: 'space-around-2', title: t('HOME_MOVIE_SPACE_AROUND'), meta: `${t('HOME_GENRE_DRAMA')} · 2026`, image: img('photo-1440404653325-ab127d49abc1', 600, 900) },
    ],
  }))

  const topTen = computed<IHomeRow>(() => ({
    title: t('HOME_ROW_TOP_TEN'),
    items: [
      { id: 'interstellar-2-t', title: t('HOME_MOVIE_INTERSTELLAR_2'), meta: `Sci-Fi · 2026`, image: img('photo-1478720568477-152d9b164e26', 600, 900) },
      { id: 'last-flight-t', title: t('HOME_MOVIE_LAST_FLIGHT'), meta: `${t('HOME_GENRE_DRAMA')} · 2026`, image: img('photo-1594909122845-11baa439b7bf', 600, 900) },
      { id: 'shadow-fire-t', title: t('HOME_MOVIE_SHADOW_FIRE'), meta: `${t('HOME_GENRE_THRILLER')} · 2026`, image: img('photo-1598899134739-24c46f58b8c0', 600, 900) },
      { id: 'heart-ocean-t', title: t('HOME_MOVIE_HEART_OF_OCEAN'), meta: `${t('HOME_GENRE_DRAMA')} · 2026`, image: img('photo-1489599849927-2ee91cede3ba', 600, 900) },
      { id: 'space-around-t', title: t('HOME_MOVIE_SPACE_AROUND'), meta: `${t('HOME_GENRE_DRAMA')} · 2026`, image: img('photo-1440404653325-ab127d49abc1', 600, 900) },
    ],
  }))

  const genres = computed<IHomeGenre[]>(() => [
    { id: 'action', title: t('HOME_GENRE_ACTION'), image: img('photo-1547234935-80c7145ec969', 400, 300) },
    { id: 'scifi', title: 'Sci-Fi', image: img('photo-1446776653964-20c1d3a81b06', 400, 300) },
    { id: 'thriller', title: t('HOME_GENRE_THRILLER'), image: img('photo-1536440136628-849c177e76a1', 400, 300) },
    { id: 'drama', title: t('HOME_GENRE_DRAMA'), image: img('photo-1485846234645-a62644f84728', 400, 300) },
    { id: 'comedy', title: t('HOME_GENRE_COMEDY'), image: img('photo-1585951237318-9ea5e175b891', 400, 300) },
    { id: 'horror', title: t('HOME_GENRE_HORROR'), image: img('photo-1509248961158-e54f6934749c', 400, 300) },
  ])

  return {
    featured,
    continueWatching,
    popular,
    topTen,
    genres,
  }
}
