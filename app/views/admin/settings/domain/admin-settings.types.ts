export interface ISettingsGeneral {
  platformName: string
  domain: string
  defaultLanguage: string
  timezone: string
  seoDescription: string
}

export interface ISettingsAppearance {
  primaryColor: string
  logoUrl: string
  faviconUrl: string
}

export interface ISettingsNotifications {
  emailOnNewContent: boolean
  emailOnComplaints: boolean
  dailyReport: boolean
  pushNotifications: boolean
  errorNotifications: boolean
}

export interface ISettingsPlayer {
  defaultQuality: string
  maxQuality: string
  autoplay: string
  defaultSubtitles: boolean
  skipIntro: boolean
  nextEpisode: boolean
}

export interface ISettingsApi {
  publicKey: string
  secretKey: string
  secretKeyLastGenerated: string
  webhookUrl: string
}

export interface ISettingsTab {
  title: string
  value: string
  icon: string
}
