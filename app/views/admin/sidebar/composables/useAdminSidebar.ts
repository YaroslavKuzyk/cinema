import {
  LayoutGrid,
  Users,
  Film,
  Tv,
  Smile,
  FolderOpen,
  UserCog,
  Circle,
  Settings,
} from 'lucide-vue-next'
import type { IAdminNavigationGroup, IAdminUserInfo } from '../domain'

export function useAdminSidebar() {
  const { t } = useI18n()

  const navigationGroups = computed<IAdminNavigationGroup[]>(() => [
    {
      title: t('ADMIN_SIDEBAR_MAIN'),
      items: [
        { to: '/admin/dashboard', label: t('ADMIN_SIDEBAR_DASHBOARD'), icon: LayoutGrid },
        { to: '/admin/users', label: t('ADMIN_SIDEBAR_USERS'), icon: Users },
      ],
    },
    {
      title: t('ADMIN_SIDEBAR_CONTENT'),
      items: [
        { to: '/admin/movies', label: t('ADMIN_SIDEBAR_MOVIES'), icon: Film },
        { to: '/admin/series', label: t('ADMIN_SIDEBAR_SERIES'), icon: Tv },
        { to: '/admin/anime', label: t('ADMIN_SIDEBAR_ANIME'), icon: Smile },
        { to: '/admin/genres', label: t('ADMIN_SIDEBAR_GENRES'), icon: FolderOpen },
      ],
    },
    {
      title: t('ADMIN_SIDEBAR_SYSTEM'),
      items: [
        { to: '/admin/administrators', label: t('ADMIN_SIDEBAR_ADMINISTRATORS'), icon: UserCog },
        { to: '/admin/roles', label: t('ADMIN_SIDEBAR_ROLES'), icon: Circle },
        { to: '/admin/settings', label: t('ADMIN_SIDEBAR_SETTINGS'), icon: Settings },
      ],
    },
  ])

  // TODO: Replace with real user data from auth store
  const userInfo = computed<IAdminUserInfo>(() => ({
    name: 'Адмін',
    role: 'Super Admin',
    initials: 'АД',
  }))

  return {
    navigationGroups,
    userInfo,
  }
}
