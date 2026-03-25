import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import AppAlert from './index.vue'

describe('AppAlert', () => {
  it('renders alert component', () => {
    const wrapper = mount(AppAlert)
    expect(wrapper.find('.app-alert').exists()).toBe(true)
  })

  it('renders slot content', () => {
    const wrapper = mount(AppAlert, {
      slots: { default: 'Alert message' },
    })
    expect(wrapper.text()).toContain('Alert message')
  })

  it('applies default info variant', () => {
    const wrapper = mount(AppAlert)
    expect(wrapper.classes()).toContain('app-alert--info')
  })

  it.each(['info', 'warning', 'danger', 'success'] as const)(
    'applies %s variant class',
    (variant) => {
      const wrapper = mount(AppAlert, {
        props: { variant },
      })
      expect(wrapper.classes()).toContain(`app-alert--${variant}`)
    }
  )

  it('renders icon', () => {
    const wrapper = mount(AppAlert)
    expect(wrapper.find('.app-alert__icon').exists()).toBe(true)
  })
})
