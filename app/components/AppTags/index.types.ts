export interface ITag {
  id: string | number;
  label: string;
  variant?: 'basic' | 'primary' | 'danger' | 'success' | 'info' | 'purple' | 'warning';
}

export interface IProps {
  modelValue: ITag[];
  readOnly?: boolean;
  disabled?: boolean;
  addButtonText?: string;
}
