<template>
  <div class="admin-account-page">
    <div class="admin-account-page__header">
      <div class="admin-account-page__header-content">
        <div class="admin-account-page__header-info">
          <div class="admin-account-page__header-avatar">
            <AppAvatar size="large" initials="ЯК" />
          </div>
          <div class="admin-account-page__header-details">
            <div class="admin-account-page__header-name">
              <div class="admin-account-page__header-name-row">
                <h1>Ярослав Кузик</h1>
                <AppBadge variant="primary">Super Admin</AppBadge>
              </div>
              <div class="admin-account-page__header-name-row">
                <span>admin@cinema.ua · Приєднався 01.01.2026</span>
              </div>
            </div>
            <div class="admin-account-page__header-stats">
              <div class="admin-account-page__header-stats-col">
                <p>1 247</p>
                <span>Дій за місяць</span>
              </div>
              <div class="admin-account-page__header-stats-col">
                <p>342</p>
                <span>Контенту додано</span>
              </div>
              <div class="admin-account-page__header-stats-col">
                <p>89</p>
                <span>Днів активності</span>
              </div>
            </div>
          </div>
        </div>
        <div class="admin-account-page__header-actions">
          <AppButton
            size="small"
            :icon-left="SquarePen"
            @click="isReadonly = !isReadonly"
            >Редагувати</AppButton
          >
        </div>
      </div>
      <div class="admin-account-page__header-navigation">
        <AppTabs v-model="activeTab" :tabs="tabs" variant="underline" />
      </div>
    </div>
    <div class="admin-account-page__layout">
      <div class="admin-account-page__content">
        <!-- Personal Info -->
        <AppCard
          title="Особиста інформація"
          subtitle="Ваші дані профілю на платформі"
        >
          <div class="admin-account-page__fields">
            <div class="admin-account-page__fields-row">
              <AppInput
                label="Ім'я"
                v-model="name"
                placeholder="Введіть ваше ім'я"
                :disabled="isReadonly"
              />
              <AppInput
                label="Прізвище"
                v-model="surname"
                placeholder="Введіть ваше прізвище"
                :disabled="isReadonly"
              />
            </div>
            <div class="admin-account-page__fields-row">
              <AppInput
                label="Email"
                v-model="email"
                placeholder="Введіть ваш email"
                :disabled="isReadonly"
              />
              <AppInput
                label="Телефон"
                v-model="phone"
                placeholder="Введіть ваш телефон"
                :disabled="isReadonly"
              />
            </div>
            <div class="admin-account-page__fields-row">
              <AppInput
                label="Про себе"
                v-model="about"
                placeholder="Розкажіть трохи про себе..."
                :disabled="isReadonly"
              />
            </div>
            <div v-if="!isReadonly" class="admin-account-page__actions-row">
              <AppButton
                size="small"
                :icon-left="Check"
                @click="isReadonly = !isReadonly"
                >Зберегти</AppButton
              >
            </div>
          </div>
        </AppCard>

        <!-- Security -->
        <AppCard
          title="Безпека"
          subtitle="Пароль та двофакторна автентифікація"
        >
          <div class="admin-account-page__fields">
            <div class="admin-account-page__fields-row">
              <AppInput
                label="Поточний пароль"
                v-model="currentPassword"
                placeholder="Введіть ваш поточний пароль"
                :disabled="isReadonly"
                type="password"
              />
              <AppInput
                label="Новий пароль"
                v-model="newPassword"
                placeholder="Введіть ваш новий пароль"
                type="password"
                :disabled="isReadonly"
              />
            </div>

            <div class="admin-account-page__toggle-row">
              <div class="admin-account-page__toggle-row-left">
                <div>
                  <p>Двофакторна автентифікація (2FA)</p>
                  <span
                    >Захистіть свій обліковий запис додатковим рівнем
                    безпеки</span
                  >
                </div>
              </div>
              <div class="admin-account-page__toggle-row-action">
                <AppToggle v-model="is2faEnabled" />
              </div>
            </div>

            <div class="admin-account-page__toggle-row">
              <div class="admin-account-page__toggle-row-left">
                <div>
                  <p>Вхід через email-посилання</p>
                  <span>Отримувати magic link замість пароля</span>
                </div>
              </div>
              <div class="admin-account-page__toggle-row-action">
                <AppToggle v-model="is2faEnabled" />
              </div>
            </div>

            <div v-if="!isReadonly" class="admin-account-page__actions-row">
              <AppButton
                size="small"
                :icon-left="Check"
                @click="isReadonly = !isReadonly"
                >Зберегти</AppButton
              >
            </div>
          </div>
        </AppCard>

        <!-- Active Sessions -->
        <AppCard
          title="Активні сесії"
          subtitle="Пристрої з яких ви зараз залогінені"
        >
          <div class="admin-account-page__fields">
            <div class="admin-account-page__toggle-row">
              <div class="admin-account-page__toggle-row-left">
                <div class="admin-account-page__toggle-row-icon">
                  <Smartphone />
                </div>
                <div>
                  <p>macOS · Chrome 122</p>
                  <span>Kyiv, Ukraine · 194.28.xxx.xxx · Зараз</span>
                </div>
              </div>
              <div class="admin-account-page__toggle-row-action">
                <AppBadge variant="success" :readOnly="true">Поточна</AppBadge>
              </div>
            </div>

            <div class="admin-account-page__toggle-row">
              <div class="admin-account-page__toggle-row-left">
                <div class="admin-account-page__toggle-row-icon">
                  <Smartphone />
                </div>
                <div>
                  <p>iOS 18 · Safari</p>
                  <span>Kyiv, Ukraine · 194.28.xxx.xxx · 2 год тому</span>
                </div>
              </div>
              <div class="admin-account-page__toggle-row-action">
                <AppBadge variant="primary" :readOnly="false"
                  >Завершити</AppBadge
                >
              </div>
            </div>

            <div v-if="!isReadonly" class="admin-account-page__actions-row">
              <AppButton
                size="small"
                :icon-left="Check"
                @click="isReadonly = !isReadonly"
                >Зберегти</AppButton
              >
            </div>
          </div>
        </AppCard>

        <!-- Notifications -->
        <AppCard title="Сповіщення" subtitle="Як і коли вас сповіщати">
          <div class="admin-account-page__fields">
            <div class="admin-account-page__toggle-row">
              <div class="admin-account-page__toggle-row-left">
                <div>
                  <p>Email-сповіщення</p>
                  <span>Нові скарги, коментарі, контент</span>
                </div>
              </div>
              <div class="admin-account-page__toggle-row-action">
                <AppToggle v-model="is2faEnabled" />
              </div>
            </div>

            <div class="admin-account-page__toggle-row">
              <div class="admin-account-page__toggle-row-left">
                <div>
                  <p>Push-нотифікації</p>
                  <span>Браузерні сповіщення</span>
                </div>
              </div>
              <div class="admin-account-page__toggle-row-action">
                <AppToggle v-model="is2faEnabled" />
              </div>
            </div>

            <div class="admin-account-page__toggle-row">
              <div class="admin-account-page__toggle-row-left">
                <div>
                  <p>Щоденний дайджест</p>
                  <span>Зведення за день о 09:00</span>
                </div>
              </div>
              <div class="admin-account-page__toggle-row-action">
                <AppToggle v-model="is2faEnabled" />
              </div>
            </div>

            <div class="admin-account-page__toggle-row">
              <div class="admin-account-page__toggle-row-left">
                <div>
                  <p>Маркетингові листи</p>
                  <span>Новини та оновлення платформи</span>
                </div>
              </div>
              <div class="admin-account-page__toggle-row-action">
                <AppToggle v-model="is2faEnabled" />
              </div>
            </div>

            <div v-if="!isReadonly" class="admin-account-page__actions-row">
              <AppButton
                size="small"
                :icon-left="Check"
                @click="isReadonly = !isReadonly"
                >Зберегти</AppButton
              >
            </div>
          </div>
        </AppCard>
      </div>
      <div class="admin-account-page__aside">
        <AppCard title="Інформація"> </AppCard>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { SquarePen, Check, Smartphone } from "lucide-vue-next";

