export type AdminStatus = 'online' | 'offline' | 'away'
export type InvitationStatus = 'pending' | 'expired'

export interface IAdminPermissionTag {
  key: string
  label: string
  active: boolean
}

export interface IAdmin {
  id: string
  firstName: string
  lastName: string
  email: string
  initials: string
  avatarColor: string
  role: string
  roleBadgeVariant: string
  roleIcon: string
  status: AdminStatus
  lastLogin: string
  createdAt: string
  actionsToday: number
  permissionTags: IAdminPermissionTag[]
}

export interface IAdminInvitation {
  id: string
  firstName: string
  lastName: string
  email: string
  initials: string
  avatarColor: string
  role: string
  invitedAt: string
  expiresAt: string
  status: InvitationStatus
}

export interface IAdminStats {
  total: number
  online: number
  roles: number
  pendingInvitations: number
}

export interface IAdminFilters {
  search: string
  role: string
  status: string
}
