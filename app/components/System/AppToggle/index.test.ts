import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import AppToggle from './index.vue'

describe('AppToggle', () => {
  it('renders with default props', () => {
    const wrapper = mount(AppToggle, {
      props: { modelValue: false },
    })
    expect(wrapper.find('.app-toggle').exists()).toBe(true)
  })

  it('renders button element', () => {
    const wrapper = mount(AppToggle, {
      props: { modelValue: false },
    })
    expect(wrapper.find('.app-toggle__button').exists()).toBe(true)
  })

  it('renders label text', () => {
    const wrapper = mount(AppToggle, {
      props: { modelValue: false, label: 'Test label' },
    })
    expect(wrapper.find('.app-toggle__label').text()).toBe('Test label')
  })

  it('renders empty label by default', () => {
    const wrapper = mount(AppToggle, {
      props: { modelValue: false },
    })
    expect(wrapper.find('.app-toggle__label').text()).toBe('')
  })

  it('applies active class when modelValue is true', () => {
    const wrapper = mount(AppToggle, {
      props: { modelValue: true },
    })
    expect(wrapper.find('.app-toggle__button').classes()).toContain('app-toggle__button--active')
  })

  it('does not apply active class when modelValue is false', () => {
    const wrapper = mount(AppToggle, {
      props: { modelValue: false },
    })
    expect(wrapper.find('.app-toggle__button').classes()).not.toContain('app-toggle__button--active')
  })

  it('applies disabled class when disabled is true', () => {
    const wrapper = mount(AppToggle, {
      props: { modelValue: false, disabled: true },
    })
    expect(wrapper.find('.app-toggle__button').classes()).toContain('app-toggle__button--disabled')
  })

  it('does not apply disabled class by default', () => {
    const wrapper = mount(AppToggle, {
      props: { modelValue: false },
    })
    expect(wrapper.find('.app-toggle__button').classes()).not.toContain('app-toggle__button--disabled')
  })

  it('can be both active and disabled', () => {
    const wrapper = mount(AppToggle, {
      props: { modelValue: true, disabled: true },
    })
    const button = wrapper.find('.app-toggle__button')
    expect(button.classes()).toContain('app-toggle__button--active')
    expect(button.classes()).toContain('app-toggle__button--disabled')
  })

  it('has base app-toggle class', () => {
    const wrapper = mount(AppToggle, {
      props: { modelValue: false },
    })
    expect(wrapper.classes()).toContain('app-toggle')
  })
})
