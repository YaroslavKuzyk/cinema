import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import AppTabs from './index.vue'
import AppButton from '../AppButton/index.vue'

const sampleTabs = [
  { title: 'Tab 1', value: 'tab1' },
  { title: 'Tab 2', value: 'tab2' },
  { title: 'Tab 3', value: 'tab3' },
]

const tabsWithBadges = [
  { title: 'New', value: 'new', badge: 12 },
  { title: 'Popular', value: 'popular', badge: 5 },
]

const tabsWithDisabled = [
  { title: 'Active', value: 'active' },
  { title: 'Disabled', value: 'disabled', disabled: true },
]

describe('AppTabs', () => {
  describe('Common', () => {
    it('renders with default props', () => {
      const wrapper = mount(AppTabs, {
        props: { modelValue: 'tab1', tabs: sampleTabs },
      })
      expect(wrapper.find('.app-tabs').exists()).toBe(true)
    })

    it('has base app-tabs class', () => {
      const wrapper = mount(AppTabs, {
        props: { modelValue: 'tab1', tabs: sampleTabs },
      })
      expect(wrapper.classes()).toContain('app-tabs')
    })

    it('renders correct number of tabs', () => {
      const wrapper = mount(AppTabs, {
        props: { modelValue: 'tab1', tabs: sampleTabs },
      })
      expect(wrapper.findAllComponents(AppButton)).toHaveLength(3)
    })

    it('emits update:modelValue when tab is clicked', async () => {
      const wrapper = mount(AppTabs, {
        props: { modelValue: 'tab1', tabs: sampleTabs },
      })
      await wrapper.findAllComponents(AppButton)[1].trigger('click')
      expect(wrapper.emitted('update:modelValue')).toBeTruthy()
      expect(wrapper.emitted('update:modelValue')![0]).toEqual(['tab2'])
    })
  })

  describe('Pill variant', () => {
    it('applies pill variant class by default', () => {
      const wrapper = mount(AppTabs, {
        props: { modelValue: 'tab1', tabs: sampleTabs },
      })
      expect(wrapper.find('.app-tabs__header').classes()).toContain('app-tabs__header--pill')
    })

    it('renders AppButton components for pill variant', () => {
      const wrapper = mount(AppTabs, {
        props: { modelValue: 'tab1', tabs: sampleTabs, variant: 'pill' },
      })
      expect(wrapper.findAllComponents(AppButton)).toHaveLength(3)
    })

    it('applies primary variant to active tab button', () => {
      const wrapper = mount(AppTabs, {
        props: { modelValue: 'tab1', tabs: sampleTabs, variant: 'pill' },
      })
      const buttons = wrapper.findAllComponents(AppButton)
      expect(buttons[0].props('variant')).toBe('primary')
      expect(buttons[1].props('variant')).toBe('secondary')
    })

    it('renders tab titles in pill variant', () => {
      const wrapper = mount(AppTabs, {
        props: { modelValue: 'tab1', tabs: sampleTabs, variant: 'pill' },
      })
      expect(wrapper.text()).toContain('Tab 1')
      expect(wrapper.text()).toContain('Tab 2')
    })

    it('renders badges in pill variant', () => {
      const wrapper = mount(AppTabs, {
        props: { modelValue: 'new', tabs: tabsWithBadges, variant: 'pill' },
      })
      expect(wrapper.findAll('.app-tabs__pill-button-badge')).toHaveLength(2)
      expect(wrapper.text()).toContain('12')
      expect(wrapper.text()).toContain('5')
    })

    it('passes buttonProps to AppButton', () => {
      const wrapper = mount(AppTabs, {
        props: {
          modelValue: 'tab1',
          tabs: sampleTabs,
          variant: 'pill',
          buttonProps: { size: 'small' },
        },
      })
      const buttons = wrapper.findAllComponents(AppButton)
      expect(buttons[0].props('size')).toBe('small')
    })

    it('disables tab when disabled prop is true', () => {
      const wrapper = mount(AppTabs, {
        props: { modelValue: 'active', tabs: tabsWithDisabled, variant: 'pill' },
      })
      const buttons = wrapper.findAllComponents(AppButton)
      expect(buttons[1].props('disabled')).toBe(true)
    })
  })

  describe('Underline variant', () => {
    it('applies underline variant class', () => {
      const wrapper = mount(AppTabs, {
        props: { modelValue: 'tab1', tabs: sampleTabs, variant: 'underline' },
      })
      expect(wrapper.find('.app-tabs__header').classes()).toContain('app-tabs__header--underline')
    })

    it('renders custom buttons for underline variant', () => {
      const wrapper = mount(AppTabs, {
        props: { modelValue: 'tab1', tabs: sampleTabs, variant: 'underline' },
      })
      expect(wrapper.findAll('.app-tabs__underline-button')).toHaveLength(3)
    })

    it('applies active class to selected tab', () => {
      const wrapper = mount(AppTabs, {
        props: { modelValue: 'tab1', tabs: sampleTabs, variant: 'underline' },
      })
      const buttons = wrapper.findAll('.app-tabs__underline-button')
      expect(buttons[0].classes()).toContain('app-tabs__underline-button--active')
      expect(buttons[1].classes()).not.toContain('app-tabs__underline-button--active')
    })

    it('renders tab titles in underline variant', () => {
      const wrapper = mount(AppTabs, {
        props: { modelValue: 'tab1', tabs: sampleTabs, variant: 'underline' },
      })
      expect(wrapper.findAll('.app-tabs__underline-button-title')).toHaveLength(3)
      expect(wrapper.text()).toContain('Tab 1')
    })

    it('renders badges in underline variant', () => {
      const wrapper = mount(AppTabs, {
        props: { modelValue: 'new', tabs: tabsWithBadges, variant: 'underline' },
      })
      expect(wrapper.findAll('.app-tabs__underline-button-badge')).toHaveLength(2)
      expect(wrapper.text()).toContain('12')
    })

    it('applies disabled class when tab is disabled', () => {
      const wrapper = mount(AppTabs, {
        props: { modelValue: 'active', tabs: tabsWithDisabled, variant: 'underline' },
      })
      const buttons = wrapper.findAll('.app-tabs__underline-button')
      expect(buttons[1].classes()).toContain('app-tabs__underline-button--disabled')
    })

    it('sets disabled attribute on disabled tab', () => {
      const wrapper = mount(AppTabs, {
        props: { modelValue: 'active', tabs: tabsWithDisabled, variant: 'underline' },
      })
      const buttons = wrapper.findAll('.app-tabs__underline-button')
      expect(buttons[1].attributes('disabled')).toBeDefined()
    })

    it('emits update:modelValue when underline tab is clicked', async () => {
      const wrapper = mount(AppTabs, {
        props: { modelValue: 'tab1', tabs: sampleTabs, variant: 'underline' },
      })
      await wrapper.findAll('.app-tabs__underline-button')[1].trigger('click')
      expect(wrapper.emitted('update:modelValue')).toBeTruthy()
      expect(wrapper.emitted('update:modelValue')![0]).toEqual(['tab2'])
    })
  })
})
