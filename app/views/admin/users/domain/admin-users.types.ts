export type UserStatus = 'active' | 'banned' | 'inactive'

export interface IUser {
  id: string
  firstName: string
  lastName: string
  email: string
  avatar: string
  status: UserStatus
  registeredAt: string
  lastLogin: string
  watchedHours: number
  country: string
}

export interface IUserStats {
  total: number
  active: number
  banned: number
  newThisMonth: number
  totalWatchHours: string
}

export interface IUserFilters {
  search: string
  status: string
  country: string
}

export type UserFormMode = 'create' | 'edit' | 'view'

export interface IUserForm {
  firstName: string
  lastName: string
  email: string
  phone: string
  status: UserStatus
  country: string
  language: string
  bio: string
  isEmailVerified: boolean
  planId: string
  planDuration: string
  premiumUntil: string
  notes: string
}

export interface IUserActivityStats {
  watchedHours: number
  favoriteGenre: string
  watchlistCount: number
  commentsCount: number
  ratingsCount: number
  lastActive: string
}
