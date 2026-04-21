import { markRaw } from 'vue'
import {
  BookOpen,
  Clapperboard,
  Compass,
  Flame,
  Ghost,
  Heart,
  Landmark,
  Moon,
  Music,
  Rocket,
  Shield,
  Smile,
  Sparkles,
  Trophy,
  Tv,
  Users,
} from 'lucide-vue-next'
import type { IGenreItem } from '../domain'

const img = (id: string, w: number, h: number) =>
  `https://images.unsplash.com/${id}?w=${w}&h=${h}&fit=crop&auto=format&q=80`

export function useGenres() {
  const { t } = useI18n()

  const genres = computed<IGenreItem[]>(() => [
    { id: 'action', title: t('GENRES_ACTION'), icon: markRaw(Flame), image: img('photo-1542204165-65bf26472b9b', 900, 500), titlesCount: 648, moviesCount: 57, size: 'large' },
    { id: 'scifi', title: t('GENRES_SCIFI'), icon: markRaw(Rocket), image: img('photo-1446776653964-20c1d3a81b06', 900, 500), titlesCount: 412, moviesCount: 89, size: 'large' },

    { id: 'thriller', title: t('GENRES_THRILLER'), icon: markRaw(Tv), image: img('photo-1440404653325-ab127d49abc1', 500, 400), moviesCount: 132, size: 'medium' },
    { id: 'drama', title: t('GENRES_DRAMA'), icon: markRaw(Clapperboard), image: img('photo-1485846234645-a62644f84728', 500, 400), moviesCount: 241, size: 'medium' },
    { id: 'comedy', title: t('GENRES_COMEDY'), icon: markRaw(Smile), image: img('photo-1585951237318-9ea5e175b891', 500, 400), moviesCount: 178, size: 'medium' },
    { id: 'horror', title: t('GENRES_HORROR'), icon: markRaw(Ghost), image: img('photo-1509248961158-e54f6934749c', 500, 400), moviesCount: 94, size: 'medium' },

    { id: 'anime', title: t('GENRES_ANIME'), icon: markRaw(Sparkles), image: img('photo-1578632767115-351597cf2477', 900, 500), titlesCount: 1240, moviesCount: 158, size: 'large' },
    { id: 'romance', title: t('GENRES_ROMANCE'), icon: markRaw(Heart), image: img('photo-1519741497674-611481863552', 900, 500), titlesCount: 389, moviesCount: 112, size: 'large' },

    { id: 'adventure', title: t('GENRES_ADVENTURE'), icon: markRaw(Compass), image: img('photo-1464822759023-fed622ff2c3b', 500, 400), moviesCount: 167, size: 'medium' },
    { id: 'documentary', title: t('GENRES_DOCUMENTARY'), icon: markRaw(BookOpen), image: img('photo-1522202176988-66273c2fd55f', 500, 400), moviesCount: 203, size: 'medium' },
    { id: 'crime', title: t('GENRES_CRIME'), icon: markRaw(Shield), image: img('photo-1494783367193-149034c05e8f', 500, 400), moviesCount: 118, size: 'medium' },
    { id: 'family', title: t('GENRES_FAMILY'), icon: markRaw(Users), image: img('photo-1489599849927-2ee91cede3ba', 500, 400), moviesCount: 76, size: 'medium' },

    { id: 'historical', title: t('GENRES_HISTORICAL'), icon: markRaw(Landmark), image: img('photo-1598899134739-24c46f58b8c0', 500, 400), moviesCount: 143, size: 'medium' },
    { id: 'mystery', title: t('GENRES_MYSTERY'), icon: markRaw(Moon), image: img('photo-1478720568477-152d9b164e26', 500, 400), moviesCount: 87, size: 'medium' },
    { id: 'sport', title: t('GENRES_SPORT'), icon: markRaw(Trophy), image: img('photo-1594909122845-11baa439b7bf', 500, 400), moviesCount: 39, size: 'medium' },
    { id: 'musical', title: t('GENRES_MUSICAL'), icon: markRaw(Music), image: img('photo-1536440136628-849c177e76a1', 500, 400), moviesCount: 52, size: 'medium' },
  ])

  return { genres }
}
