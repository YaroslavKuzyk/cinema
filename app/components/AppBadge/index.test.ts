import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import AppBadge from './index.vue'

describe('AppBadge', () => {
  it('renders slot content', () => {
    const wrapper = mount(AppBadge, {
      slots: { default: 'Test Badge' },
    })
    expect(wrapper.text()).toContain('Test Badge')
  })

  it('applies default variant class', () => {
    const wrapper = mount(AppBadge)
    expect(wrapper.classes()).toContain('app-badge--basic')
  })

  it.each(['basic', 'primary', 'danger', 'success', 'info', 'purple', 'warning'] as const)(
    'applies %s variant class',
    (variant) => {
      const wrapper = mount(AppBadge, {
        props: { variant },
      })
      expect(wrapper.classes()).toContain(`app-badge--${variant}`)
    }
  )

  it('has correct base class', () => {
    const wrapper = mount(AppBadge)
    expect(wrapper.classes()).toContain('app-badge')
  })
})
