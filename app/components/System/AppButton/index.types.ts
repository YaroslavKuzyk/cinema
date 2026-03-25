import type { RouteLocationRaw } from "vue-router";

export interface IProps {
  variant?:
    | "primary"
    | "secondary"
    | "danger"
    | "success"
    | "info"
    | "purple"
    | "transparent"
    | "ghost";
  size?: "small" | "medium" | "large";
  loading?: boolean;
  disabled?: boolean;
  as?: "button" | "a" | "nuxt-link";
  to?: RouteLocationRaw;
  href?: string;
}
