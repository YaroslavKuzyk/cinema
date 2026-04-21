export type EpisodeStatus = 'uploaded' | 'processing' | 'pending'
export type SeasonStatus = 'published' | 'draft'

export interface IEpisode {
  id: string
  number: number
  title: string
  duration: string
  size: string
  status: EpisodeStatus
}

export interface ISeason {
  id: string
  number: number
  title: string
  premiereDate: string
  description: string
  status: SeasonStatus
  isCurrent: boolean
  episodes: IEpisode[]
  isExpanded: boolean
}
