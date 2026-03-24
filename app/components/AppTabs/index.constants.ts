import type { InjectionKey, Ref } from "vue";

export const APP_TABS_INJECTION_KEY: InjectionKey<Ref<string | number>> =
  Symbol("app-tabs");
