<template>
  <AccountShell
    active-key="security"
    :title="$t('ACCOUNT_SECURITY_TITLE')"
    :description="$t('ACCOUNT_SECURITY_DESCRIPTION')"
  >
    <!-- 2FA -->
    <AccountSection
      :title="$t('ACCOUNT_2FA_TITLE')"
      :description="$t('ACCOUNT_2FA_DESCRIPTION')"
    >
      <div class="security-page__toggle-row">
        <div class="security-page__toggle-body">
          <span class="security-page__toggle-title">{{ $t("ACCOUNT_2FA_SMS") }}</span>
          <span class="security-page__toggle-desc">
            {{ $t("ACCOUNT_2FA_SMS_HINT", { phone: maskedPhone }) }}
          </span>
        </div>
        <AppToggle v-model="smsAuth" />
      </div>
    </AccountSection>

    <!-- Active sessions -->
    <AccountSection
      :title="$t('ACCOUNT_SESSIONS_TITLE')"
      :description="$t('ACCOUNT_SESSIONS_DESCRIPTION')"
    >
      <div class="security-page__sessions">
        <article
          v-for="s in sessions"
          :key="s.id"
          class="security-page__session"
        >
          <div class="security-page__session-icon">
            <component :is="iconFor(s.icon)" :size="20" />
          </div>
          <div class="security-page__session-body">
            <div class="security-page__session-head">
              <span class="security-page__session-device">{{ s.device }}</span>
              <AppBadge v-if="s.current" variant="success" read-only>
                {{ $t("ACCOUNT_SESSION_CURRENT") }}
              </AppBadge>
            </div>
            <span class="security-page__session-location">
              {{ s.location }}<template v-if="s.timeAgo"> — {{ s.timeAgo }}</template>
            </span>
          </div>
          <button
            v-if="!s.current"
            type="button"
            class="security-page__session-disconnect"
            @click="disconnect(s.id)"
          >
            {{ $t("ACCOUNT_SESSION_DISCONNECT") }}
          </button>
        </article>
      </div>
    </AccountSection>

    <!-- Login history -->
    <AccountSection
      :title="$t('ACCOUNT_LOGIN_HISTORY_TITLE')"
      :description="$t('ACCOUNT_LOGIN_HISTORY_DESCRIPTION')"
    >
      <div class="security-page__history">
        <div
          v-for="entry in loginHistory"
          :key="entry.id"
          class="security-page__history-row"
        >
          <span class="security-page__history-date">{{ entry.date }}</span>
          <span class="security-page__history-device">{{ entry.device }}</span>
          <span class="security-page__history-location">{{ entry.location }}</span>
        </div>
      </div>
    </AccountSection>

    <!-- Change password -->
    <AccountSection
      :title="$t('ACCOUNT_PASSWORD_TITLE')"
      :description="$t('ACCOUNT_PASSWORD_DESCRIPTION')"
    >
      <AppInput
        v-model="passwordForm.current"
        :label="$t('ACCOUNT_PASSWORD_CURRENT')"
        :placeholder="$t('ACCOUNT_PASSWORD_CURRENT_PLACEHOLDER')"
        type="password"
      />
      <AppInput
        v-model="passwordForm.new"
        :label="$t('ACCOUNT_PASSWORD_NEW')"
        :placeholder="$t('ACCOUNT_PASSWORD_NEW_PLACEHOLDER')"
        type="password"
      />
      <AppInput
        v-model="passwordForm.confirm"
        :label="$t('ACCOUNT_PASSWORD_CONFIRM')"
        :placeholder="$t('ACCOUNT_PASSWORD_CONFIRM_PLACEHOLDER')"
        type="password"
      />

      <div class="security-page__actions">
        <AppButton variant="primary" :disabled="!isPasswordValid" @click="savePassword">
          {{ $t("ACCOUNT_SAVE") }}
        </AppButton>
      </div>
    </AccountSection>
  </AccountShell>
</template>

<script setup lang="ts">
import { Laptop, Smartphone, Tv } from "lucide-vue-next";
import type { Component } from "vue";
import { AccountSection, AccountShell } from "../components";
import { useAccountUser } from "../composables";
import type { IAccountLoginEntry, IAccountSession } from "../domain";

const { user } = useAccountUser();

const smsAuth = ref(true);

const maskedPhone = computed(() => {
  const n = user.value.phoneNumber.replace(/\s+/g, "");
  if (n.length < 5) return `${user.value.phoneCountry} ${user.value.phoneNumber}`;
  return `${user.value.phoneCountry} ${n.slice(0, 2)} ••• ${n.slice(-2)}`;
});

