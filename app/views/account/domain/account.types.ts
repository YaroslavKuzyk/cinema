export type TAccountNavKey = 'profile' | 'security' | 'subscription' | 'settings'

export interface IAccountUser {
  firstName: string
  lastName: string
  email: string
  phoneCountry: string
  phoneNumber: string
  avatarColor: string
  initials: string
}

export interface IAccountAvatarOption {
  id: string
  color: string
}

export interface IAccountSession {
  id: string
  device: string
  location: string
  timeAgo?: string
  current?: boolean
  icon: 'tv' | 'phone' | 'laptop'
}

export interface IAccountLoginEntry {
  id: string
  date: string
  device: string
  location: string
}

export interface IAccountPlan {
  id: 'basic' | 'standard' | 'premium'
  name: string
  price: number
  features: string[]
  isCurrent?: boolean
}

export interface IAccountPayment {
  id: string
  date: string
  description: string
  amount: number
  status: 'paid' | 'failed' | 'pending'
}

export type TSubtitleSize = 'small' | 'medium' | 'large'
export type TSubtitleColor = 'white' | 'yellow' | 'green'
export type TVideoQuality = 'auto' | '4k' | '1080p' | '720p'
export type TInterfaceLang = 'uk' | 'en' | 'pl'
export type TContentLang = 'uk' | 'original' | 'dub'
export type TAgeRating = 'none' | '12' | '16' | '18'
