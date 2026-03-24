export type IOption = string | number | Record<string, unknown>;

export type IValue = string | number | Record<string, unknown>;

export interface IProps {
  modelValue: IValue | IValue[];
  options: IOption[];
  label?: string;
  placeholder?: string;
  multiple?: boolean;
  disabled?: boolean;
  itemTitle?: string;
  itemValue?: string;
  fullObject?: boolean;
}


export interface IEmits {
  "update:modelValue": [value: IValue | IValue[]];
}