import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import AppCard from './index.vue'

describe('AppCard', () => {
  it('renders card component', () => {
    const wrapper = mount(AppCard)
    expect(wrapper.find('.app-card').exists()).toBe(true)
  })

  it('renders slot content', () => {
    const wrapper = mount(AppCard, {
      slots: { default: 'Card content' },
    })
    expect(wrapper.text()).toContain('Card content')
  })

  it('renders title when provided', () => {
    const wrapper = mount(AppCard, {
      props: { title: 'Test Title' },
    })
    expect(wrapper.find('.app-card__title').text()).toBe('Test Title')
  })

  it('renders subtitle when provided', () => {
    const wrapper = mount(AppCard, {
      props: { subtitle: 'Test Subtitle' },
    })
    expect(wrapper.find('.app-card__subtitle').text()).toBe('Test Subtitle')
  })

  it('hides header when no title or subtitle', () => {
    const wrapper = mount(AppCard)
    expect(wrapper.find('.app-card__header').exists()).toBe(false)
  })

  it('shows header when title provided', () => {
    const wrapper = mount(AppCard, {
      props: { title: 'Title' },
    })
    expect(wrapper.find('.app-card__header').exists()).toBe(true)
  })

  it('renders footer slot', () => {
    const wrapper = mount(AppCard, {
      slots: { footer: 'Footer content' },
    })
    expect(wrapper.find('.app-card__footer').text()).toBe('Footer content')
  })

  it('hides footer when no slot content', () => {
    const wrapper = mount(AppCard)
    expect(wrapper.find('.app-card__footer').exists()).toBe(false)
  })

  it('renders as div by default', () => {
    const wrapper = mount(AppCard)
    expect(wrapper.element.tagName).toBe('DIV')
  })

  it('renders as button when clickable', () => {
    const wrapper = mount(AppCard, {
      props: { clickable: true },
    })
    expect(wrapper.element.tagName).toBe('BUTTON')
  })

  it('applies clickable class when clickable', () => {
    const wrapper = mount(AppCard, {
      props: { clickable: true },
    })
    expect(wrapper.classes()).toContain('app-card--clickable')
  })

  it('renders header-action slot', () => {
    const wrapper = mount(AppCard, {
      props: { title: 'Title' },
      slots: { 'header-action': 'Action button' },
    })
    expect(wrapper.find('.app-card__header-action').text()).toBe('Action button')
  })
})
