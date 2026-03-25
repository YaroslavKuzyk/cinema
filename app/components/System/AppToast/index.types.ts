export type ToastVariant = "info" | "success" | "warning" | "danger";

export interface IToast {
  id: string;
  title?: string;
  message: string;
  variant: ToastVariant;
  duration?: number;
}

export interface IProps {
  toast: IToast;
}
