import type { IProps as IButtonProps } from "../AppButton/index.types";

export interface ITab {
  title: string;
  value: string | number;
  badge?: string | number;
  disabled?: boolean;
}

export interface IProps {
  modelValue: string | number;
  tabs: ITab[];
  variant?: "pill" | "underline";
  buttonProps?: Partial<IButtonProps>;
}

export interface IEmits {
  "update:modelValue": [value: string | number];
}
