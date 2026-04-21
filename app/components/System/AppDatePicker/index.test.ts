import { describe, it, expect, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import AppDatePicker from './index.vue'

vi.mock('@vuepic/vue-datepicker', () => ({
  VueDatePicker: {
    name: 'VueDatePicker',
    props: ['modelValue', 'range', 'enableTimePicker', 'placeholder', 'disabled', 'autoApply', 'dark', 'format', 'formatLocale', 'teleport'],
    emits: ['update:modelValue'],
    template: '<div class="dp__main"><input class="dp__input" :placeholder="placeholder" :disabled="disabled" /><slot /></div>',
  },
}))

vi.mock('date-fns/locale', () => ({
  uk: { code: 'uk' },
}))

const stubs = {
  ClientOnly: {
    template: '<slot />',
  },
}

describe('AppDatePicker', () => {
  it('renders with default props', () => {
    const wrapper = mount(AppDatePicker, {
      props: { modelValue: null },
      global: { stubs },
    })
    expect(wrapper.find('.app-date-picker').exists()).toBe(true)
  })

  it('renders label when provided', () => {
    const wrapper = mount(AppDatePicker, {
      props: { modelValue: null, label: 'Період' },
      global: { stubs },
    })
    expect(wrapper.find('.app-date-picker__label').text()).toBe('Період')
  })

  it('does not render label when not provided', () => {
    const wrapper = mount(AppDatePicker, {
      props: { modelValue: null },
      global: { stubs },
    })
    expect(wrapper.find('.app-date-picker__label').exists()).toBe(false)
  })

  it('passes placeholder to VueDatePicker', () => {
    const wrapper = mount(AppDatePicker, {
      props: { modelValue: null, placeholder: 'Оберіть дати' },
      global: { stubs },
    })
    expect(wrapper.find('.dp__input').attributes('placeholder')).toBe('Оберіть дати')
  })

  it('applies disabled class when disabled', () => {
    const wrapper = mount(AppDatePicker, {
      props: { modelValue: null, disabled: true },
      global: { stubs },
    })
    expect(wrapper.find('.app-date-picker').classes()).toContain('app-date-picker--disabled')
  })

  it('passes disabled to VueDatePicker input', () => {
    const wrapper = mount(AppDatePicker, {
      props: { modelValue: null, disabled: true },
      global: { stubs },
    })
    expect(wrapper.find('.dp__input').attributes('disabled')).toBeDefined()
  })

  it('does not apply disabled class when enabled', () => {
    const wrapper = mount(AppDatePicker, {
      props: { modelValue: null, disabled: false },
      global: { stubs },
    })
    expect(wrapper.find('.app-date-picker').classes()).not.toContain('app-date-picker--disabled')
  })

  it('emits update:modelValue when VueDatePicker emits', async () => {
    const wrapper = mount(AppDatePicker, {
      props: { modelValue: null },
      global: { stubs },
    })
    const datePicker = wrapper.findComponent({ name: 'VueDatePicker' })
    const dates = [new Date(2026, 0, 1), new Date(2026, 0, 31)]
    await datePicker.vm.$emit('update:modelValue', dates)
    expect(wrapper.emitted('update:modelValue')).toBeTruthy()
    expect(wrapper.emitted('update:modelValue')![0]).toEqual([dates])
  })

  it('renders VueDatePicker inside ClientOnly', () => {
    const wrapper = mount(AppDatePicker, {
      props: { modelValue: null },
      global: { stubs },
    })
    expect(wrapper.findComponent({ name: 'VueDatePicker' }).exists()).toBe(true)
  })

  it('formats single date correctly', () => {
    const wrapper = mount(AppDatePicker, {
      props: { modelValue: [new Date(2026, 0, 15)] },
      global: { stubs },
    })
    
    // Access the formatDate function through the VueDatePicker format prop
    const datePicker = wrapper.findComponent({ name: 'VueDatePicker' })
    const formatFn = datePicker.props('format') as (dates: Date[]) => string
    expect(formatFn([new Date(2026, 0, 15)])).toMatch(/15/)
  })

  it('formats date range correctly', () => {
    const dates = [new Date(2026, 0, 1), new Date(2026, 0, 31)]
    const wrapper = mount(AppDatePicker, {
      props: { modelValue: dates },
      global: { stubs },
    })
    const datePicker = wrapper.findComponent({ name: 'VueDatePicker' })
    const formatFn = datePicker.props('format') as (dates: Date[]) => string
    const result = formatFn(dates)
    expect(result).toContain('—')
  })

  it('returns empty string for empty dates array', () => {
    const wrapper = mount(AppDatePicker, {
      props: { modelValue: null },
      global: { stubs },
    })
    const datePicker = wrapper.findComponent({ name: 'VueDatePicker' })
    const formatFn = datePicker.props('format') as (dates: Date[]) => string
    expect(formatFn([])).toBe('')
  })
})