const activeTab = ref("profile");
const isReadonly = ref(true);

const name = ref("");
const surname = ref("");
const email = ref("");
const phone = ref("");
const about = ref("");
const currentPassword = ref("");
const newPassword = ref("");
const is2faEnabled = ref(false);

const tabs = [
  {
    title: "Профіль",
    value: "profile",
  },
  {
    title: "Безпека",
    value: "security",
  },
  {
    title: "Сповіщення",
    value: "notifications",
  },
  {
    title: "Сесії",
    value: "sessions",
  },
  {
    title: "Активність",
    value: "activity",
  },
];
</script>

<style lang="scss" scoped>
.admin-account-page {
  &__header {
    display: flex;
    flex-direction: column;
    gap: var(--spacing-md);
    position: sticky;
    top: 0;
    z-index: 10;
    background-color: var(--color-background);
    padding-bottom: var(--spacing-md);
    padding-top: var(--spacing-sm);
  }

  &__header-content {
    display: flex;
    align-items: flex-end;
    justify-content: space-between;
    gap: var(--spacing-md);
  }

  &__header-info {
    display: flex;
    align-items: center;
    gap: var(--spacing-md);
  }

  &__header-name {
    display: flex;
    flex-direction: column;
    gap: var(--spacing-2xs);
  }

  &__header-name-row {
    display: flex;
    align-items: center;
    gap: var(--spacing-md);

    span {
      color: var(--color-text-tertiary);
    }
  }

  &__header-stats {
    display: flex;
    align-items: center;
    gap: var(--spacing-md);
    margin-top: var(--spacing-sm);
  }

  &__header-stats-col {
    display: flex;
    flex-direction: column;

    p {
      @include FluidShadowLg;
      font-weight: 900;
    }

    span {
      @include FluidFontBodySm;
      color: var(--color-text-tertiary);
    }
  }

  &__layout {
    display: flex;
    gap: var(--spacing-xl);
  }

  &__content {
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: var(--spacing-lg);
  }

  &__aside {
    max-width: var(--container-md);
    width: 100%;
  }

  &__fields {
    display: flex;
    flex-direction: column;
    gap: var(--spacing-md);
  }

  &__fields-row {
    display: flex;
    gap: var(--spacing-md);
  }

  &__actions-row {
    display: flex;
    justify-content: flex-end;
    gap: var(--spacing-md);
  }

  &__toggle-row {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: var(--spacing-md);
  }

  &__toggle-row-left {
    display: flex;
    align-items: center;
    gap: var(--spacing-sm);

    div {
      display: flex;
      flex-direction: column;
      gap: var(--spacing-3xs);
    }

    span {
      @include FluidFontBodySm;
      color: var(--color-text-tertiary);
    }
  }

  &__toggle-row-icon {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 40px;
    height: 40px;
    border-radius: var(--radius-md);
    background-color: var(--color-white-10);
    color: var(--color-text-tertiary);
  }
}
</style>
