<template>
  <AppModal
    v-model="isOpen"
    :title="$t('ADMIN_ADMINS_INVITE_TITLE')"
    :description="$t('ADMIN_ADMINS_INVITE_DESC')"
    size="large"
  >
    <template #icon>
      <div class="admin-invite-modal__icon">
        <UserPlus :size="24" />
      </div>
    </template>

    <div class="admin-invite-modal__body">
      <AppInput
        v-model="form.email"
        :label="$t('ADMIN_ADMINS_INVITE_EMAIL')"
        :placeholder="$t('ADMIN_ADMINS_INVITE_EMAIL_PLACEHOLDER')"
        type="email"
      />
      <div class="admin-invite-modal__row">
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
      <AppButton
        size="medium"
        :icon-left="UserPlus"
        :disabled="!isFormValid"
        @click="handleSave"
      >
        {{ $t("ADMIN_ADMINS_INVITE_SEND") }}
      </AppButton>
    </template>
  </AppModal>
</template>

<script setup lang="ts">
import { UserPlus } from "lucide-vue-next";

const props = defineProps<{
  modelValue: boolean;
}>();

const emit = defineEmits<{
  "update:modelValue": [value: boolean];
  save: [
    data: { email: string; firstName: string; lastName: string; role: string },
  ];
}>();

const isOpen = computed({
  get: () => props.modelValue,
  set: (value) => emit("update:modelValue", value),
});

const form = reactive({
  email: "",
  firstName: "",
  lastName: "",
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
    form.email.trim() !== "" &&
    form.firstName.trim() !== "" &&
    form.lastName.trim() !== "" &&
    form.role !== ""
  );
});

const resetForm = () => {
  form.email = "";
  form.firstName = "";
  form.lastName = "";
  form.role = "";
};

watch(
  () => props.modelValue,
  (open) => {
    if (open) {
      resetForm();
    }
  },
);

const handleSave = () => {
  emit("save", { ...toRaw(form) });
  isOpen.value = false;
};
</script>

<style lang="scss" scoped>
.admin-invite-modal {
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
