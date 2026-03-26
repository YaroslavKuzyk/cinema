export interface IAdminAccountInfo {
  role: string
  status: 'online' | 'offline'
  joinedAt: string
  lastLogin: string
  is2faEnabled: boolean
  ipAddress: string
}

export interface IAdminAccountPersonalInfo {
  firstName: string
  lastName: string
  email: string
  phone: string
  about: string
}

export interface IAdminAccountSecurity {
  currentPassword: string
  newPassword: string
  is2faEnabled: boolean
  isEmailLoginEnabled: boolean
}

export interface IAdminSession {
  id: string
  device: string
  browser: string
  location: string
  ipAddress: string
  lastActive: string
  isCurrent: boolean
}

export interface IAdminAccountNotifications {
  emailNotifications: boolean
  pushNotifications: boolean
  dailyDigest: boolean
  marketingEmails: boolean
}

export type ActivityType =
  | 'published'
  | 'edited'
  | 'deleted'
  | 'blocked'
  | 'created'
  | 'invited'
  | 'updated'

export type ActivityDotColor =
  | 'success'
  | 'info'
  | 'danger'
  | 'purple'
  | 'warning'
  | 'muted'

export interface IAdminActivity {
  id: string
  type: ActivityType
  description: string
  timestamp: string
  dotColor: ActivityDotColor
}

export interface IAdminAccountStats {
  actionsPerMonth: number
  contentAdded: number
  daysActive: number
}

export interface IAdminAccountTab {
  title: string
  value: string
}
