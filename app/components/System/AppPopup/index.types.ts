export type PopupPosition =
  | 'top'
  | 'top-start'
  | 'top-end'
  | 'bottom'
  | 'bottom-start'
  | 'bottom-end'
  | 'left'
  | 'left-start'
  | 'left-end'
  | 'right'
  | 'right-start'
  | 'right-end'

export type PopupTrigger = 'click' | 'hover'

export interface IProps {
  modelValue?: boolean
  position?: PopupPosition
  trigger?: PopupTrigger
  offset?: number
  disabled?: boolean
  closeOnClickOutside?: boolean
  closeOnContentClick?: boolean
  fullWidth?: boolean
  matchTriggerWidth?: boolean
}
