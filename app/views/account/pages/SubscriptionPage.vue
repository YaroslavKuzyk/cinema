<template>
  <AccountShell
    active-key="subscription"
    :title="$t('ACCOUNT_SUBSCRIPTION_TITLE')"
    :description="$t('ACCOUNT_SUBSCRIPTION_DESCRIPTION')"
  >
    <!-- Current plan -->
    <AccountSection
      :title="$t('ACCOUNT_CURRENT_PLAN_TITLE')"
      :description="$t('ACCOUNT_CURRENT_PLAN_DESCRIPTION')"
    >
      <div class="sub-page__current">
        <div class="sub-page__current-main">
          <div class="sub-page__current-head">
            <h3 class="sub-page__current-name">Cinema Premium</h3>
            <AppBadge variant="success" read-only>{{ $t("ACCOUNT_PLAN_ACTIVE") }}</AppBadge>
          </div>
          <span class="sub-page__current-price">
            299 {{ $t("ACCOUNT_CURRENCY_PER_MONTH") }}
          </span>
          <div class="sub-page__current-features">
            <span class="sub-page__feature"><Check :size="14" /> 4K + HDR</span>
            <span class="sub-page__feature"><Check :size="14" /> {{ $t("ACCOUNT_PLAN_DEVICES", { count: 4 }) }}</span>
          </div>
          <span class="sub-page__current-next">{{ $t("ACCOUNT_NEXT_PAYMENT", { date: "15.04.2026" }) }}</span>
        </div>
        <AppButton variant="secondary">
          {{ $t("ACCOUNT_CANCEL_SUBSCRIPTION") }}
        </AppButton>
      </div>
    </AccountSection>

    <!-- Plans -->
    <AccountSection
      :title="$t('ACCOUNT_PLANS_TITLE')"
      :description="$t('ACCOUNT_PLANS_DESCRIPTION')"
    >
      <div class="sub-page__plans">
        <article
          v-for="plan in plans"
          :key="plan.id"
          class="sub-page__plan"
          :class="{ 'sub-page__plan--current': plan.isCurrent }"
        >
          <span v-if="plan.isCurrent" class="sub-page__plan-ribbon">
            {{ $t("ACCOUNT_PLAN_CURRENT") }}
          </span>
          <h3 class="sub-page__plan-name">{{ plan.name }}</h3>
          <div class="sub-page__plan-price">
            <span class="sub-page__plan-amount">{{ plan.price }}</span>
            <span class="sub-page__plan-currency">{{ $t("ACCOUNT_CURRENCY_PER_MONTH") }}</span>
          </div>
          <ul class="sub-page__plan-features">
            <li v-for="f in plan.features" :key="f">
              <Check :size="14" /> {{ f }}
            </li>
          </ul>

          <AppButton
            :variant="plan.isCurrent ? 'secondary' : 'primary'"
            :disabled="plan.isCurrent"
            @click="choose(plan.id)"
          >
            {{ plan.isCurrent ? $t("ACCOUNT_PLAN_CURRENT") : $t("ACCOUNT_PLAN_CHOOSE") }}
          </AppButton>
        </article>
      </div>
    </AccountSection>

    <!-- Payment method -->
    <AccountSection
      :title="$t('ACCOUNT_PAYMENT_METHOD_TITLE')"
      :description="$t('ACCOUNT_PAYMENT_METHOD_DESCRIPTION')"
    >
      <div class="sub-page__card-row">
        <div class="sub-page__card-brand">VISA</div>
        <div class="sub-page__card-body">
          <span class="sub-page__card-number">Visa •••• 4242</span>
          <span class="sub-page__card-meta">{{ $t("ACCOUNT_CARD_VALID_UNTIL", { date: "12/2028" }) }}</span>
        </div>
        <AppButton variant="secondary">{{ $t("ACCOUNT_CHANGE") }}</AppButton>
      </div>
    </AccountSection>

    <!-- Payment history -->
    <AccountSection
      :title="$t('ACCOUNT_HISTORY_TITLE')"
      :description="$t('ACCOUNT_HISTORY_DESCRIPTION')"
    >
      <div class="sub-page__history">
        <div class="sub-page__history-head">
          <span>{{ $t("ACCOUNT_HISTORY_DATE") }}</span>
          <span>{{ $t("ACCOUNT_HISTORY_DESC") }}</span>
          <span class="sub-page__history-right">{{ $t("ACCOUNT_HISTORY_AMOUNT") }}</span>
          <span>{{ $t("ACCOUNT_HISTORY_STATUS") }}</span>
        </div>
        <div
          v-for="row in payments"
          :key="row.id"
          class="sub-page__history-row"
        >
          <span class="sub-page__history-date">{{ row.date }}</span>
          <span class="sub-page__history-desc">{{ row.description }}</span>
          <span class="sub-page__history-amount">{{ row.amount }} {{ $t("ACCOUNT_CURRENCY") }}</span>
          <AppBadge :variant="statusVariant(row.status)" read-only>
            {{ statusLabel(row.status) }}
          </AppBadge>
        </div>
      </div>
    </AccountSection>
  </AccountShell>
