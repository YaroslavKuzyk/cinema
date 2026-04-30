<template>
  <AccountShell
    active-key="profile"
    :title="$t('ACCOUNT_PROFILE_TITLE')"
    :description="$t('ACCOUNT_PROFILE_DESCRIPTION')"
  >
    <!-- Avatar -->
    <AccountSection
      :title="$t('ACCOUNT_AVATAR_TITLE')"
      :description="$t('ACCOUNT_AVATAR_DESCRIPTION')"
    >
      <div class="profile-page__avatars">
        <button
          v-for="opt in avatarOptions"
          :key="opt.id"
          type="button"
          class="profile-page__avatar"
          :class="{ 'profile-page__avatar--active': user.avatarColor === opt.color }"
          :style="{ '--avatar-bg': opt.color }"
          @click="update({ avatarColor: opt.color })"
        >
          <AppAvatar size="small" :initials="user.initials" />
        </button>
        <button type="button" class="profile-page__avatar profile-page__avatar--upload">
          <Plus :size="24" />
        </button>
      </div>
    </AccountSection>

    <!-- Personal info -->
    <AccountSection
      :title="$t('ACCOUNT_PERSONAL_TITLE')"
      :description="$t('ACCOUNT_PERSONAL_DESCRIPTION')"
    >
      <div class="profile-page__grid">
        <AppInput v-model="form.firstName" :label="$t('ACCOUNT_FIRST_NAME')" />
        <AppInput v-model="form.lastName" :label="$t('ACCOUNT_LAST_NAME')" />
      </div>

      <div class="profile-page__actions">
        <AppButton variant="primary" @click="savePersonal">
          {{ $t("ACCOUNT_SAVE") }}
        </AppButton>
      </div>
    </AccountSection>

    <!-- Email -->
    <AccountSection
      :title="$t('ACCOUNT_EMAIL_TITLE')"
      :description="$t('ACCOUNT_EMAIL_DESCRIPTION')"
    >
      <AppInput
        :model-value="user.email"
        :label="$t('ACCOUNT_EMAIL_CURRENT')"
        readonly
      />
      <AppInput
        v-model="newEmail"
        :label="$t('ACCOUNT_EMAIL_NEW')"
        :placeholder="$t('ACCOUNT_EMAIL_PLACEHOLDER')"
        type="email"
      />

      <div class="profile-page__actions">
        <AppButton variant="primary" :disabled="!newEmail" @click="changeEmail">
          {{ $t("ACCOUNT_EMAIL_CHANGE") }}
        </AppButton>
      </div>
    </AccountSection>

    <!-- Phone -->
    <AccountSection
      :title="$t('ACCOUNT_PHONE_TITLE')"
      :description="$t('ACCOUNT_PHONE_DESCRIPTION')"
    >
      <div class="profile-page__phone-row">
        <span class="profile-page__phone-label">{{ $t("ACCOUNT_PHONE_CURRENT") }}</span>
        <div class="profile-page__phone-fields">
          <div class="profile-page__phone-code">{{ user.phoneCountry }}</div>
          <AppInput :model-value="user.phoneNumber" readonly />
        </div>
      </div>

      <div class="profile-page__phone-row">
        <span class="profile-page__phone-label">{{ $t("ACCOUNT_PHONE_NEW") }}</span>
        <div class="profile-page__phone-fields">
          <div class="profile-page__phone-code">{{ user.phoneCountry }}</div>
          <AppInput
            v-model="newPhone"
            :placeholder="$t('ACCOUNT_PHONE_PLACEHOLDER')"
          />
        </div>
      </div>

      <div class="profile-page__actions">
        <AppButton variant="primary" :disabled="!newPhone" @click="changePhone">
          {{ $t("ACCOUNT_PHONE_CHANGE") }}
        </AppButton>
      </div>
    </AccountSection>

    <!-- Delete account -->
    <AccountSection
      danger
      :title="$t('ACCOUNT_DELETE_TITLE')"
      :description="$t('ACCOUNT_DELETE_DESCRIPTION')"
    >
      <div>
        <AppButton variant="error" @click="deleteAccount">
          {{ $t("ACCOUNT_DELETE_BUTTON") }}
        </AppButton>
      </div>
    </AccountSection>
  </AccountShell>
</template>

<script setup lang="ts">
import { Plus } from "lucide-vue-next";
import { AccountSection, AccountShell } from "../components";
import { useAccountUser } from "../composables";
import type { IAccountAvatarOption } from "../domain";

const { user, update } = useAccountUser();

const avatarOptions: IAccountAvatarOption[] = [
  { id: "red", color: "var(--color-primary)" },
  { id: "pink", color: "#E91E63" },
  { id: "blue", color: "#3B82F6" },
  { id: "purple", color: "#8B5CF6" },
  { id: "orange", color: "#EA580C" },
  { id: "navy", color: "#1E3A8A" },
];

const form = reactive({
  firstName: user.value.firstName,
  lastName: user.value.lastName,
});

const newEmail = ref("");
const newPhone = ref("");

function savePersonal() {
  update({ firstName: form.firstName.trim(), lastName: form.lastName.trim() });
}

function changeEmail() {
  if (!newEmail.value.trim()) return;
  update({ email: newEmail.value.trim() });
  newEmail.value = "";
}

function changePhone() {
  if (!newPhone.value.trim()) return;
  update({ phoneNumber: newPhone.value.trim() });
  newPhone.value = "";
}

function deleteAccount() {
  // Placeholder — wire to confirmation modal + API.
}

useHead({ title: "Cinema — Кабінет" });
</script>

<style lang="scss" scoped>
.profile-page {
  &__avatars {
    display: flex;
    flex-wrap: wrap;
    gap: var(--spacing-sm);
  }

  &__avatar {
    align-items: center;
    background: transparent;
    border: 2px solid transparent;
    border-radius: var(--radius-full);
    cursor: pointer;
    display: flex;
    height: 52px;
    justify-content: center;
    padding: 0;
    transition: border-color 0.2s ease;
    width: 52px;

    :deep(.app-avatar) {
      background: var(--avatar-bg, var(--color-primary));
      border-radius: var(--radius-full);
      height: 100%;
      width: 100%;
    }

    &:hover {
      border-color: var(--color-white-20);
    }

    &--active {
      border-color: var(--color-white);
    }

    &--upload {
      background: transparent;
      border: 2px dashed var(--color-border);
      color: var(--color-text-tertiary);

      &:hover {
        border-color: var(--color-text-secondary);
        color: var(--color-white);
      }
    }
  }

  &__grid {
    display: grid;
    gap: var(--spacing-base);
    grid-template-columns: 1fr 1fr;
  }

  &__actions {
    display: flex;
    gap: var(--spacing-xs);
    margin-top: var(--spacing-2xs);
  }

  &__phone-row {
    display: flex;
    flex-direction: column;
    gap: var(--spacing-xs);
  }

  &__phone-label {
    @include FluidFontLabel;
    color: var(--color-text-secondary);
  }

  &__phone-fields {
    display: grid;
    gap: var(--spacing-xs);
    grid-template-columns: 80px 1fr;
  }

  &__phone-code {
    @include FluidFontBodySm;
    align-items: center;
    background: var(--color-divider);
    border: 2px solid var(--color-border);
    border-radius: var(--radius-md);
    color: var(--color-white);
    display: flex;
    height: var(--input-field-height);
    justify-content: center;
  }
}
</style>
