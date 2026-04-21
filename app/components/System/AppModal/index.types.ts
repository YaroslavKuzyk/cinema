export interface IProps {
  modelValue: boolean;
  title?: string;
  description?: string;
  size?: "small" | "medium" | "large" | "xlarge" | "full";
  closable?: boolean;
  closeOnOverlay?: boolean;
  flush?: boolean;
}
