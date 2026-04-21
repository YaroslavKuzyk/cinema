export interface IProps {
  modelValue: string
  colors: string[]
  label?: string
  disabled?: boolean
  showInput?: boolean
}

export interface IEmits {
  'update:modelValue': [value: string]
}
