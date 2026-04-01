import type { IAdmin, IAdminInvitation, IAdminFilters, IAdminStats } from '../domain'
import type { IActivity } from '~/components/Admin/ActivityList/index.types'

export function useAdminAdministrators() {
  const admins = ref<IAdmin[]>([
    {
      id: '1',
      firstName: 'Адмін',
      lastName: 'Головний',
      email: 'admin@cinema.ua',
      initials: 'АГ',
      avatarColor: '#E50914',
      role: 'Super Admin',
      roleBadgeVariant: 'primary',
      roleIcon: 'shield',
      status: 'online',
      lastLogin: 'Зараз онлайн',
      createdAt: '01.01.2026',
      actionsToday: 47,
      permissionTags: [
        { key: 'content', label: 'Контент', active: true },
        { key: 'users', label: 'Користувачі', active: true },
        { key: 'finance', label: 'Фінанси', active: true },
        { key: 'system', label: 'Система', active: true },
        { key: 'roles', label: 'Ролі', active: true },
      ],
    },
    {
      id: '2',
      firstName: 'Олена',
      lastName: 'Коваленко',
      email: 'olena@cinema.ua',
      initials: 'ОК',
      avatarColor: '#3B82F6',
      role: 'Редактор',
      roleBadgeVariant: 'success',
      roleIcon: 'pen-square',
      status: 'online',
      lastLogin: '5 хв тому',
      createdAt: '15.01.2026',
      actionsToday: 23,
      permissionTags: [
        { key: 'content', label: 'Контент', active: true },
        { key: 'genres', label: 'Жанри', active: true },
        { key: 'users', label: 'Користувачі', active: true },
        { key: 'finance', label: 'Фінанси', active: false },
      ],
    },
    {
      id: '3',
      firstName: 'Максим',
      lastName: 'Вітренко',
      email: 'maksym@cinema.ua',
      initials: 'МВ',
      avatarColor: '#A855F7',
      role: 'Модератор',
      roleBadgeVariant: 'purple',
      roleIcon: 'shield-check',
      status: 'online',
      lastLogin: '12 хв тому',
      createdAt: '20.02.2026',
      actionsToday: 56,
      permissionTags: [
        { key: 'content', label: 'Контент', active: true },
        { key: 'comments', label: 'Коментарі', active: true },
        { key: 'complaints', label: 'Скарги', active: true },
        { key: 'system', label: 'Система', active: false },
      ],
    },
    {
      id: '4',
      firstName: 'Анна',
      lastName: 'Шевченко',
      email: 'anna@cinema.ua',
      initials: 'АШ',
      avatarColor: '#FBBF24',
      role: 'Редактор',
      roleBadgeVariant: 'success',
      roleIcon: 'pen-square',
      status: 'online',
      lastLogin: '30 хв тому',
      createdAt: '10.02.2026',
      actionsToday: 18,
      permissionTags: [
        { key: 'content', label: 'Контент', active: true },
        { key: 'genres', label: 'Жанри', active: true },
        { key: 'users', label: 'Користувачі', active: true },
        { key: 'finance', label: 'Фінанси', active: false },
      ],
    },
    {
      id: '5',
      firstName: 'Дарія',
      lastName: 'Литвин',
      email: 'daria@cinema.ua',
      initials: 'ДЛ',
      avatarColor: '#22C55E',
      role: 'Модератор',
      roleBadgeVariant: 'purple',
      roleIcon: 'shield-check',
      status: 'away',
      lastLogin: '2 год тому',
      createdAt: '01.03.2026',
      actionsToday: 8,
      permissionTags: [
        { key: 'comments', label: 'Коментарі', active: true },
        { key: 'complaints', label: 'Скарги', active: true },
        { key: 'content', label: 'Контент', active: true },
        { key: 'system', label: 'Система', active: false },
      ],
    },
    {
      id: '6',
      firstName: 'Ігор',
      lastName: 'Бондар',
      email: 'igor@cinema.ua',
      initials: 'ІБ',
      avatarColor: '#6B7280',
      role: 'Переглядач',
      roleBadgeVariant: 'basic',
      roleIcon: 'eye',
      status: 'offline',
      lastLogin: 'Вчора 18:42',
      createdAt: '05.03.2026',
      actionsToday: 0,
      permissionTags: [
        { key: 'view', label: 'Перегляд', active: true },
        { key: 'content', label: 'Контент', active: true },
        { key: 'users', label: 'Користувачі', active: true },
      ],
    },
  ])

  const invitations = ref<IAdminInvitation[]>([
    {
      id: 'inv-1',
      firstName: 'Тарас',
      lastName: 'Мельник',
      email: 'taras@gmail.com',
      initials: 'ТМ',
      avatarColor: '#F59E0B',
      role: 'Редактор',
      invitedAt: '19.03.2026',
      expiresAt: '26.03.2026',
      status: 'pending',
    },
  ])

  const filters = reactive<IAdminFilters>({
    search: '',
    role: '',
    status: '',
  })

  const stats = computed<IAdminStats>(() => ({
    total: admins.value.length,
    online: admins.value.filter((a) => a.status === 'online').length,
    roles: [...new Set(admins.value.map((a) => a.role))].length,
    pendingInvitations: invitations.value.filter((i) => i.status === 'pending').length,
  }))

  const filteredAdmins = computed(() => {
    return admins.value.filter((admin) => {
      const matchesSearch =
        !filters.search ||
        `${admin.firstName} ${admin.lastName}`.toLowerCase().includes(filters.search.toLowerCase()) ||
        admin.email.toLowerCase().includes(filters.search.toLowerCase())

      const matchesRole = !filters.role || admin.role === filters.role

      const matchesStatus = !filters.status || admin.status === filters.status

      return matchesSearch && matchesRole && matchesStatus
    })
  })

  const isInviteModalOpen = ref(false)
  const isEditModalOpen = ref(false)
  const isDisableModalOpen = ref(false)
  const isActivityModalOpen = ref(false)

  const editingAdmin = ref<IAdmin | null>(null)
  const targetAdmin = ref<IAdmin | null>(null)

  const openInviteModal = () => {
    isInviteModalOpen.value = true
  }

  const openEditModal = (adminId: string) => {
    const admin = admins.value.find((a) => a.id === adminId)
    if (!admin) return
    editingAdmin.value = admin
    isEditModalOpen.value = true
  }

  const openDisableModal = (adminId: string) => {
    const admin = admins.value.find((a) => a.id === adminId)
    if (!admin) return
    targetAdmin.value = admin
    isDisableModalOpen.value = true
  }

  const adminActivities = ref<IActivity[]>([])

  const mockActivitiesMap: Record<string, IActivity[]> = {
    '1': [
      { id: 'a1', type: 'published', description: 'Фільм "Тіні забутих предків"', timestamp: '5m', dotColor: 'success' },
      { id: 'a2', type: 'edited', description: 'Роль "Модератор"', timestamp: '15m', dotColor: 'info' },
      { id: 'a3', type: 'invited', description: 'taras@gmail.com', timestamp: '1h', dotColor: 'purple' },
      { id: 'a4', type: 'created', description: 'Жанр "Документальний"', timestamp: '2h', dotColor: 'success' },
      { id: 'a5', type: 'updated', description: 'Налаштування системи', timestamp: 'yesterday:14:30', dotColor: 'muted' },
    ],
    '2': [
      { id: 'a6', type: 'edited', description: 'Серіал "Слуга народу"', timestamp: '10m', dotColor: 'info' },
      { id: 'a7', type: 'published', description: 'Фільм "Захар Беркут"', timestamp: '30m', dotColor: 'success' },
      { id: 'a8', type: 'deleted', description: 'Дублікат контенту', timestamp: '2h', dotColor: 'danger' },
    ],
    '3': [
      { id: 'a9', type: 'blocked', description: 'Користувач spam_user_42', timestamp: '8m', dotColor: 'danger' },
      { id: 'a10', type: 'edited', description: 'Коментар до фільму', timestamp: '25m', dotColor: 'info' },
      { id: 'a11', type: 'deleted', description: 'Скарга #1204', timestamp: '1h', dotColor: 'danger' },
      { id: 'a12', type: 'updated', description: 'Правила модерації', timestamp: 'yesterday:16:45', dotColor: 'muted' },
    ],
  }

  const openActivityModal = (adminId: string) => {
    const admin = admins.value.find((a) => a.id === adminId)
    if (!admin) return
    targetAdmin.value = admin
    adminActivities.value = mockActivitiesMap[adminId] || []
    isActivityModalOpen.value = true
  }

  const confirmInvite = (data: { firstName: string; lastName: string; email: string; role: string }) => {
    const newInvitation: IAdminInvitation = {
      id: `inv-${Date.now()}`,
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      initials: `${data.firstName[0]}${data.lastName[0]}`,
      avatarColor: '#F59E0B',
      role: data.role,
      invitedAt: new Date().toLocaleDateString('uk-UA'),
      expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toLocaleDateString('uk-UA'),
      status: 'pending',
    }
    invitations.value.push(newInvitation)
    isInviteModalOpen.value = false
  }

  const confirmEdit = (adminId: string, data: { firstName: string; lastName: string; role: string }) => {
    const index = admins.value.findIndex((a) => a.id === adminId)
    if (index === -1) return
    admins.value[index] = {
      ...admins.value[index],
      firstName: data.firstName,
      lastName: data.lastName,
      role: data.role,
      initials: `${data.firstName[0]}${data.lastName[0]}`,
    }
    isEditModalOpen.value = false
    editingAdmin.value = null
  }

  const confirmDisable = (adminId: string) => {
    admins.value = admins.value.filter((a) => a.id !== adminId)
    isDisableModalOpen.value = false
    targetAdmin.value = null
  }

  const cancelInvitation = (invitationId: string) => {
    invitations.value = invitations.value.filter((i) => i.id !== invitationId)
  }

  const resendInvitation = (invitationId: string) => {
    const invitation = invitations.value.find((i) => i.id === invitationId)
    if (!invitation) return
    invitation.invitedAt = new Date().toLocaleDateString('uk-UA')
    invitation.expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toLocaleDateString('uk-UA')
    invitation.status = 'pending'
  }

  return {
    admins,
    invitations,
    filters,
    stats,
    filteredAdmins,
    isInviteModalOpen,
    isEditModalOpen,
    isDisableModalOpen,
    isActivityModalOpen,
    adminActivities,
    editingAdmin,
    targetAdmin,
    openInviteModal,
    openEditModal,
    openDisableModal,
    openActivityModal,
    confirmInvite,
    confirmEdit,
    confirmDisable,
    cancelInvitation,
    resendInvitation,
  }
}
