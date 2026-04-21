export type GenreFormMode = 'create' | 'edit' | 'view'

export interface IGenreForm {
  name: string
  slug: string
  description: string
  icon: string
  color: string
  status: 'active' | 'hidden'
  seoTitle: string
  seoDescription: string
}

export interface IGenreContentStats {
  movies: number
  series: number
  anime: number
  total: number
}
