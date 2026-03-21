import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import AppLoader from './index.vue'

describe('AppLoader', () => {
  it('renders the loader component', () => {
    const wrapper = mount(AppLoader)
    expect(wrapper.find('.app-loader').exists()).toBe(true)
  })

  it('uses default size of 20', () => {
    const wrapper = mount(AppLoader)
    const svg = wrapper.find('svg')
    expect(svg.attributes('width')).toBe('20')
    expect(svg.attributes('height')).toBe('20')
  })

  it('applies custom size', () => {
    const wrapper = mount(AppLoader, {
      props: { size: 32 },
    })
    const svg = wrapper.find('svg')
    expect(svg.attributes('width')).toBe('32')
    expect(svg.attributes('height')).toBe('32')
  })
})
