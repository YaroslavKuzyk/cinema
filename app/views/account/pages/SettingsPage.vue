<template>
  <AccountShell
    active-key="settings"
    :title="$t('ACCOUNT_SETTINGS_TITLE')"
    :description="$t('ACCOUNT_SETTINGS_DESCRIPTION')"
  >
    <!-- Interface language -->
    <AccountSection
      :title="$t('ACCOUNT_UI_LANG_TITLE')"
      :description="$t('ACCOUNT_UI_LANG_DESCRIPTION')"
    >
      <AccountChipGroup v-model="uiLang" :options="uiLangOptions" />
    </AccountSection>

    <!-- Content language -->
    <AccountSection
      :title="$t('ACCOUNT_CONTENT_LANG_TITLE')"
      :description="$t('ACCOUNT_CONTENT_LANG_DESCRIPTION')"
    >
      <AccountChipGroup v-model="contentLang" :options="contentLangOptions" />
    </AccountSection>

    <!-- Video quality -->
    <AccountSection
      :title="$t('ACCOUNT_QUALITY_TITLE')"
      :description="$t('ACCOUNT_QUALITY_DESCRIPTION')"
    >
      <AccountChipGroup v-model="quality" :options="qualityOptions" />
    </AccountSection>

    <!-- Subtitles -->
    <AccountSection
      :title="$t('ACCOUNT_SUBTITLES_TITLE')"
      :description="$t('ACCOUNT_SUBTITLES_DESCRIPTION')"
    >
      <div class="settings-page__toggle-row">
        <span class="settings-page__toggle-label">{{ $t("ACCOUNT_SUBTITLES_SHOW") }}</span>
        <AppToggle v-model="subtitlesOn" />
      </div>

      <template v-if="subtitlesOn">
        <div class="settings-page__field">
          <span class="settings-page__field-label">{{ $t("ACCOUNT_SUBTITLES_SIZE") }}</span>
          <AccountChipGroup v-model="subtitleSize" :options="sizeOptions" />
        </div>

        <div class="settings-page__field">
          <span class="settings-page__field-label">{{ $t("ACCOUNT_SUBTITLES_COLOR") }}</span>
          <div class="settings-page__colors">
            <button
              v-for="c in subtitleColors"
              :key="c.value"
              type="button"
              class="settings-page__color"
              :class="{ 'settings-page__color--active': subtitleColor === c.value }"
              :style="{ background: c.hex }"
              :aria-label="c.label"
              @click="subtitleColor = c.value"
            />
          </div>
        </div>
      </template>
    </AccountSection>

    <!-- Notifications -->
    <AccountSection
      :title="$t('ACCOUNT_NOTIFICATIONS_TITLE')"
      :description="$t('ACCOUNT_NOTIFICATIONS_DESCRIPTION')"
    >
      <div
        v-for="n in notifications"
        :key="n.key"
        class="settings-page__toggle-row"
      >
        <span class="settings-page__toggle-label">{{ n.label }}</span>
        <AppToggle v-model="n.value" />
      </div>
    </AccountSection>

    <!-- Parental control -->
    <AccountSection
      :title="$t('ACCOUNT_PARENTAL_TITLE')"
      :description="$t('ACCOUNT_PARENTAL_DESCRIPTION')"
    >
      <div class="settings-page__field">
        <span class="settings-page__field-label">{{ $t("ACCOUNT_PARENTAL_AGE") }}</span>
        <AccountChipGroup v-model="ageRating" :options="ageOptions" />
      </div>

      <div class="settings-page__field">
        <span class="settings-page__field-label">{{ $t("ACCOUNT_PARENTAL_PIN") }}</span>
        <div class="settings-page__pin-row">
          <AppInput
            v-model="pin"
            :placeholder="$t('ACCOUNT_PARENTAL_PIN_PLACEHOLDER')"
            width="160px"
            maxlength="4"
            inputmode="numeric"
          />
          <AppButton variant="primary" :disabled="pin.length !== 4">
            {{ $t("ACCOUNT_PARENTAL_PIN_SAVE") }}
          </AppButton>
        </div>
      </div>
    </AccountSection>
  </AccountShell>
