import type { IRole, IRoleFormData, RoleModalMode } from '../domain'

export function useAdminRoles() {
  const isModalOpen = ref(false)
  const modalMode = ref<RoleModalMode>('create')
  const editingRole = ref<IRole | null>(null)

  const isDeleteModalOpen = ref(false)
  const isDuplicateModalOpen = ref(false)
  const targetRole = ref<IRole | null>(null)

  const openDeleteModal = (roleId: string) => {
    const role = roles.value.find((r) => r.id === roleId)
    if (!role) return
    targetRole.value = role
    isDeleteModalOpen.value = true
  }

  const openDuplicateModal = (roleId: string) => {
    const role = roles.value.find((r) => r.id === roleId)
    if (!role) return
    targetRole.value = role
    isDuplicateModalOpen.value = true
  }

  const confirmDelete = (roleId: string, replacementRoleId: string | null) => {
    if (replacementRoleId) {
      const deletedRole = roles.value.find((r) => r.id === roleId)
      const targetRole = roles.value.find((r) => r.id === replacementRoleId)
      if (deletedRole && targetRole) {
        const existingIds = new Set(targetRole.admins.map((a) => a.id))
        const newAdmins = deletedRole.admins.filter((a) => !existingIds.has(a.id))
        targetRole.admins.push(...newAdmins)
      }
    }
    roles.value = roles.value.filter((r) => r.id !== roleId)
  }

  const confirmDuplicate = (roleId: string, name: string, description: string) => {
    const source = roles.value.find((r) => r.id === roleId)
    if (!source) return

    const newRole: IRole = {
      ...JSON.parse(JSON.stringify(source)),
      id: String(Date.now()),
      name,
      description,
      isSystem: false,
      admins: [],
    }
    roles.value.push(newRole)
  }

  const openCreateModal = () => {
    modalMode.value = 'create'
    editingRole.value = null
    isModalOpen.value = true
  }

  const openEditModal = (roleId: string) => {
    const role = roles.value.find((r) => r.id === roleId)
    if (!role) return
    modalMode.value = 'edit'
    editingRole.value = role
    isModalOpen.value = true
  }

  const openViewModal = (roleId: string) => {
    const role = roles.value.find((r) => r.id === roleId)
    if (!role) return
    modalMode.value = 'view'
    editingRole.value = role
    isModalOpen.value = true
  }

  const saveRole = (data: IRoleFormData) => {
    if (modalMode.value === 'create') {
      const newRole: IRole = {
        id: String(Date.now()),
        name: data.name,
        description: data.description,
        isSystem: false,
        color: data.color,
        icon: data.icon,
        admins: [],
        permissionGroups: data.permissionGroups,
      }
      roles.value.push(newRole)
    } else if (modalMode.value === 'edit' && editingRole.value) {
      const index = roles.value.findIndex((r) => r.id === editingRole.value!.id)
      if (index !== -1) {
        roles.value[index] = {
          ...roles.value[index],
          name: data.name,
          description: data.description,
          color: data.color,
          icon: data.icon,
          permissionGroups: data.permissionGroups,
        }
      }
    }
  }

  const roles = ref<IRole[]>([
    {
      id: '1',
      name: 'Super Admin',
      description: 'Повний доступ до всіх функцій. Не може бути видалена.',
      isSystem: true,
      color: '#E50914',
      icon: 'shield',
      admins: [
        { id: '1', initials: 'АД', color: '#E50914' },
      ],
      permissionGroups: [
        {
          title: 'КОНТЕНТ',
          permissions: [
            { key: 'content.create', label: 'Створення', enabled: true },
            { key: 'content.edit', label: 'Редагування', enabled: true },
            { key: 'content.delete', label: 'Видалення', enabled: true },
            { key: 'content.publish', label: 'Публікація', enabled: true },
          ],
        },
        {
          title: 'КОРИСТУВАЧІ',
          permissions: [
            { key: 'users.view', label: 'Перегляд', enabled: true },
            { key: 'users.edit', label: 'Редагування', enabled: true },
            { key: 'users.block', label: 'Блокування', enabled: true },
            { key: 'users.delete', label: 'Видалення', enabled: true },
          ],
        },
        {
          title: 'КОМЕНТАРІ',
          permissions: [
            { key: 'comments.view', label: 'Перегляд', enabled: true },
            { key: 'comments.moderate', label: 'Модерація', enabled: true },
            { key: 'comments.delete', label: 'Видалення', enabled: true },
          ],
        },
        {
          title: 'ЖАНРИ',
          permissions: [
            { key: 'genres.create', label: 'Створення', enabled: true },
            { key: 'genres.edit', label: 'Редагування', enabled: true },
            { key: 'genres.delete', label: 'Видалення', enabled: true },
          ],
        },
        {
          title: 'ФІНАНСИ',
          permissions: [
            { key: 'finance.subscriptions', label: 'Підписки', enabled: true },
            { key: 'finance.payments', label: 'Платежі', enabled: true },
            { key: 'finance.reports', label: 'Звіти', enabled: true },
          ],
        },
        {
          title: 'СИСТЕМА',
          permissions: [
            { key: 'system.roles', label: 'Ролі', enabled: true },
            { key: 'system.admins', label: 'Адміни', enabled: true },
            { key: 'system.settings', label: 'Налаштування', enabled: true },
          ],
        },
      ],
    },
    {
      id: '2',
      name: 'Редактор',
      description: 'Управління контентом: фільми, серіали, аніме, жанри. Без доступу до системних налаштувань.',
      isSystem: false,
      color: '#22C55E',
      icon: 'pen-square',
      admins: [
        { id: '2', initials: 'ОК', color: '#3B82F6' },
        { id: '3', initials: 'АШ', color: '#FBBF24' },
      ],
      permissionGroups: [
        {
          title: 'КОНТЕНТ',
          permissions: [
            { key: 'content.create', label: 'Створення', enabled: true },
            { key: 'content.edit', label: 'Редагування', enabled: true },
            { key: 'content.delete', label: 'Видалення', enabled: true },
            { key: 'content.publish', label: 'Публікація', enabled: true },
          ],
        },
        {
          title: 'КОРИСТУВАЧІ',
          permissions: [
            { key: 'users.view', label: 'Перегляд', enabled: true },
            { key: 'users.edit', label: 'Редагування', enabled: false },
            { key: 'users.block', label: 'Блокування', enabled: false },
            { key: 'users.delete', label: 'Видалення', enabled: false },
          ],
        },
        {
          title: 'КОМЕНТАРІ',
          permissions: [
            { key: 'comments.view', label: 'Перегляд', enabled: true },
            { key: 'comments.moderate', label: 'Модерація', enabled: false },
            { key: 'comments.delete', label: 'Видалення', enabled: false },
          ],
        },
        {
          title: 'ЖАНРИ',
          permissions: [
            { key: 'genres.create', label: 'Створення', enabled: true },
            { key: 'genres.edit', label: 'Редагування', enabled: true },
            { key: 'genres.delete', label: 'Видалення', enabled: false },
          ],
        },
        {
          title: 'ФІНАНСИ',
          permissions: [
            { key: 'finance.subscriptions', label: 'Підписки', enabled: false },
            { key: 'finance.payments', label: 'Платежі', enabled: false },
            { key: 'finance.reports', label: 'Звіти', enabled: false },
          ],
        },
        {
          title: 'СИСТЕМА',
          permissions: [
            { key: 'system.roles', label: 'Ролі', enabled: false },
            { key: 'system.admins', label: 'Адміни', enabled: false },
            { key: 'system.settings', label: 'Налаштування', enabled: false },
          ],
        },
      ],
    },
    {
      id: '3',
      name: 'Модератор',
      description: 'Модерація коментарів, скарг та блокування користувачів. Обмежений доступ до контенту.',
      isSystem: false,
      color: '#A855F7',
      icon: 'shield-check',
      admins: [
        { id: '4', initials: 'МВ', color: '#EF4444' },
        { id: '5', initials: 'ДЛ', color: '#22C55E' },
      ],
      permissionGroups: [
        {
          title: 'КОНТЕНТ',
          permissions: [
            { key: 'content.create', label: 'Створення', enabled: true },
            { key: 'content.edit', label: 'Редагування', enabled: true },
            { key: 'content.delete', label: 'Видалення', enabled: false },
            { key: 'content.publish', label: 'Публікація', enabled: false },
          ],
        },
        {
          title: 'КОРИСТУВАЧІ',
          permissions: [
            { key: 'users.view', label: 'Перегляд', enabled: true },
            { key: 'users.edit', label: 'Редагування', enabled: false },
            { key: 'users.block', label: 'Блокування', enabled: true },
            { key: 'users.delete', label: 'Видалення', enabled: false },
          ],
        },
        {
          title: 'КОМЕНТАРІ',
          permissions: [
            { key: 'comments.view', label: 'Перегляд', enabled: true },
            { key: 'comments.moderate', label: 'Модерація', enabled: true },
            { key: 'comments.delete', label: 'Видалення', enabled: true },
          ],
        },
        {
          title: 'ЖАНРИ',
          permissions: [
            { key: 'genres.create', label: 'Створення', enabled: false },
            { key: 'genres.edit', label: 'Редагування', enabled: false },
            { key: 'genres.delete', label: 'Видалення', enabled: false },
          ],
        },
        {
          title: 'ФІНАНСИ',
          permissions: [
            { key: 'finance.subscriptions', label: 'Підписки', enabled: false },
            { key: 'finance.payments', label: 'Платежі', enabled: false },
            { key: 'finance.reports', label: 'Звіти', enabled: false },
          ],
        },
        {
          title: 'СИСТЕМА',
          permissions: [
            { key: 'system.roles', label: 'Ролі', enabled: false },
            { key: 'system.admins', label: 'Адміни', enabled: false },
            { key: 'system.settings', label: 'Налаштування', enabled: false },
          ],
        },
      ],
    },
    {
      id: '4',
      name: 'Переглядач',
      description: 'Тільки перегляд даних без можливості редагування. Для аналітиків та стейкхолдерів.',
      isSystem: false,
      color: '#6B7280',
      icon: 'eye',
      admins: [
        { id: '6', initials: 'ІБ', color: '#6B7280' },
      ],
      permissionGroups: [
        {
          title: 'КОНТЕНТ',
          permissions: [
            { key: 'content.create', label: 'Створення', enabled: false },
            { key: 'content.edit', label: 'Редагування', enabled: false },
            { key: 'content.delete', label: 'Видалення', enabled: false },
            { key: 'content.publish', label: 'Публікація', enabled: false },
          ],
        },
        {
          title: 'КОРИСТУВАЧІ',
          permissions: [
            { key: 'users.view', label: 'Перегляд', enabled: true },
            { key: 'users.edit', label: 'Редагування', enabled: false },
            { key: 'users.block', label: 'Блокування', enabled: false },
            { key: 'users.delete', label: 'Видалення', enabled: false },
          ],
        },
        {
          title: 'КОМЕНТАРІ',
          permissions: [
            { key: 'comments.view', label: 'Перегляд', enabled: true },
            { key: 'comments.moderate', label: 'Модерація', enabled: false },
            { key: 'comments.delete', label: 'Видалення', enabled: false },
          ],
        },
        {
          title: 'ЖАНРИ',
          permissions: [
            { key: 'genres.create', label: 'Створення', enabled: false },
            { key: 'genres.edit', label: 'Редагування', enabled: false },
            { key: 'genres.delete', label: 'Видалення', enabled: false },
          ],
        },
        {
          title: 'ФІНАНСИ',
          permissions: [
            { key: 'finance.subscriptions', label: 'Підписки', enabled: true },
            { key: 'finance.payments', label: 'Платежі', enabled: true },
            { key: 'finance.reports', label: 'Звіти', enabled: true },
          ],
        },
        {
          title: 'СИСТЕМА',
          permissions: [
            { key: 'system.roles', label: 'Ролі', enabled: false },
            { key: 'system.admins', label: 'Адміни', enabled: false },
            { key: 'system.settings', label: 'Налаштування', enabled: false },
          ],
        },
      ],
    },
  ])

  return {
    roles,
    isModalOpen,
    modalMode,
    editingRole,
    isDeleteModalOpen,
    isDuplicateModalOpen,
    targetRole,
    openCreateModal,
    openEditModal,
    openViewModal,
    openDeleteModal,
    openDuplicateModal,
    confirmDelete,
    confirmDuplicate,
    saveRole,
  }
}
