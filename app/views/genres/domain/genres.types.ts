import type { Component } from 'vue'

export type TGenreSize = 'large' | 'medium'

export interface IGenreItem {
  id: string
  title: string
  image: string
  icon: Component
  titlesCount?: number
  moviesCount: number
  size: TGenreSize
}
