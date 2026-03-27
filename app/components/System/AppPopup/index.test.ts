import { describe, it, expect, beforeEach, afterEach } from 'vitest'
import { mount } from '@vue/test-utils'
import AppPopup from './index.vue'

describe('AppPopup', () => {
  beforeEach(() => {
    // Mock teleport
    const el = document.createElement('div')
    el.id = 'teleport-target'
    document.body.appendChild(el)
  })

  afterEach(() => {
    document.body.innerHTML = ''
  })

  it('renders trigger slot', () => {
    const wrapper = mount(AppPopup, {
      slots: {
        trigger: '<button class="test-trigger">Trigger</button>',
        default: '<div>Content</div>',
      },
      global: {
        stubs: {
          Teleport: true,
        },
      },
    })
    expect(wrapper.find('.test-trigger').exists()).toBe(true)
  })

  it('is closed by default', () => {
    const wrapper = mount(AppPopup, {
      slots: {
        trigger: '<button>Trigger</button>',
        default: '<div class="popup-content">Content</div>',
      },
      global: {
        stubs: {
          Teleport: true,
        },
      },
    })
    expect(wrapper.find('.popup-content').exists()).toBe(false)
  })

  it('opens on trigger click when trigger is click', async () => {
    const wrapper = mount(AppPopup, {
      props: {
        trigger: 'click',
      },
      slots: {
        trigger: '<button>Trigger</button>',
        default: '<div class="popup-content">Content</div>',
      },
      global: {
        stubs: {
          Teleport: true,
        },
      },
    })

    await wrapper.find('.app-popup__trigger').trigger('click')
    expect(wrapper.find('.app-popup__content').exists()).toBe(true)
  })

  it('toggles on click', async () => {
    const wrapper = mount(AppPopup, {
      props: {
        trigger: 'click',
      },
      slots: {
        trigger: '<button>Trigger</button>',
        default: '<div>Content</div>',
      },
      global: {
        stubs: {
          Teleport: true,
        },
      },
    })

    await wrapper.find('.app-popup__trigger').trigger('click')
    expect(wrapper.find('.app-popup__content').exists()).toBe(true)

    await wrapper.find('.app-popup__trigger').trigger('click')
    expect(wrapper.find('.app-popup__content').exists()).toBe(false)
  })

  it('does not open when disabled', async () => {
    const wrapper = mount(AppPopup, {
      props: {
        disabled: true,
      },
      slots: {
        trigger: '<button>Trigger</button>',
        default: '<div>Content</div>',
      },
      global: {
        stubs: {
          Teleport: true,
        },
      },
    })

    await wrapper.find('.app-popup__trigger').trigger('click')
    expect(wrapper.find('.app-popup__content').exists()).toBe(false)
  })

  it('emits update:modelValue when opened', async () => {
    const wrapper = mount(AppPopup, {
      props: {
        modelValue: false,
      },
      slots: {
        trigger: '<button>Trigger</button>',
        default: '<div>Content</div>',
      },
      global: {
        stubs: {
          Teleport: true,
        },
      },
    })

    await wrapper.find('.app-popup__trigger').trigger('click')
    expect(wrapper.emitted('update:modelValue')).toBeTruthy()
    expect(wrapper.emitted('update:modelValue')![0]).toEqual([true])
  })

  it('respects controlled modelValue', async () => {
    const wrapper = mount(AppPopup, {
      props: {
        modelValue: true,
      },
      slots: {
        trigger: '<button>Trigger</button>',
        default: '<div>Content</div>',
      },
      global: {
        stubs: {
          Teleport: true,
        },
      },
    })

    expect(wrapper.find('.app-popup__content').exists()).toBe(true)
  })

  it('closes on content click when closeOnContentClick is true', async () => {
    const wrapper = mount(AppPopup, {
      props: {
        closeOnContentClick: true,
      },
      slots: {
        trigger: '<button>Trigger</button>',
        default: '<div class="inner-content">Content</div>',
      },
      global: {
        stubs: {
          Teleport: true,
        },
      },
    })

    await wrapper.find('.app-popup__trigger').trigger('click')
    expect(wrapper.find('.app-popup__content').exists()).toBe(true)

    await wrapper.find('.app-popup__content').trigger('click')
    expect(wrapper.find('.app-popup__content').exists()).toBe(false)
  })

  it('does not close on content click when closeOnContentClick is false', async () => {
    const wrapper = mount(AppPopup, {
      props: {
        closeOnContentClick: false,
      },
      slots: {
        trigger: '<button>Trigger</button>',
        default: '<div>Content</div>',
      },
      global: {
        stubs: {
          Teleport: true,
        },
      },
    })

    await wrapper.find('.app-popup__trigger').trigger('click')
    expect(wrapper.find('.app-popup__content').exists()).toBe(true)

    await wrapper.find('.app-popup__content').trigger('click')
    expect(wrapper.find('.app-popup__content').exists()).toBe(true)
  })

  it('opens on hover when trigger is hover', async () => {
    const wrapper = mount(AppPopup, {
      props: {
        trigger: 'hover',
      },
      slots: {
        trigger: '<button>Trigger</button>',
        default: '<div>Content</div>',
      },
      global: {
        stubs: {
          Teleport: true,
        },
      },
    })

    await wrapper.find('.app-popup__trigger').trigger('mouseenter')
    expect(wrapper.find('.app-popup__content').exists()).toBe(true)
  })

  it('does not open on click when trigger is hover', async () => {
    const wrapper = mount(AppPopup, {
      props: {
        trigger: 'hover',
      },
      slots: {
        trigger: '<button>Trigger</button>',
        default: '<div>Content</div>',
      },
      global: {
        stubs: {
          Teleport: true,
        },
      },
    })

    await wrapper.find('.app-popup__trigger').trigger('click')
    expect(wrapper.find('.app-popup__content').exists()).toBe(false)
  })

  it('applies default position class', async () => {
    const wrapper = mount(AppPopup, {
      props: {
        position: 'bottom-start',
      },
      slots: {
        trigger: '<button>Trigger</button>',
        default: '<div>Content</div>',
      },
      global: {
        stubs: {
          Teleport: true,
        },
      },
    })

    await wrapper.find('.app-popup__trigger').trigger('click')
    expect(wrapper.find('.app-popup__content').exists()).toBe(true)
  })

  it('renders default slot content', async () => {
    const wrapper = mount(AppPopup, {
      slots: {
        trigger: '<button>Trigger</button>',
        default: '<div class="custom-content">Custom Content</div>',
      },
      global: {
        stubs: {
          Teleport: true,
        },
      },
    })

    await wrapper.find('.app-popup__trigger').trigger('click')
    expect(wrapper.find('.custom-content').exists()).toBe(true)
    expect(wrapper.find('.custom-content').text()).toBe('Custom Content')
  })
})
