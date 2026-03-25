import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import AppInput from './index.vue'

describe('AppInput', () => {
  it('renders with default props', () => {
    const wrapper = mount(AppInput, {
      props: { modelValue: '' },
    })
    expect(wrapper.find('.app-input').exists()).toBe(true)
  })

  it('renders input element', () => {
    const wrapper = mount(AppInput, {
      props: { modelValue: '' },
    })
    expect(wrapper.find('input').exists()).toBe(true)
  })

  it('has app-input class', () => {
    const wrapper = mount(AppInput, {
      props: { modelValue: '' },
    })
    expect(wrapper.find('input').classes()).toContain('app-input')
  })

  it('displays the modelValue', () => {
    const wrapper = mount(AppInput, {
      props: { modelValue: 'test value' },
    })
    expect(wrapper.find('input').element.value).toBe('test value')
  })

  it('emits update:modelValue on input', async () => {
    const wrapper = mount(AppInput, {
      props: { modelValue: '' },
    })
    await wrapper.find('input').setValue('new value')
    expect(wrapper.emitted('update:modelValue')).toBeTruthy()
    expect(wrapper.emitted('update:modelValue')![0]).toEqual(['new value'])
  })

  it('generates id attribute', () => {
    const wrapper = mount(AppInput, {
      props: { modelValue: '' },
    })
    expect(wrapper.find('input').attributes('id')).toBeDefined()
  })

  it('generates name attribute', () => {
    const wrapper = mount(AppInput, {
      props: { modelValue: '' },
    })
    expect(wrapper.find('input').attributes('name')).toBeDefined()
  })

  it('id and name have the same value', () => {
    const wrapper = mount(AppInput, {
      props: { modelValue: '' },
    })
    const id = wrapper.find('input').attributes('id')
    const name = wrapper.find('input').attributes('name')
    expect(id).toBe(name)
  })

  it('passes placeholder through attrs', () => {
    const wrapper = mount(AppInput, {
      props: { modelValue: '' },
      attrs: { placeholder: 'Enter text...' },
    })
    expect(wrapper.find('input').attributes('placeholder')).toBe('Enter text...')
  })

  it('passes type through attrs', () => {
    const wrapper = mount(AppInput, {
      props: { modelValue: '' },
      attrs: { type: 'password' },
    })
    expect(wrapper.find('input').attributes('type')).toBe('password')
  })

  it('passes disabled through attrs', () => {
    const wrapper = mount(AppInput, {
      props: { modelValue: '' },
      attrs: { disabled: true },
    })
    expect(wrapper.find('input').attributes('disabled')).toBeDefined()
  })

  it('is not disabled by default', () => {
    const wrapper = mount(AppInput, {
      props: { modelValue: '' },
    })
    expect(wrapper.find('input').attributes('disabled')).toBeUndefined()
  })

  it('passes readonly through attrs', () => {
    const wrapper = mount(AppInput, {
      props: { modelValue: '' },
      attrs: { readonly: true },
    })
    expect(wrapper.find('input').attributes('readonly')).toBeDefined()
  })

  it('passes maxlength through attrs', () => {
    const wrapper = mount(AppInput, {
      props: { modelValue: '' },
      attrs: { maxlength: '10' },
    })
    expect(wrapper.find('input').attributes('maxlength')).toBe('10')
  })
})
