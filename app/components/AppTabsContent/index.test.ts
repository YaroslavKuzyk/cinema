import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import { ref } from 'vue'
import AppTabsContent from './index.vue'
import { APP_TABS_INJECTION_KEY } from '../AppTabs/index.constants'

describe('AppTabsContent', () => {
  it('renders slot content when value matches active tab', () => {
    const wrapper = mount(AppTabsContent, {
      props: { value: 'tab1' },
      slots: { default: 'Tab 1 Content' },
      global: {
        provide: {
          [APP_TABS_INJECTION_KEY]: ref('tab1'),
        },
      },
    })
    expect(wrapper.text()).toContain('Tab 1 Content')
  })

  it('does not render when value does not match active tab', () => {
    const wrapper = mount(AppTabsContent, {
      props: { value: 'tab2' },
      slots: { default: 'Tab 2 Content' },
      global: {
        provide: {
          [APP_TABS_INJECTION_KEY]: ref('tab1'),
        },
      },
    })
    expect(wrapper.find('.app-tabs-content').exists()).toBe(false)
  })

  it('has app-tabs-content class when active', () => {
    const wrapper = mount(AppTabsContent, {
      props: { value: 'active' },
      slots: { default: 'Content' },
      global: {
        provide: {
          [APP_TABS_INJECTION_KEY]: ref('active'),
        },
      },
    })
    expect(wrapper.find('.app-tabs-content').exists()).toBe(true)
  })

  it('works with numeric value', () => {
    const wrapper = mount(AppTabsContent, {
      props: { value: 1 },
      slots: { default: 'Numeric Content' },
      global: {
        provide: {
          [APP_TABS_INJECTION_KEY]: ref(1),
        },
      },
    })
    expect(wrapper.text()).toContain('Numeric Content')
  })

  it('reactively shows/hides content when active tab changes', async () => {
    const activeTab = ref('tab1')
    const wrapper = mount(AppTabsContent, {
      props: { value: 'tab2' },
      slots: { default: 'Tab 2 Content' },
      global: {
        provide: {
          [APP_TABS_INJECTION_KEY]: activeTab,
        },
      },
    })

    expect(wrapper.find('.app-tabs-content').exists()).toBe(false)

    activeTab.value = 'tab2'
    await wrapper.vm.$nextTick()

    expect(wrapper.find('.app-tabs-content').exists()).toBe(true)
    expect(wrapper.text()).toContain('Tab 2 Content')
  })

  it('does not render without injection', () => {
    const wrapper = mount(AppTabsContent, {
      props: { value: 'tab1' },
      slots: { default: 'Content' },
    })
    expect(wrapper.find('.app-tabs-content').exists()).toBe(false)
  })
})
