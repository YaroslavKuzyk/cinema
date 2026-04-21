export interface IGenreTile {
  id: string
  title: string
  image: string
}

export interface IGenresRowProps {
  title: string
  genres: IGenreTile[]
  moreLink?: string
}
