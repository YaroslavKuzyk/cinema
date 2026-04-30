import { Lock, LogOut, Settings, User, CreditCard } from 'lucide-vue-next'
import type { Component } from 'vue'
import type { TAccountNavKey } from '../domain'

export interface IAccountNavItem {
  key: TAccountNavKey
  label: string
  to: string
  icon: Component
}

export function useAccountNav() {
  const { t } = useI18n()

  const items = computed<IAccountNavItem[]>(() => [
    { key: 'profile', label: t('ACCOUNT_NAV_PROFILE'), to: '/account', icon: User },
    { key: 'security', label: t('ACCOUNT_NAV_SECURITY'), to: '/account/security', icon: Lock },
    { key: 'subscription', label: t('ACCOUNT_NAV_SUBSCRIPTION'), to: '/account/subscription', icon: CreditCard },
    { key: 'settings', label: t('ACCOUNT_NAV_SETTINGS'), to: '/account/settings', icon: Settings },
  ])

  const logoutLabel = computed(() => t('ACCOUNT_NAV_LOGOUT'))
  const logoutIcon = LogOut

  return { items, logoutLabel, logoutIcon }
}
