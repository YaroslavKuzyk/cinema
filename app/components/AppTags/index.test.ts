import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import AppTags from './index.vue'

const mockTags = [
  { id: 1, label: 'Tag 1', variant: 'primary' as const },
  { id: 2, label: 'Tag 2', variant: 'success' as const },
  { id: 3, label: 'Tag 3', variant: 'basic' as const },
]

describe('AppTags', () => {
  it('renders tags', () => {
    const wrapper = mount(AppTags, {
      props: { modelValue: mockTags },
    })
    expect(wrapper.findAll('.app-tags__tag')).toHaveLength(3)
  })

  it('renders tag labels', () => {
    const wrapper = mount(AppTags, {
      props: { modelValue: mockTags },
    })
    expect(wrapper.text()).toContain('Tag 1')
    expect(wrapper.text()).toContain('Tag 2')
    expect(wrapper.text()).toContain('Tag 3')
  })

  it('applies variant classes', () => {
    const wrapper = mount(AppTags, {
      props: { modelValue: mockTags },
    })
    expect(wrapper.find('.app-tags__tag--primary').exists()).toBe(true)
    expect(wrapper.find('.app-tags__tag--success').exists()).toBe(true)
    expect(wrapper.find('.app-tags__tag--basic').exists()).toBe(true)
  })

  it('shows add button by default', () => {
    const wrapper = mount(AppTags, {
      props: { modelValue: mockTags },
    })
    expect(wrapper.find('.app-tags__add').exists()).toBe(true)
  })

  it('hides add button when readOnly', () => {
    const wrapper = mount(AppTags, {
      props: { modelValue: mockTags, readOnly: true },
    })
    expect(wrapper.find('.app-tags__add').exists()).toBe(false)
  })

  it('hides remove buttons when readOnly', () => {
    const wrapper = mount(AppTags, {
      props: { modelValue: mockTags, readOnly: true },
    })
    expect(wrapper.find('.app-tags__remove').exists()).toBe(false)
  })

  it('disables add button when disabled', () => {
    const wrapper = mount(AppTags, {
      props: { modelValue: mockTags, disabled: true },
    })
    expect(wrapper.find('.app-tags__add').classes()).toContain('app-tags__add--disabled')
    expect(wrapper.find('.app-tags__add').attributes('disabled')).toBeDefined()
  })

  it('emits update:modelValue when tag removed', async () => {
    const wrapper = mount(AppTags, {
      props: { modelValue: mockTags },
    })
    await wrapper.find('.app-tags__remove').trigger('click')
    expect(wrapper.emitted('update:modelValue')).toBeTruthy()
    const emittedValue = wrapper.emitted('update:modelValue')![0][0] as typeof mockTags
    expect(emittedValue).toHaveLength(2)
  })

  it('emits add event when add button clicked', async () => {
    const wrapper = mount(AppTags, {
      props: { modelValue: mockTags },
    })
    await wrapper.find('.app-tags__add').trigger('click')
    expect(wrapper.emitted('add')).toBeTruthy()
  })

  it('does not emit when disabled', async () => {
    const wrapper = mount(AppTags, {
      props: { modelValue: mockTags, disabled: true },
    })
    await wrapper.find('.app-tags__remove').trigger('click')
    expect(wrapper.emitted('update:modelValue')).toBeFalsy()
  })

  it('shows custom add button text', () => {
    const wrapper = mount(AppTags, {
      props: { modelValue: mockTags, addButtonText: 'Add new' },
    })
    expect(wrapper.find('.app-tags__add').text()).toContain('Add new')
  })
})
