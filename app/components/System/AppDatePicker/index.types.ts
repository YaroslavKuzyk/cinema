export interface IProps {
  modelValue: Date[] | null
  label?: string
  placeholder?: string
  disabled?: boolean
}

export interface IEmits {
  'update:modelValue': [value: Date[] | null]
}
