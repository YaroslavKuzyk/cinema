import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import AppTextarea from './index.vue'

describe('AppTextarea', () => {
  it('renders with default props', () => {
    const wrapper = mount(AppTextarea, {
      props: { modelValue: '' },
    })
    expect(wrapper.find('.app-textarea').exists()).toBe(true)
  })

  it('renders textarea element', () => {
    const wrapper = mount(AppTextarea, {
      props: { modelValue: '' },
    })
    expect(wrapper.find('textarea').exists()).toBe(true)
  })

  it('displays the modelValue', () => {
    const wrapper = mount(AppTextarea, {
      props: { modelValue: 'test value' },
    })
    expect(wrapper.find('textarea').element.value).toBe('test value')
  })

  it('emits update:modelValue on input', async () => {
    const wrapper = mount(AppTextarea, {
      props: { modelValue: '' },
    })
    await wrapper.find('textarea').setValue('new value')
    expect(wrapper.emitted('update:modelValue')).toBeTruthy()
    expect(wrapper.emitted('update:modelValue')![0]).toEqual(['new value'])
  })

  it('renders label when provided', () => {
    const wrapper = mount(AppTextarea, {
      props: { modelValue: '', label: 'Опис' },
    })
    expect(wrapper.find('.app-textarea__label').text()).toBe('Опис')
  })

  it('does not render label when not provided', () => {
    const wrapper = mount(AppTextarea, {
      props: { modelValue: '' },
    })
    expect(wrapper.find('.app-textarea__label').exists()).toBe(false)
  })

  it('generates id attribute', () => {
    const wrapper = mount(AppTextarea, {
      props: { modelValue: '' },
    })
    expect(wrapper.find('textarea').attributes('id')).toBeDefined()
  })

  it('generates name attribute matching id', () => {
    const wrapper = mount(AppTextarea, {
      props: { modelValue: '' },
    })
    const id = wrapper.find('textarea').attributes('id')
    const name = wrapper.find('textarea').attributes('name')
    expect(id).toBe(name)
  })

  it('sets rows attribute', () => {
    const wrapper = mount(AppTextarea, {
      props: { modelValue: '', rows: 5 },
    })
    expect(wrapper.find('textarea').attributes('rows')).toBe('5')
  })

  it('defaults to 3 rows', () => {
    const wrapper = mount(AppTextarea, {
      props: { modelValue: '' },
    })
    expect(wrapper.find('textarea').attributes('rows')).toBe('3')
  })

  it('applies readonly class when readonly', () => {
    const wrapper = mount(AppTextarea, {
      props: { modelValue: '', readonly: true },
    })
    expect(wrapper.find('textarea').classes()).toContain('app-textarea__field--readonly')
  })

  it('does not apply readonly class by default', () => {
    const wrapper = mount(AppTextarea, {
      props: { modelValue: '' },
    })
    expect(wrapper.find('textarea').classes()).not.toContain('app-textarea__field--readonly')
  })

  it('label for matches textarea id', () => {
    const wrapper = mount(AppTextarea, {
      props: { modelValue: '', label: 'Опис' },
    })
    const labelFor = wrapper.find('label').attributes('for')
    const textareaId = wrapper.find('textarea').attributes('id')
    expect(labelFor).toBe(textareaId)
  })
})
