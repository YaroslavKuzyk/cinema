export type CheckboxVariant =
  | 'primary'
  | 'success'
  | 'danger'
  | 'warning'
  | 'info'
  | 'purple'

export interface IProps {
  modelValue: boolean;
  label?: string;
  disabled?: boolean;
  variant?: CheckboxVariant;
}
