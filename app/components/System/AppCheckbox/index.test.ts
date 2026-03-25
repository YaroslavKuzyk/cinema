import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import AppCheckbox from './index.vue'

describe('AppCheckbox', () => {
  it('renders with default props', () => {
    const wrapper = mount(AppCheckbox, {
      props: { modelValue: false },
    })
    expect(wrapper.find('.app-checkbox').exists()).toBe(true)
  })

  it('renders button element', () => {
    const wrapper = mount(AppCheckbox, {
      props: { modelValue: false },
    })
    expect(wrapper.find('.app-checkbox__button').exists()).toBe(true)
  })

  it('renders label text when provided', () => {
    const wrapper = mount(AppCheckbox, {
      props: { modelValue: false, label: 'Test label' },
    })
    expect(wrapper.find('.app-checkbox__label').text()).toBe('Test label')
  })

  it('does not render label when not provided', () => {
    const wrapper = mount(AppCheckbox, {
      props: { modelValue: false },
    })
    expect(wrapper.find('.app-checkbox__label').exists()).toBe(false)
  })

  it('applies active class when modelValue is true', () => {
    const wrapper = mount(AppCheckbox, {
      props: { modelValue: true },
    })
    expect(wrapper.find('.app-checkbox__button').classes()).toContain('app-checkbox__button--active')
  })

  it('does not apply active class when modelValue is false', () => {
    const wrapper = mount(AppCheckbox, {
      props: { modelValue: false },
    })
    expect(wrapper.find('.app-checkbox__button').classes()).not.toContain('app-checkbox__button--active')
  })

  it('renders check icon when active', () => {
    const wrapper = mount(AppCheckbox, {
      props: { modelValue: true },
    })
    expect(wrapper.find('.app-checkbox__icon').exists()).toBe(true)
  })

  it('does not render check icon when not active', () => {
    const wrapper = mount(AppCheckbox, {
      props: { modelValue: false },
    })
    expect(wrapper.find('.app-checkbox__icon').exists()).toBe(false)
  })

  it('applies disabled class when disabled is true', () => {
    const wrapper = mount(AppCheckbox, {
      props: { modelValue: false, disabled: true },
    })
    expect(wrapper.find('.app-checkbox__button').classes()).toContain('app-checkbox__button--disabled')
  })

  it('does not apply disabled class by default', () => {
    const wrapper = mount(AppCheckbox, {
      props: { modelValue: false },
    })
    expect(wrapper.find('.app-checkbox__button').classes()).not.toContain('app-checkbox__button--disabled')
  })

  it('button has disabled attribute when disabled is true', () => {
    const wrapper = mount(AppCheckbox, {
      props: { modelValue: false, disabled: true },
    })
    expect(wrapper.find('.app-checkbox__button').attributes('disabled')).toBeDefined()
  })

  it('button does not have disabled attribute by default', () => {
    const wrapper = mount(AppCheckbox, {
      props: { modelValue: false },
    })
    expect(wrapper.find('.app-checkbox__button').attributes('disabled')).toBeUndefined()
  })

  it('can be both active and disabled', () => {
    const wrapper = mount(AppCheckbox, {
      props: { modelValue: true, disabled: true },
    })
    const button = wrapper.find('.app-checkbox__button')
    expect(button.classes()).toContain('app-checkbox__button--active')
    expect(button.classes()).toContain('app-checkbox__button--disabled')
  })

  it('has base app-checkbox class', () => {
    const wrapper = mount(AppCheckbox, {
      props: { modelValue: false },
    })
    expect(wrapper.classes()).toContain('app-checkbox')
  })
})
