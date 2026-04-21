export type ContentType = 'single' | 'multi'
export type MovieFormMode = 'create' | 'edit' | 'view'

export interface IMovieForm {
  contentType: ContentType
  title: string
  year: string
  rating: string
  duration: string
  ageRestriction: string
  country: string
  language: string
  studio: string
  description: string
  genres: ITag[]
  directors: ITag[]
  actors: ITag[]
  countries: ITag[]
  posterLarge: string
  posterSmall: string
  videoFile: IVideoFile | null
  relatedContent: IRelatedItem[]
  seoUrl: string
  isPublic: boolean
  isFeatured: boolean
}

export interface ITag {
  id: string
  label: string
  variant?: string
}

export interface IVideoFile {
  name: string
  format: string
  size: string
  resolution: string
  duration: string
  codec: string
  uploadedAt: string
  status: 'uploading' | 'done' | 'error'
}

export interface ITranscodeJob {
  quality: string
  progress: number
  status: 'pending' | 'processing' | 'done'
}

export interface IAudioTrack {
  id: string
  language: string
  label: string
  codec: string
}

export interface ISubtitle {
  id: string
  language: string
  format: string
  flag: string
}

export interface IRelatedItem {
  id: string
  title: string
  year: number
  genre: string
  image: string
}

export interface IReadinessItem {
  label: string
  done: boolean
  progress?: number
}