const sessions = ref<IAccountSession[]>([
  { id: "s1", device: "Smart TV Samsung", location: "Київ, Україна", icon: "tv", current: true },
  { id: "s2", device: "iPhone 15 Pro", location: "Київ, Україна", timeAgo: "2 години тому", icon: "phone" },
  { id: "s3", device: "MacBook Pro", location: "Київ, Україна", timeAgo: "вчора", icon: "laptop" },
]);

const iconMap: Record<IAccountSession["icon"], Component> = {
  tv: Tv,
  phone: Smartphone,
  laptop: Laptop,
};

function iconFor(icon: IAccountSession["icon"]) {
  return iconMap[icon];
}

function disconnect(id: string) {
  sessions.value = sessions.value.filter(s => s.id !== id);
}

const loginHistory: IAccountLoginEntry[] = [
  { id: "l1", date: "19.03.2026, 10:32", device: "Smart TV Samsung", location: "Київ, Україна" },
  { id: "l2", date: "19.03.2026, 08:15", device: "iPhone 15 Pro", location: "Київ, Україна" },
  { id: "l3", date: "18.03.2026, 21:47", device: "MacBook Pro", location: "Київ, Україна" },
  { id: "l4", date: "17.03.2026, 19:03", device: "iPhone 15 Pro", location: "Львів, Україна" },
  { id: "l5", date: "16.03.2026, 14:28", device: "MacBook Pro", location: "Київ, Україна" },
];

const passwordForm = reactive({ current: "", new: "", confirm: "" });

const isPasswordValid = computed(() =>
  passwordForm.current.length > 0
  && passwordForm.new.length >= 8
  && passwordForm.new === passwordForm.confirm,
);

function savePassword() {
  if (!isPasswordValid.value) return;
  resetPassword();
}

function resetPassword() {
  passwordForm.current = "";
  passwordForm.new = "";
  passwordForm.confirm = "";
}

useHead({ title: "Cinema — Безпека" });
</script>

<style lang="scss" scoped>
.security-page {
  &__toggle-row {
    align-items: center;
    display: flex;
    gap: var(--spacing-base);
    justify-content: space-between;
  }

  &__toggle-body {
    display: flex;
    flex-direction: column;
    gap: var(--spacing-3xs);
  }

  &__toggle-title {
    @include FluidFontBodyMd;
    color: var(--color-white);
    font-weight: 600;
  }

  &__toggle-desc {
    @include FluidFontCaption;
    color: var(--color-text-tertiary);
  }

  &__sessions {
    display: flex;
    flex-direction: column;
    gap: var(--spacing-xs);
  }

  &__session {
    align-items: center;
    background: var(--color-surface-alt);
    border: 1px solid var(--color-border);
    border-radius: var(--radius-md);
    display: flex;
    gap: var(--spacing-base);
    padding: var(--spacing-sm);
  }

  &__session-icon {
    align-items: center;
    background: var(--color-white-10);
    border-radius: var(--radius-md);
    color: var(--color-text-secondary);
    display: flex;
    flex-shrink: 0;
    height: 40px;
    justify-content: center;
    width: 40px;
  }

  &__session-body {
    display: flex;
    flex: 1;
    flex-direction: column;
    gap: var(--spacing-3xs);
    min-width: 0;
  }

  &__session-head {
    align-items: center;
    display: flex;
    gap: var(--spacing-xs);
  }

  &__session-device {
    @include FluidFontBodyMd;
    color: var(--color-white);
    font-weight: 600;
  }

  &__session-location {
    @include FluidFontCaption;
    color: var(--color-text-tertiary);
  }

  &__session-disconnect {
    @include FluidFontBodySm;
    background: transparent;
    border: 1px solid rgba(var(--color-danger-rgb, 239, 68, 68), 0.4);
    border-radius: var(--radius-sm);
    color: var(--color-danger);
    cursor: pointer;
    font-weight: 600;
    padding: var(--spacing-2xs) var(--spacing-sm);
    transition: all 0.2s ease;

    &:hover {
      background: rgba(var(--color-danger-rgb, 239, 68, 68), 0.1);
    }
  }

  &__history {
    display: flex;
    flex-direction: column;
  }

  &__history-row {
    align-items: center;
    border-top: 1px solid var(--color-divider);
    display: grid;
    gap: var(--spacing-base);
    grid-template-columns: 180px 1fr auto;
    padding: var(--spacing-xs) 0;

    &:first-child {
      border-top: none;
    }
  }

  &__history-date {
    @include FluidFontBodySm;
    color: var(--color-text-secondary);
  }

  &__history-device {
    @include FluidFontBodySm;
    color: var(--color-white);
  }

  &__history-location {
    @include FluidFontCaption;
    color: var(--color-text-tertiary);
  }

  &__actions {
    display: flex;
    gap: var(--spacing-xs);
    margin-top: var(--spacing-2xs);
  }
}
</style>