</template>

<script setup lang="ts">
import { Check } from "lucide-vue-next";
import { AccountSection, AccountShell } from "../components";
import type { IAccountPayment, IAccountPlan } from "../domain";

const { t } = useI18n();

const plans = computed<IAccountPlan[]>(() => [
  {
    id: "basic",
    name: "Basic",
    price: 99,
    features: [
      t("ACCOUNT_PLAN_FEATURE_HD"),
      t("ACCOUNT_PLAN_DEVICES", { count: 1 }),
      t("ACCOUNT_PLAN_FEATURE_NO_ADS"),
    ],
  },
  {
    id: "standard",
    name: "Standard",
    price: 199,
    features: [
      t("ACCOUNT_PLAN_FEATURE_FULL_HD"),
      t("ACCOUNT_PLAN_DEVICES", { count: 2 }),
      t("ACCOUNT_PLAN_FEATURE_NO_ADS"),
    ],
  },
  {
    id: "premium",
    name: "Premium",
    price: 299,
    features: [
      t("ACCOUNT_PLAN_FEATURE_4K_HDR"),
      t("ACCOUNT_PLAN_DEVICES", { count: 4 }),
      t("ACCOUNT_PLAN_FEATURE_NO_ADS"),
    ],
    isCurrent: true,
  },
]);

const payments: IAccountPayment[] = [
  { id: "p1", date: "15.03.2026", description: "Cinema Premium — щомісячна підписка", amount: 299, status: "paid" },
  { id: "p2", date: "15.02.2026", description: "Cinema Premium — щомісячна підписка", amount: 299, status: "paid" },
  { id: "p3", date: "15.01.2026", description: "Cinema Premium — щомісячна підписка", amount: 299, status: "paid" },
  { id: "p4", date: "15.12.2025", description: "Cinema Premium — щомісячна підписка", amount: 299, status: "paid" },
];

function statusVariant(status: IAccountPayment["status"]): "success" | "warning" | "danger" {
  if (status === "paid") return "success";
  if (status === "pending") return "warning";
  return "danger";
}

function statusLabel(status: IAccountPayment["status"]): string {
  if (status === "paid") return t("ACCOUNT_PAYMENT_PAID");
  if (status === "pending") return t("ACCOUNT_PAYMENT_PENDING");
  return t("ACCOUNT_PAYMENT_FAILED");
}

function choose(_id: IAccountPlan["id"]) {
  // Placeholder — wire to billing flow.
}

useHead({ title: "Cinema — Підписка" });
</script>