</template>

<script setup lang="ts">
import { AccountChipGroup, AccountSection, AccountShell } from "../components";
import type {
  TAgeRating,
  TContentLang,
  TInterfaceLang,
  TSubtitleColor,
  TSubtitleSize,
  TVideoQuality,
} from "../domain";

const { t } = useI18n();

const uiLang = ref<TInterfaceLang>("uk");
const contentLang = ref<TContentLang>("uk");
const quality = ref<TVideoQuality>("auto");

const subtitlesOn = ref(true);
const subtitleSize = ref<TSubtitleSize>("medium");
const subtitleColor = ref<TSubtitleColor>("white");

const ageRating = ref<TAgeRating>("none");
const pin = ref("");

const notifications = reactive([
  { key: "releases", label: t("ACCOUNT_NOTIFICATIONS_RELEASES"), value: true },
  { key: "recommendations", label: t("ACCOUNT_NOTIFICATIONS_RECS"), value: true },
  { key: "email", label: t("ACCOUNT_NOTIFICATIONS_EMAIL"), value: false },
]);

const uiLangOptions = computed(() => [
  { value: "uk" as TInterfaceLang, label: "Українська" },
  { value: "en" as TInterfaceLang, label: "English" },
  { value: "pl" as TInterfaceLang, label: "Polski" },
]);

const contentLangOptions = computed(() => [
  { value: "uk" as TContentLang, label: t("ACCOUNT_CONTENT_LANG_UK") },
  { value: "original" as TContentLang, label: t("ACCOUNT_CONTENT_LANG_ORIGINAL") },
  { value: "dub" as TContentLang, label: t("ACCOUNT_CONTENT_LANG_DUB") },
]);

const qualityOptions = computed(() => [
  { value: "auto" as TVideoQuality, label: t("ACCOUNT_QUALITY_AUTO") },
  { value: "4k" as TVideoQuality, label: "4K" },
  { value: "1080p" as TVideoQuality, label: "1080p" },
  { value: "720p" as TVideoQuality, label: "720p" },
]);

const sizeOptions = computed(() => [
  { value: "small" as TSubtitleSize, label: t("ACCOUNT_SIZE_SMALL") },
  { value: "medium" as TSubtitleSize, label: t("ACCOUNT_SIZE_MEDIUM") },
  { value: "large" as TSubtitleSize, label: t("ACCOUNT_SIZE_LARGE") },
]);

const subtitleColors: Array<{ value: TSubtitleColor, hex: string, label: string }> = [
  { value: "white", hex: "#FFFFFF", label: "White" },
  { value: "yellow", hex: "#FACC15", label: "Yellow" },
  { value: "green", hex: "#22C55E", label: "Green" },
];

const ageOptions = computed(() => [
  { value: "none" as TAgeRating, label: t("ACCOUNT_AGE_NONE") },
  { value: "12" as TAgeRating, label: "12+" },
  { value: "16" as TAgeRating, label: "16+" },
  { value: "18" as TAgeRating, label: "18+" },
]);

useHead({ title: "Cinema — Налаштування" });
</script>

<style lang="scss" scoped>
.settings-page {
  &__toggle-row {
    align-items: center;
    display: flex;
    gap: var(--spacing-base);
    justify-content: space-between;
  }

  &__toggle-label {
    @include FluidFontBodyMd;
    color: var(--color-white);
    font-weight: 500;
  }

  &__field {
    display: flex;
    flex-direction: column;
    gap: var(--spacing-xs);
  }

  &__field-label {
    @include FluidFontLabel;
    color: var(--color-text-secondary);
  }

  &__colors {
    display: flex;
    gap: var(--spacing-xs);
  }

  &__color {
    border: 2px solid transparent;
    border-radius: var(--radius-full);
    cursor: pointer;
    height: 28px;
    padding: 0;
    transition: border-color 0.2s ease;
    width: 28px;

    &:hover {
      border-color: var(--color-white-20);
    }

    &--active {
      border-color: var(--color-primary);
    }
  }

  &__pin-row {
    display: flex;
    gap: var(--spacing-xs);
  }
}
</style>
