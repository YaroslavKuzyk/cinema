export interface IProps {
  variant?:
    | "primary"
    | "secondary"
    | "danger"
    | "success"
    | "info"
    | "purple"
    | "transparent";
  size?: "small" | "medium" | "large";
  loading?: boolean;
  disabled?: boolean;
}
