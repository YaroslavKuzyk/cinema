export interface IProps {
  modelValue: boolean;
  title?: string;
  description?: string;
  size?: "small" | "medium" | "large";
  closable?: boolean;
  closeOnOverlay?: boolean;
}
