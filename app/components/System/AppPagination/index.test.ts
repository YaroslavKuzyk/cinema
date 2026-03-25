import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import AppPagination from './index.vue'

describe('AppPagination', () => {
  it('renders pagination component', () => {
    const wrapper = mount(AppPagination, {
      props: { currentPage: 1, totalItems: 100 },
    })
    expect(wrapper.find('.app-pagination').exists()).toBe(true)
  })

  it('displays correct info text', () => {
    const wrapper = mount(AppPagination, {
      props: { currentPage: 1, totalItems: 100, itemsPerPage: 10 },
    })
    expect(wrapper.find('.app-pagination__info').text()).toContain('1-10')
    expect(wrapper.find('.app-pagination__info').text()).toContain('100')
  })

  it('displays correct info for middle page', () => {
    const wrapper = mount(AppPagination, {
      props: { currentPage: 5, totalItems: 100, itemsPerPage: 10 },
    })
    expect(wrapper.find('.app-pagination__info').text()).toContain('41-50')
  })

  it('displays correct info for last page', () => {
    const wrapper = mount(AppPagination, {
      props: { currentPage: 10, totalItems: 95, itemsPerPage: 10 },
    })
    expect(wrapper.find('.app-pagination__info').text()).toContain('91-95')
  })

  it('renders page buttons', () => {
    const wrapper = mount(AppPagination, {
      props: { currentPage: 1, totalItems: 100, itemsPerPage: 10 },
    })
    const buttons = wrapper.findAll('.app-pagination__button')
    expect(buttons.length).toBeGreaterThan(2)
  })

  it('highlights active page', () => {
    const wrapper = mount(AppPagination, {
      props: { currentPage: 1, totalItems: 100, itemsPerPage: 10 },
    })
    expect(wrapper.find('.app-pagination__button--active').exists()).toBe(true)
  })

  it('disables previous button on first page', () => {
    const wrapper = mount(AppPagination, {
      props: { currentPage: 1, totalItems: 100, itemsPerPage: 10 },
    })
    const prevButton = wrapper.findAll('.app-pagination__button')[0]
    expect(prevButton.attributes('disabled')).toBeDefined()
  })

  it('disables next button on last page', () => {
    const wrapper = mount(AppPagination, {
      props: { currentPage: 10, totalItems: 100, itemsPerPage: 10 },
    })
    const buttons = wrapper.findAll('.app-pagination__button')
    const nextButton = buttons[buttons.length - 1]
    expect(nextButton.attributes('disabled')).toBeDefined()
  })

  it('emits update event when page clicked', async () => {
    const wrapper = mount(AppPagination, {
      props: { currentPage: 1, totalItems: 100, itemsPerPage: 10 },
    })
    const pageButton = wrapper.findAll('.app-pagination__button')[2]
    await pageButton.trigger('click')
    expect(wrapper.emitted('update:currentPage')).toBeTruthy()
  })

  it('shows ellipsis for many pages', () => {
    const wrapper = mount(AppPagination, {
      props: { currentPage: 50, totalItems: 1000, itemsPerPage: 10 },
    })
    expect(wrapper.find('.app-pagination__ellipsis').exists()).toBe(true)
  })
})
