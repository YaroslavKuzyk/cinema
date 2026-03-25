import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import AppChips from './index.vue'

describe('AppChips', () => {
  it('renders slot content', () => {
    const wrapper = mount(AppChips, {
      props: { modelValue: false },
      slots: { default: 'Action' },
    })
    expect(wrapper.text()).toContain('Action')
  })

  it('renders as a button element', () => {
    const wrapper = mount(AppChips, {
      props: { modelValue: false },
    })
    expect(wrapper.element.tagName).toBe('BUTTON')
  })

  it('applies active class when modelValue is true', () => {
    const wrapper = mount(AppChips, {
      props: { modelValue: true },
    })
    expect(wrapper.classes()).toContain('app-chips--active')
  })

  it('does not apply active class when modelValue is false', () => {
    const wrapper = mount(AppChips, {
      props: { modelValue: false },
    })
    expect(wrapper.classes()).not.toContain('app-chips--active')
  })

  it('applies disabled class when disabled is true', () => {
    const wrapper = mount(AppChips, {
      props: { modelValue: false, disabled: true },
    })
    expect(wrapper.classes()).toContain('app-chips--disabled')
  })

  it('sets disabled attribute when disabled is true', () => {
    const wrapper = mount(AppChips, {
      props: { modelValue: false, disabled: true },
    })
    expect(wrapper.attributes('disabled')).toBeDefined()
  })

  it('does not apply disabled class by default', () => {
    const wrapper = mount(AppChips, {
      props: { modelValue: false },
    })
    expect(wrapper.classes()).not.toContain('app-chips--disabled')
  })

  it('can be both active and disabled', () => {
    const wrapper = mount(AppChips, {
      props: { modelValue: true, disabled: true },
    })
    expect(wrapper.classes()).toContain('app-chips--active')
    expect(wrapper.classes()).toContain('app-chips--disabled')
  })

  it('has base app-chips class', () => {
    const wrapper = mount(AppChips, {
      props: { modelValue: false },
    })
    expect(wrapper.classes()).toContain('app-chips')
  })
})
