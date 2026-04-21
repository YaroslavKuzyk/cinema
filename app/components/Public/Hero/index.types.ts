export interface IHeroFeatured {
  id: string
  title: string
  description: string
  tag: string
  rating: number
  year: number
  duration: string
  genres: string[]
  image: string
}

export interface IHeroProps {
  featured: IHeroFeatured
}
