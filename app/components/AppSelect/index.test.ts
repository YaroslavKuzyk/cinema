import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import AppSelect from './index.vue'

const defaultOptions = [
  { label: 'Option 1', value: 'option1' },
  { label: 'Option 2', value: 'option2' },
  { label: 'Option 3', value: 'option3' },
]

describe('AppSelect', () => {
  it('renders with default props', () => {
    const wrapper = mount(AppSelect, {
      props: { modelValue: '', options: defaultOptions },
    })
    expect(wrapper.find('.app-select').exists()).toBe(true)
  })

  it('renders trigger button', () => {
    const wrapper = mount(AppSelect, {
      props: { modelValue: '', options: defaultOptions },
    })
    expect(wrapper.find('.app-select__trigger').exists()).toBe(true)
  })

  it('displays placeholder when no value selected', () => {
    const wrapper = mount(AppSelect, {
      props: { modelValue: '', options: defaultOptions, placeholder: 'Select...' },
    })
    expect(wrapper.find('.app-select__value').text()).toBe('Select...')
  })

  it('displays selected option label', () => {
    const wrapper = mount(AppSelect, {
      props: { modelValue: 'option2', options: defaultOptions },
    })
    expect(wrapper.find('.app-select__value').text()).toBe('Option 2')
  })

  it('renders label when provided', () => {
    const wrapper = mount(AppSelect, {
      props: { modelValue: '', options: defaultOptions, label: 'Test Label' },
    })
    expect(wrapper.find('.app-select__label').text()).toBe('Test Label')
  })

  it('does not render label when not provided', () => {
    const wrapper = mount(AppSelect, {
      props: { modelValue: '', options: defaultOptions },
    })
    expect(wrapper.find('.app-select__label').exists()).toBe(false)
  })

  it('opens dropdown on click', async () => {
    const wrapper = mount(AppSelect, {
      props: { modelValue: '', options: defaultOptions },
    })
    await wrapper.find('.app-select__trigger').trigger('click')
    expect(wrapper.find('.app-select__dropdown').exists()).toBe(true)
  })

  it('renders all options in dropdown', async () => {
    const wrapper = mount(AppSelect, {
      props: { modelValue: '', options: defaultOptions },
    })
    await wrapper.find('.app-select__trigger').trigger('click')
    const options = wrapper.findAll('.app-select__option')
    expect(options).toHaveLength(3)
  })

  it('emits update:modelValue when option is selected', async () => {
    const wrapper = mount(AppSelect, {
      props: { modelValue: '', options: defaultOptions },
    })
    await wrapper.find('.app-select__trigger').trigger('click')
    await wrapper.findAll('.app-select__option')[1].trigger('click')
    expect(wrapper.emitted('update:modelValue')).toBeTruthy()
    expect(wrapper.emitted('update:modelValue')![0]).toEqual(['option2'])
  })

  it('closes dropdown after single selection', async () => {
    const wrapper = mount(AppSelect, {
      props: { modelValue: '', options: defaultOptions },
    })
    await wrapper.find('.app-select__trigger').trigger('click')
    await wrapper.findAll('.app-select__option')[0].trigger('click')
    expect(wrapper.find('.app-select__dropdown').exists()).toBe(false)
  })

  it('applies disabled class when disabled', () => {
    const wrapper = mount(AppSelect, {
      props: { modelValue: '', options: defaultOptions, disabled: true },
    })
    expect(wrapper.find('.app-select').classes()).toContain('app-select--disabled')
  })

  it('does not open dropdown when disabled', async () => {
    const wrapper = mount(AppSelect, {
      props: { modelValue: '', options: defaultOptions, disabled: true },
    })
    await wrapper.find('.app-select__trigger').trigger('click')
    expect(wrapper.find('.app-select__dropdown').exists()).toBe(false)
  })

  it('displays multiple selected values', () => {
    const wrapper = mount(AppSelect, {
      props: { modelValue: ['option1', 'option3'], options: defaultOptions, multiple: true },
    })
    expect(wrapper.find('.app-select__value').text()).toBe('Option 1, Option 3')
  })

  it('renders checkbox for multiple mode', async () => {
    const wrapper = mount(AppSelect, {
      props: { modelValue: [], options: defaultOptions, multiple: true },
    })
    await wrapper.find('.app-select__trigger').trigger('click')
    expect(wrapper.find('.app-select__checkbox').exists()).toBe(true)
  })

  it('keeps dropdown open after selection in multiple mode', async () => {
    const wrapper = mount(AppSelect, {
      props: { modelValue: [], options: defaultOptions, multiple: true },
    })
    await wrapper.find('.app-select__trigger').trigger('click')
    await wrapper.findAll('.app-select__option')[0].trigger('click')
    expect(wrapper.find('.app-select__dropdown').exists()).toBe(true)
  })

  it('adds value to array in multiple mode', async () => {
    const wrapper = mount(AppSelect, {
      props: { modelValue: ['option1'], options: defaultOptions, multiple: true },
    })
    await wrapper.find('.app-select__trigger').trigger('click')
    await wrapper.findAll('.app-select__option')[1].trigger('click')
    expect(wrapper.emitted('update:modelValue')![0]).toEqual([['option1', 'option2']])
  })

  it('removes value from array when deselecting in multiple mode', async () => {
    const wrapper = mount(AppSelect, {
      props: { modelValue: ['option1', 'option2'], options: defaultOptions, multiple: true },
    })
    await wrapper.find('.app-select__trigger').trigger('click')
    await wrapper.findAll('.app-select__option')[0].trigger('click')
    expect(wrapper.emitted('update:modelValue')![0]).toEqual([['option2']])
  })

  it('applies selected class to selected option', async () => {
    const wrapper = mount(AppSelect, {
      props: { modelValue: 'option2', options: defaultOptions },
    })
    await wrapper.find('.app-select__trigger').trigger('click')
    const options = wrapper.findAll('.app-select__option')
    expect(options[1].classes()).toContain('app-select__option--selected')
  })

  it('rotates arrow when open', async () => {
    const wrapper = mount(AppSelect, {
      props: { modelValue: '', options: defaultOptions },
    })
    await wrapper.find('.app-select__trigger').trigger('click')
    expect(wrapper.find('.app-select__arrow').classes()).toContain('app-select__arrow--open')
  })
})
