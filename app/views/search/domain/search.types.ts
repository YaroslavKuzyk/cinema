import type { TMediaType } from '~/components/Public/MediaDetails/index.types'

export type TSearchTypeFilter = 'all' | TMediaType

export type TSearchSort = 'rating' | 'year' | 'title'

export interface ISearchItem {
  id: string
  type: TMediaType
  title: string
  image: string
  rating: number
  year: number
  typeLabel: string
  genres: string[]
}
