<template>
  <AppModal
    v-model="isOpen"
    :title="$t('ADMIN_ADMINS_EDIT_TITLE')"
    :description="$t('ADMIN_ADMINS_EDIT_DESC')"
    size="large"
  >
    <template #icon>
      <div class="admin-edit-modal__icon">
        <SquarePen :size="24" />
      </div>
    </template>

    <div class="admin-edit-modal__body">
      <div class="admin-edit-modal__row">
        <AppInput
          v-model="form.firstName"
          :label="$t('ADMIN_ADMINS_INVITE_FIRST_NAME')"
          :placeholder="$t('ADMIN_ADMINS_INVITE_FIRST_NAME_PLACEHOLDER')"
        />
        <AppInput
          v-model="form.lastName"
          :label="$t('ADMIN_ADMINS_INVITE_LAST_NAME')"
          :placeholder="$t('ADMIN_ADMINS_INVITE_LAST_NAME_PLACEHOLDER')"
        />
      </div>
      <AppInput
        v-model="form.email"
        :label="$t('ADMIN_ADMINS_INVITE_EMAIL')"
        readonly
      />
      <AppSelect
        v-model="form.role"
        :label="$t('ADMIN_ADMINS_INVITE_ROLE')"
        :options="roleOptions"
        item-title="title"
        item-value="value"
        :placeholder="$t('ADMIN_ADMINS_INVITE_ROLE_PLACEHOLDER')"
      />
    </div>

    <template #footer>
      <AppButton variant="secondary" size="medium" @click="isOpen = false">
        {{ $t("ADMIN_ADMINS_CANCEL") }}
      </AppButton>
      <AppButton size="medium" :disabled="!isFormValid" @click="handleSave">
        {{ $t("ADMIN_ADMINS_EDIT_SAVE") }}
      </AppButton>
    </template>
  </AppModal>
</template>

<script setup lang="ts">
import { SquarePen } from "lucide-vue-next";
import type { IAdmin } from "../domain";

const props = defineProps<{
  modelValue: boolean;
  admin: IAdmin | null;
}>();

const emit = defineEmits<{
  "update:modelValue": [value: boolean];
  save: [
    data: {
      id: string;
      firstName: string;
      lastName: string;
      email: string;
      role: string;
    },
  ];
}>();

const isOpen = computed({
  get: () => props.modelValue,
  set: (value) => emit("update:modelValue", value),
});

const form = reactive({
  firstName: "",
  lastName: "",
  email: "",
  role: "",
});

const roleOptions = computed(() => [
  { title: "Super Admin", value: "Super Admin" },
  { title: "Редактор", value: "Редактор" },
  { title: "Модератор", value: "Модератор" },
  { title: "Переглядач", value: "Переглядач" },
]);

const isFormValid = computed(() => {
  return (
    form.firstName.trim() !== "" &&
    form.lastName.trim() !== "" &&
    form.role !== ""
  );
});

const loadAdmin = (admin: IAdmin) => {
  form.firstName = admin.firstName;
  form.lastName = admin.lastName;
  form.email = admin.email;
  form.role = admin.role;
};

watch(
  () => props.modelValue,
  (open) => {
    if (open && props.admin) {
      loadAdmin(props.admin);
    }
  },
);

const handleSave = () => {
  if (props.admin) {
    emit("save", { id: props.admin.id, ...toRaw(form) });
  }
  isOpen.value = false;
};
</script>

<style lang="scss" scoped>
.admin-edit-modal {
  &__icon {
    align-items: center;
    background: var(--color-info-bg);
    border-radius: var(--radius-md);
    color: var(--color-info);
    display: flex;
    height: fluid(48px, 56px);
    justify-content: center;
    width: fluid(48px, 56px);
  }

  &__body {
    display: flex;
    flex-direction: column;
    gap: var(--spacing-md);
  }

  &__row {
    display: flex;
    gap: var(--spacing-md);

    > * {
      flex: 1;
    }
  }
}
</style>
