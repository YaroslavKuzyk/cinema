export interface IRolePermission {
  key: string
  label: string
  enabled: boolean
}

export interface IRolePermissionGroup {
  title: string
  permissions: IRolePermission[]
}

export interface IRoleAdmin {
  id: string
  initials: string
  color: string
}

export interface IRole {
  id: string
  name: string
  description: string
  isSystem: boolean
  color: string
  icon: string
  admins: IRoleAdmin[]
  permissionGroups: IRolePermissionGroup[]
}

export type RoleModalMode = 'create' | 'edit' | 'view'

export interface IRoleFormData {
  name: string
  description: string
  color: string
  icon: string
  permissionGroups: IRolePermissionGroup[]
}