<style lang="scss" scoped>
.sub-page {
  &__current {
    align-items: center;
    display: flex;
    gap: var(--spacing-base);
    justify-content: space-between;
  }

  &__current-main {
    display: flex;
    flex-direction: column;
    gap: var(--spacing-2xs);
  }

  &__current-head {
    align-items: center;
    display: flex;
    gap: var(--spacing-xs);
  }

  &__current-name {
    @include FluidFontH3;
    color: var(--color-white);
    margin: 0;
  }

  &__current-price {
    @include FluidFontBodyMd;
    color: var(--color-text-secondary);
  }

  &__current-features {
    display: flex;
    flex-wrap: wrap;
    gap: var(--spacing-base);
  }

  &__feature {
    @include FluidFontCaption;
    align-items: center;
    color: var(--color-success);
    display: inline-flex;
    gap: var(--spacing-3xs);
  }

  &__current-next {
    @include FluidFontCaption;
    color: var(--color-text-tertiary);
  }

  &__plans {
    display: grid;
    gap: var(--spacing-base);
    grid-template-columns: repeat(3, 1fr);
  }

  &__plan {
    background: var(--color-surface-alt);
    border: 1px solid var(--color-border);
    border-radius: var(--radius-lg);
    display: flex;
    flex-direction: column;
    gap: var(--spacing-sm);
    padding: var(--spacing-lg);
    position: relative;
    text-align: center;

    &--current {
      border-color: var(--color-primary);
    }
  }

  &__plan-ribbon {
    @include FluidFontCaption;
    background: var(--color-primary);
    border-radius: var(--radius-xs);
    color: var(--color-white);
    font-weight: 600;
    left: 50%;
    padding: var(--spacing-3xs) var(--spacing-sm);
    position: absolute;
    top: -12px;
    transform: translateX(-50%);
  }

  &__plan-name {
    @include FluidFontH3;
    color: var(--color-white);
    margin: 0;
  }

  &__plan-price {
    align-items: baseline;
    display: flex;
    gap: var(--spacing-3xs);
    justify-content: center;
  }

  &__plan-amount {
    @include FluidFontH1;
    color: var(--color-white);
    font-weight: 700;
  }

  &__plan-currency {
    @include FluidFontBodySm;
    color: var(--color-text-secondary);
  }

  &__plan-features {
    display: flex;
    flex-direction: column;
    gap: var(--spacing-xs);
    list-style: none;
    margin: 0;
    padding: 0;
    text-align: left;

    li {
      @include FluidFontBodySm;
      align-items: center;
      color: var(--color-text-primary);
      display: flex;
      gap: var(--spacing-2xs);

      :deep(svg) {
        color: var(--color-success);
        flex-shrink: 0;
      }
    }
  }

  &__card-row {
    align-items: center;
    display: flex;
    gap: var(--spacing-base);
  }

  &__card-brand {
    align-items: center;
    background: linear-gradient(135deg, #1a1f71 0%, #0e1458 100%);
    border-radius: var(--radius-xs);
    color: #fff;
    display: flex;
    font-family: Helvetica, sans-serif;
    font-weight: 800;
    height: 32px;
    justify-content: center;
    letter-spacing: 0.08em;
    width: 52px;
  }

  &__card-body {
    display: flex;
    flex: 1;
    flex-direction: column;
    gap: var(--spacing-3xs);
  }

  &__card-number {
    @include FluidFontBodyMd;
    color: var(--color-white);
    font-weight: 600;
  }

  &__card-meta {
    @include FluidFontCaption;
    color: var(--color-text-tertiary);
  }

  &__history {
    display: flex;
    flex-direction: column;
  }

  &__history-head {
    @include FluidFontCaption;
    color: var(--color-text-tertiary);
    display: grid;
    gap: var(--spacing-base);
    grid-template-columns: 120px 1fr 100px 100px;
    padding: var(--spacing-xs) 0;
    text-transform: uppercase;
  }

  &__history-row {
    align-items: center;
    border-top: 1px solid var(--color-divider);
    display: grid;
    gap: var(--spacing-base);
    grid-template-columns: 120px 1fr 100px 100px;
    padding: var(--spacing-sm) 0;
  }

  &__history-date {
    @include FluidFontBodySm;
    color: var(--color-text-secondary);
  }

  &__history-desc {
    @include FluidFontBodySm;
    color: var(--color-white);
  }

  &__history-amount {
    @include FluidFontBodySm;
    color: var(--color-white);
    font-weight: 600;
  }

  &__history-right {
    text-align: left;
  }
}
</style>
