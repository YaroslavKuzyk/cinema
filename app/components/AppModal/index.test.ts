import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import AppModal from './index.vue'

describe('AppModal', () => {
  it('renders modal component', () => {
    const wrapper = mount(AppModal, {
      props: { modelValue: true },
      global: {
        stubs: {
          VueFinalModal: {
            template: '<div class="app-modal"><slot /></div>',
          },
        },
      },
    })
    expect(wrapper.find('.app-modal').exists()).toBe(true)
  })

  it('renders title when provided', () => {
    const wrapper = mount(AppModal, {
      props: { modelValue: true, title: 'Test Title' },
      global: {
        stubs: {
          VueFinalModal: {
            template: '<div><slot /></div>',
          },
        },
      },
    })
    expect(wrapper.find('.app-modal__title').text()).toBe('Test Title')
  })

  it('renders description when provided', () => {
    const wrapper = mount(AppModal, {
      props: { modelValue: true, description: 'Test Description' },
      global: {
        stubs: {
          VueFinalModal: {
            template: '<div><slot /></div>',
          },
        },
      },
    })
    expect(wrapper.find('.app-modal__description').text()).toBe('Test Description')
  })

  it('renders close button when closable', () => {
    const wrapper = mount(AppModal, {
      props: { modelValue: true, closable: true },
      global: {
        stubs: {
          VueFinalModal: {
            template: '<div><slot /></div>',
          },
        },
      },
    })
    expect(wrapper.find('.app-modal__close').exists()).toBe(true)
  })

  it('hides close button when not closable', () => {
    const wrapper = mount(AppModal, {
      props: { modelValue: true, closable: false },
      global: {
        stubs: {
          VueFinalModal: {
            template: '<div><slot /></div>',
          },
        },
      },
    })
    expect(wrapper.find('.app-modal__close').exists()).toBe(false)
  })

  it('applies size class', () => {
    const wrapper = mount(AppModal, {
      props: { modelValue: true, size: 'large' },
      global: {
        stubs: {
          VueFinalModal: {
            template: '<div><slot /></div>',
          },
        },
      },
    })
    expect(wrapper.find('.app-modal__content--large').exists()).toBe(true)
  })

  it('renders icon slot', () => {
    const wrapper = mount(AppModal, {
      props: { modelValue: true },
      slots: { icon: '<span class="test-icon">Icon</span>' },
      global: {
        stubs: {
          VueFinalModal: {
            template: '<div><slot /></div>',
          },
        },
      },
    })
    expect(wrapper.find('.app-modal__icon').exists()).toBe(true)
    expect(wrapper.find('.test-icon').exists()).toBe(true)
  })

  it('renders footer slot', () => {
    const wrapper = mount(AppModal, {
      props: { modelValue: true },
      slots: { footer: '<button>Action</button>' },
      global: {
        stubs: {
          VueFinalModal: {
            template: '<div><slot /></div>',
          },
        },
      },
    })
    expect(wrapper.find('.app-modal__footer').exists()).toBe(true)
  })

  it('emits update:modelValue when close clicked', async () => {
    const wrapper = mount(AppModal, {
      props: { modelValue: true, closable: true },
      global: {
        stubs: {
          VueFinalModal: {
            template: '<div><slot /></div>',
          },
        },
      },
    })
    await wrapper.find('.app-modal__close').trigger('click')
    expect(wrapper.emitted('update:modelValue')).toBeTruthy()
    expect(wrapper.emitted('update:modelValue')![0]).toEqual([false])
  })
})
