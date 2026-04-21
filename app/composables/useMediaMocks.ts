import type { IMediaDetails } from '~/components/Public/MediaModal/index.types'
import type { IMovie } from '~/components/Public/MovieCard/index.types'

const img = (id: string, w: number, h: number) =>
  `https://images.unsplash.com/${id}?w=${w}&h=${h}&fit=crop&auto=format&q=80`

export function useMediaMocks() {
  const { t } = useI18n()

  const movie = computed<IMediaDetails>(() => ({
    id: 'mock-movie',
    type: 'movie',
    typeBadge: t('MEDIA_TYPE_MOVIE'),
    title: t('HOME_MOVIE_INTERSTELLAR_2'),
    description: t('MEDIA_MOVIE_DESCRIPTION'),
    image: img('photo-1478720568477-152d9b164e26', 1400, 600),
    matchPercent: 97,
    year: 2026,
    duration: '2 ' + t('MEDIA_HOUR_SHORT') + ' 45 ' + t('HOME_MIN_SHORT'),
    flags: ['4K', 'HDR', 'Dolby Atmos', '16+'],
    watchLabel: t('HOME_HERO_WATCH'),
    info: [
      { label: t('MEDIA_INFO_DIRECTOR'), value: 'Крістофер Нолан' },
      { label: t('MEDIA_INFO_CAST'), value: 'Меттью МакКонахі, Енн Гетевей, Тімоті Шаламе' },
      { label: t('MEDIA_INFO_GENRE'), value: 'Sci-Fi, ' + t('GENRES_DRAMA') + ', ' + t('GENRES_ADVENTURE') },
      { label: t('MEDIA_INFO_COUNTRY'), value: 'США, ' + t('MEDIA_COUNTRY_UK') },
      { label: t('MEDIA_INFO_LANGUAGE'), value: t('MEDIA_LANGUAGE_EN_UA') },
    ],
    ratingLabel: 'IMDb',
    rating: 8.7,
    similar: buildSimilar([
      ['signal-mars', t('MY_LIST_MOVIE_SIGNAL_MARS'), 'Sci-Fi · 2026', 'photo-1446776653964-20c1d3a81b06'],
      ['space-around', t('HOME_MOVIE_SPACE_AROUND'), 'Sci-Fi · 2025', 'photo-1440404653325-ab127d49abc1'],
      ['beyond-horizon', t('MY_LIST_MOVIE_HORIZON'), t('GENRES_ADVENTURE') + ' · 2026', 'photo-1532978879514-6cb6e6a4e7c1'],
      ['martian', t('MEDIA_MOVIE_MARTIAN'), 'Sci-Fi · 2015', 'photo-1547234935-80c7145ec969'],
      ['contact', t('MEDIA_MOVIE_CONTACT'), 'Sci-Fi · 1997', 'photo-1598899134739-24c46f58b8c0'],
    ]),
    similarTitle: t('MEDIA_SIMILAR_MOVIES'),
  }))

  const series = computed<IMediaDetails>(() => ({
    id: 'mock-series',
    type: 'series',
    typeBadge: `${t('MEDIA_TYPE_SERIES')} · 6 ${t('MY_LIST_SEASONS')}`,
    title: t('MEDIA_SERIES_TITLE'),
    description: t('MEDIA_SERIES_DESCRIPTION'),
    image: img('photo-1489599849927-2ee91cede3ba', 1400, 600),
    matchPercent: 95,
    year: 2026,
    duration: `6 ${t('MY_LIST_SEASONS')}`,
    flags: ['4K', 'HDR', '18+'],
    watchLabel: `S1:E1 ${t('HOME_HERO_WATCH')}`,
    info: [
      { label: t('MEDIA_INFO_CREATORS'), value: 'HBO, Джордж Мартін' },
      { label: t('MEDIA_INFO_CAST'), value: 'Емілія Кларк, Кіт Гаррінгтон' },
      { label: t('MEDIA_INFO_GENRE'), value: t('MEDIA_GENRE_FANTASY') + ', ' + t('GENRES_DRAMA') },
    ],
    ratingLabel: 'IMDb',
    rating: 9.1,
    seasons: Array.from({ length: 6 }, (_, i) => ({
      key: `s${i + 1}`,
      title: `${t('MEDIA_SEASON')} ${i + 1}`,
      episodes: [
        { number: 1, title: t('MEDIA_EPISODE_WINTER'), duration: `58 ${t('HOME_MIN_SHORT')}`, note: t('MEDIA_EPISODE_PREMIERE'), description: t('MEDIA_EPISODE_WINTER_DESC'), image: img('photo-1509248961158-e54f6934749c', 240, 140) },
        { number: 2, title: t('MEDIA_EPISODE_KINGSROAD'), duration: `62 ${t('HOME_MIN_SHORT')}`, description: t('MEDIA_EPISODE_KINGSROAD_DESC'), image: img('photo-1585951237318-9ea5e175b891', 240, 140) },
        { number: 3, title: t('MEDIA_EPISODE_BLOOD_FIRE'), duration: `55 ${t('HOME_MIN_SHORT')}`, description: t('MEDIA_EPISODE_BLOOD_FIRE_DESC'), image: img('photo-1547234935-80c7145ec969', 240, 140) },
      ],
    })),
    similar: buildSimilar([
      ['dark-side', t('MEDIA_SERIES_DARK_SIDE'), `${t('GENRES_THRILLER')} · 2 ${t('MY_LIST_SEASONS')}`, 'photo-1509248961158-e54f6934749c'],
      ['patrol', t('MEDIA_SERIES_PATROL'), `${t('GENRES_ACTION')} · 4 ${t('MY_LIST_SEASONS')}`, 'photo-1578632767115-351597cf2477'],
      ['clicker', t('MEDIA_SERIES_CLICKER'), `${t('GENRES_DRAMA')} · 5 ${t('MY_LIST_SEASONS')}`, 'photo-1485846234645-a62644f84728'],
      ['beyond-border', t('MEDIA_SERIES_BEYOND_BORDER'), `${t('GENRES_ADVENTURE')} · 2 ${t('MY_LIST_SEASONS')}`, 'photo-1519741497674-611481863552'],
      ['night-city-s', t('MOVIES_MOVIE_NIGHT_CITY'), `${t('MOVIES_GENRE_DETECTIVE')} · 3 ${t('MY_LIST_SEASONS')}`, 'photo-1536440136628-849c177e76a1'],
    ]),
    similarTitle: t('MEDIA_SIMILAR_SERIES'),
  }))

  const anime = computed<IMediaDetails>(() => ({
    id: 'mock-anime',
    type: 'anime',
    typeBadge: `${t('MEDIA_TYPE_ANIME')} · 4 ${t('MY_LIST_SEASONS')}`,
    title: t('MEDIA_ANIME_TITLE'),
    description: t('MEDIA_ANIME_DESCRIPTION'),
    image: img('photo-1578632767115-351597cf2477', 1400, 600),
    matchPercent: 99,
    year: 2026,
    duration: `4 ${t('MY_LIST_SEASONS')} · 87 ${t('MEDIA_EPISODES')}`,
    flags: ['4K', 'Sub & Dub', '16+'],
    watchLabel: `S1:E1 ${t('HOME_HERO_WATCH')}`,
    info: [
      { label: t('MEDIA_INFO_STUDIO'), value: 'MAPPA' },
      { label: t('MEDIA_INFO_AUTHOR'), value: 'Хадзіме Ісаяма' },
      { label: t('MEDIA_INFO_GENRE'), value: 'Shonen, ' + t('GENRES_ACTION') + ', ' + t('GENRES_DRAMA') + ', Dark Fantasy' },
      { label: t('MEDIA_INFO_DUB'), value: t('MEDIA_LANGUAGE_JA_UA') },
    ],
    ratingLabel: 'MAL',
    rating: 9.2,
    seasons: [
      { key: 's1', title: `${t('MEDIA_SEASON')} 1` },
      { key: 's2', title: `${t('MEDIA_SEASON')} 2` },
      { key: 's3', title: `${t('MEDIA_SEASON')} 3` },
      { key: 'final', title: t('MEDIA_SEASON_FINAL') },
    ].map(s => ({
      ...s,
      episodes: [
        { number: 1, title: t('MEDIA_EPISODE_AOT_1'), duration: `24 ${t('HOME_MIN_SHORT')}`, note: t('MEDIA_EPISODE_PREMIERE'), description: t('MEDIA_EPISODE_AOT_1_DESC'), image: img('photo-1509248961158-e54f6934749c', 240, 140) },
        { number: 2, title: t('MEDIA_EPISODE_AOT_2'), duration: `24 ${t('HOME_MIN_SHORT')}`, description: t('MEDIA_EPISODE_AOT_2_DESC'), image: img('photo-1547234935-80c7145ec969', 240, 140) },
        { number: 3, title: t('MEDIA_EPISODE_AOT_3'), duration: `24 ${t('HOME_MIN_SHORT')}`, description: t('MEDIA_EPISODE_AOT_3_DESC'), image: img('photo-1578632767115-351597cf2477', 240, 140) },
      ],
    })),
    similar: buildSimilar([
      ['jjk', t('MY_LIST_ANIME_JJK'), `Shonen · 3 ${t('MY_LIST_SEASONS')}`, 'photo-1509248961158-e54f6934749c'],
      ['demon-slayer', t('MY_LIST_ANIME_DEMON_SLAYER'), `Shonen · 4 ${t('MY_LIST_SEASONS')}`, 'photo-1585951237318-9ea5e175b891'],
      ['chainsaw-man', t('MEDIA_ANIME_CHAINSAW_MAN'), `Seinen · 2 ${t('MY_LIST_SEASONS')}`, 'photo-1547234935-80c7145ec969'],
      ['spy-family', t('MY_LIST_ANIME_SPY_FAMILY'), `${t('GENRES_COMEDY')} · 3 ${t('MY_LIST_SEASONS')}`, 'photo-1532978879514-6cb6e6a4e7c1'],
      ['vinland-saga', t('MEDIA_ANIME_VINLAND_SAGA'), `Seinen · 2 ${t('MY_LIST_SEASONS')}`, 'photo-1594909122845-11baa439b7bf'],
    ]),
    similarTitle: t('MEDIA_SIMILAR_ANIME'),
  }))

  function buildSimilar(rows: Array<[string, string, string, string]>): IMovie[] {
    return rows.map(([id, title, meta, photo]) => ({
      id: `sim-${id}`,
      title,
      meta,
      image: img(photo, 600, 900),
    }))
  }

  return { movie, series, anime }
}
