import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import AppToast from './index.vue'
import type { IToast } from './index.types'

const createToast = (overrides: Partial<IToast> = {}): IToast => ({
  id: '1',
  message: 'Test message',
  variant: 'info',
  ...overrides,
})

describe('AppToast', () => {
  it('renders toast component', () => {
    const wrapper = mount(AppToast, {
      props: { toast: createToast() },
    })
    expect(wrapper.find('.app-toast').exists()).toBe(true)
  })

  it('renders message', () => {
    const wrapper = mount(AppToast, {
      props: { toast: createToast({ message: 'Test message' }) },
    })
    expect(wrapper.find('.app-toast__message').text()).toBe('Test message')
  })

  it('renders title when provided', () => {
    const wrapper = mount(AppToast, {
      props: { toast: createToast({ title: 'Test title' }) },
    })
    expect(wrapper.find('.app-toast__title').text()).toBe('Test title')
  })

  it('does not render title when not provided', () => {
    const wrapper = mount(AppToast, {
      props: { toast: createToast({ title: undefined }) },
    })
    expect(wrapper.find('.app-toast__title').exists()).toBe(false)
  })

  it.each(['info', 'success', 'warning', 'danger'] as const)(
    'applies %s variant class',
    (variant) => {
      const wrapper = mount(AppToast, {
        props: { toast: createToast({ variant }) },
      })
      expect(wrapper.classes()).toContain(`app-toast--${variant}`)
    }
  )

  it('renders close button', () => {
    const wrapper = mount(AppToast, {
      props: { toast: createToast() },
    })
    expect(wrapper.find('.app-toast__close').exists()).toBe(true)
  })

  it('emits close event when close button clicked', async () => {
    const wrapper = mount(AppToast, {
      props: { toast: createToast() },
    })
    await wrapper.find('.app-toast__close').trigger('click')
    expect(wrapper.emitted('close')).toBeTruthy()
  })

  it('renders icon', () => {
    const wrapper = mount(AppToast, {
      props: { toast: createToast() },
    })
    expect(wrapper.find('.app-toast__icon').exists()).toBe(true)
  })
})
