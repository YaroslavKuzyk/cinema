import type { Component } from 'vue'

export interface IAdminNavigationItem {
  to: string
  label: string
  icon: Component
}

export interface IAdminNavigationGroup {
  title: string
  items: IAdminNavigationItem[]
}

export interface IAdminUserInfo {
  name: string
  role: string
  initials: string
}
