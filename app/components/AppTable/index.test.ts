import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import AppTable from './index.vue'

const mockColumns = [
  { key: 'name', label: 'Name' },
  { key: 'status', label: 'Status' },
]

const mockData = [
  { id: 1, name: 'Item 1', status: 'active' },
  { id: 2, name: 'Item 2', status: 'inactive' },
  { id: 3, name: 'Item 3', status: 'pending' },
]

describe('AppTable', () => {
  it('renders table with columns', () => {
    const wrapper = mount(AppTable, {
      props: { columns: mockColumns, data: mockData },
    })
    expect(wrapper.find('.app-table').exists()).toBe(true)
    expect(wrapper.findAll('.app-table__cell--header')).toHaveLength(2)
  })

  it('renders column labels', () => {
    const wrapper = mount(AppTable, {
      props: { columns: mockColumns, data: mockData },
    })
    const headers = wrapper.findAll('.app-table__cell--header')
    expect(headers[0].text()).toBe('Name')
    expect(headers[1].text()).toBe('Status')
  })

  it('renders data rows', () => {
    const wrapper = mount(AppTable, {
      props: { columns: mockColumns, data: mockData },
    })
    const rows = wrapper.findAll('.app-table__body .app-table__row')
    expect(rows).toHaveLength(3)
  })

  it('renders cell content', () => {
    const wrapper = mount(AppTable, {
      props: { columns: mockColumns, data: mockData },
    })
    expect(wrapper.text()).toContain('Item 1')
    expect(wrapper.text()).toContain('active')
  })

  it('shows empty text when no data', () => {
    const wrapper = mount(AppTable, {
      props: { columns: mockColumns, data: [], emptyText: 'No data available' },
    })
    expect(wrapper.text()).toContain('No data available')
  })

  it('renders checkboxes when selectable', () => {
    const wrapper = mount(AppTable, {
      props: { columns: mockColumns, data: mockData, selectable: true },
    })
    const checkboxCells = wrapper.findAll('.app-table__cell--checkbox')
    expect(checkboxCells.length).toBeGreaterThan(0)
  })

  it('does not render checkboxes when not selectable', () => {
    const wrapper = mount(AppTable, {
      props: { columns: mockColumns, data: mockData, selectable: false },
    })
    expect(wrapper.find('.app-table__cell--checkbox').exists()).toBe(false)
  })

  it('applies alignment classes to cells', () => {
    const columnsWithAlign = [
      { key: 'name', label: 'Name', align: 'left' as const },
      { key: 'status', label: 'Status', align: 'center' as const },
    ]
    const wrapper = mount(AppTable, {
      props: { columns: columnsWithAlign, data: mockData },
    })
    expect(wrapper.find('.app-table__cell--left').exists()).toBe(true)
    expect(wrapper.find('.app-table__cell--center').exists()).toBe(true)
  })

  it('highlights selected rows', () => {
    const wrapper = mount(AppTable, {
      props: {
        columns: mockColumns,
        data: mockData,
        selectable: true,
        selectedRows: [1],
      },
    })
    expect(wrapper.find('.app-table__row--selected').exists()).toBe(true)
  })
})
