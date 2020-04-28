/**
 * Component Test
 *
 */

import React from 'react'
import {
  mount,
  fakeProps,
  axeComponent,
  toJson,
  loadScss
} from '../../../core/jest/jestSetup'
import Component from '../Autocomplete'

// just to make sure we re-run the test in watch mode due to changes in theese files
import _autocomplete from '../style/_autocomplete.scss' // eslint-disable-line
import dnb_autocomplete from '../style/dnb-autocomplete.scss' // eslint-disable-line
import dnb_autocomplete_theme_ui from '../style/themes/dnb-autocomplete-theme-ui.scss' // eslint-disable-line

const snapshotProps = {
  ...fakeProps(require.resolve('../Autocomplete'), {
    optional: true
  }),
  id: 'autocomplete-id',
  mode: 'sync',
  label: 'Autocomplete Label:',
  status: 'status',
  status_state: 'error',
  direction: 'bottom',
  label_direction: 'horizontal',
  value: 2,
  prevent_selection: null,
  align_autocomplete: null,
  input_component: null,
  size: null,
  opened: true,
  show_drawer_button: true,
  no_animation: true
}

// use no_animation so we don't need to wait
const props = {
  id: 'autocomplete-id',
  mode: 'sync',
  value: 1,
  show_drawer_button: true,
  no_animation: true
}

const mockData = ['AA c', 'BB cc zethx', 'CC cc']

describe('Autocomplete component', () => {
  it('has correct word and in-word highlighting', () => {
    const Comp = mount(
      <Component
        id="autocomplete-id"
        data={['aaa', 'The Godfather the godfather The Godfather', 'ccc']}
        opened
        no_animation
        input_value="the g th"
      />
    )
    expect(Comp.find('li.dnb-drawer-list__option').at(0).html()).toBe(
      /* @html */ `<li class="first-of-type dnb-drawer-list__option" role="option" tabindex="-1" aria-selected="false" data-item="1" id="option-autocomplete-id-1"><span class="dnb-drawer-list__option__inner"><span><span class="dnb-drawer-list__option__item--highlight"><span class="dnb-drawer-list__option__item--highlight"><span class="dnb-drawer-list__option__item--highlight">Th</span></span>e</span> <span class="dnb-drawer-list__option__item--highlight">G</span>odfa<span class="dnb-drawer-list__option__item--highlight">th</span>er <span class="dnb-drawer-list__option__item--highlight"><span class="dnb-drawer-list__option__item--highlight">th</span>e</span> <span class="dnb-drawer-list__option__item--highlight">g</span>odfa<span class="dnb-drawer-list__option__item--highlight">th</span>er <span class="dnb-drawer-list__option__item--highlight"><span class="dnb-drawer-list__option__item--highlight">Th</span>e</span> <span class="dnb-drawer-list__option__item--highlight">G</span>odfa<span class="dnb-drawer-list__option__item--highlight">th</span>er</span></span></li>`
    )
  })

  it('has correct options after filter', () => {
    const Comp = mount(
      <Component id="autocomplete-id" data={mockData} show_drawer_button />
    )

    open(Comp)

    Comp.find('.dnb-input__input').simulate('change', {
      target: { value: 'aa' }
    })
    expect(
      Comp.find(
        'li.dnb-drawer-list__option:not(.dnb-autocomplete__show-all)'
      ).length
    ).toBe(1)
    expect(
      Comp.find(
        'li.dnb-drawer-list__option:not(.dnb-autocomplete__show-all)'
      ).text()
    ).toBe(mockData[0])

    // check "cc"
    Comp.find('.dnb-input__input').simulate('change', {
      target: { value: 'cc' }
    })
    expect(
      Comp.find(
        'li.dnb-drawer-list__option:not(.dnb-autocomplete__show-all)'
      ).length
    ).toBe(2)

    // check "bb cc"
    Comp.find('.dnb-input__input').simulate('change', {
      target: { value: 'bb cc' }
    })
    expect(Comp.find('li.dnb-drawer-list__option').at(0).text()).toBe(
      mockData[1]
    )
    expect(
      Comp.find(
        'li.dnb-drawer-list__option:not(.dnb-autocomplete__show-all)'
      ).length
    ).toBe(2)

    // check "aa cc"
    Comp.find('.dnb-input__input').simulate('change', {
      target: { value: 'aa cc' }
    })
    expect(Comp.find('li.dnb-drawer-list__option').at(0).text()).toBe(
      mockData[0]
    )

    // check inside words
    Comp.find('.dnb-input__input').simulate('change', {
      target: { value: 'bb cc th x' }
    })
    expect(Comp.find('li.dnb-drawer-list__option').at(0).text()).toBe(
      mockData[1]
    )
    expect(Comp.find('li.dnb-drawer-list__option').at(0).html()).toBe(
      /* @html */ `<li class="first-of-type dnb-drawer-list__option" role="option" tabindex="-1" aria-selected="false" data-item="1" id="option-autocomplete-id-1"><span class="dnb-drawer-list__option__inner"><span><span class="dnb-drawer-list__option__item--highlight">BB</span> <span class="dnb-drawer-list__option__item--highlight">cc</span> ze<span class="dnb-drawer-list__option__item--highlight"><span class="dnb-drawer-list__option__item--highlight">th</span></span><span class="dnb-drawer-list__option__item--highlight"><span class="dnb-drawer-list__option__item--highlight">x</span></span></span></span></li>`
    )

    keydown(Comp, 40) // down
    expect(
      Comp.find('li.dnb-drawer-list__option--focus').at(0).html()
    ).toBe(
      /* @html */ `<li class="first-of-type dnb-drawer-list__option dnb-drawer-list__option--focus" role="option" tabindex="-1" aria-selected="true" data-item="1" id="option-autocomplete-id-1"><span class="dnb-drawer-list__option__inner"><span><span class="dnb-drawer-list__option__item--highlight">BB</span> <span class="dnb-drawer-list__option__item--highlight">cc</span> ze<span class="dnb-drawer-list__option__item--highlight"><span class="dnb-drawer-list__option__item--highlight">th</span></span><span class="dnb-drawer-list__option__item--highlight"><span class="dnb-drawer-list__option__item--highlight">x</span></span></span></span></li>`
    )

    // check "invalid"
    Comp.find('.dnb-input__input').simulate('change', {
      target: { value: 'invalid' }
    })
    expect(Comp.find('li.dnb-drawer-list__option').at(0).text()).toBe(
      'Ingen alternativer'
    )
  })

  it('has correct options after filter and key interaction', () => {
    const Comp = mount(
      <Component id="autocomplete-id" data={mockData} show_drawer_button />
    )

    open(Comp)

    // check "cc"
    Comp.find('.dnb-input__input').simulate('change', {
      target: { value: 'cc' }
    })
    expect(Comp.find('li.dnb-drawer-list__option').at(0).text()).toBe(
      mockData[1]
    )
    expect(
      Comp.find(
        'li.dnb-drawer-list__option:not(.dnb-autocomplete__show-all)'
      ).length
    ).toBe(2)
    expect(Comp.find('li.dnb-drawer-list__option--focus').exists()).toBe(
      false
    )

    // then simulate changes
    keydown(Comp, 40) // down

    expect(
      Comp.find('li.dnb-drawer-list__option')
        .at(0)
        .hasClass('dnb-drawer-list__option--focus')
    ).toBe(true)

    // then simulate changes
    keydown(Comp, 40) // down

    expect(
      Comp.find('li.dnb-drawer-list__option')
        .at(1)
        .hasClass('dnb-drawer-list__option--focus')
    ).toBe(true)
    expect(
      Comp.find('li.dnb-drawer-list__option')
        .at(1)
        .instance()
        .getAttribute('id')
    ).toBe(
      Comp.find('.dnb-input__input')
        .instance()
        .getAttribute('aria-activedescendant')
    )

    // check "cc b"
    Comp.find('.dnb-input__input').simulate('change', {
      target: { value: 'cc bb' }
    })
    expect(
      Comp.find(
        'li.dnb-drawer-list__option:not(.dnb-autocomplete__show-all)'
      ).length
    ).toBe(2)
    expect(Comp.find('li.dnb-autocomplete__show-all').text()).toBe(
      'Vis alt'
    )
    expect(Comp.find('li.dnb-drawer-list__option').length).toBe(3)

    let elem
    elem = Comp.find('li.dnb-drawer-list__option').at(1)
    expect(elem.text()).toBe(mockData[2])
    expect(elem.instance().getAttribute('aria-selected')).toBe('true')

    // remove selection and reset the order and open again
    // aria-selected should now be on place 2
    keydown(Comp, 27) // esc
    open(Comp)

    elem = Comp.find('li.dnb-drawer-list__option').at(2)
    expect(elem.text()).toBe(mockData[2])
    expect(elem.instance().getAttribute('aria-selected')).toBe('true')
  })

  it('has correct options after filter if filter is disabled', () => {
    const Comp = mount(
      <Component
        id="autocomplete-id"
        disable_filter
        data={mockData}
        show_drawer_button
      />
    )

    open(Comp)

    Comp.find('.dnb-input__input').simulate('change', {
      target: { value: 'aa' }
    })
    expect(
      Comp.find(
        'li.dnb-drawer-list__option:not(.dnb-autocomplete__show-all)'
      ).length
    ).toBe(3)
  })

  it('has correct "aria-expanded"', () => {
    const Comp = mount(<Component {...props} data={mockData} />)

    keydown(Comp, 13) // enter

    const elem = Comp.find('.dnb-autocomplete')
    expect(
      elem.find('button').instance().getAttribute('aria-expanded')
    ).toBe('true')
  })

  it('has correct "opened" state', () => {
    const Comp = mount(<Component {...props} data={mockData} />)

    open(Comp)

    const elem = Comp.find('.dnb-autocomplete')

    expect(elem.hasClass('dnb-autocomplete--opened')).toBe(true)
  })

  it('has correct length of li elements', () => {
    const Comp = mount(<Component {...props} data={mockData} />)

    open(Comp)

    expect(
      Comp.find(
        'li.dnb-drawer-list__option:not(.dnb-autocomplete__show-all)'
      ).length
    ).toBe(mockData.length)
  })

  it('has to return all additional attributes the event return', () => {
    const on_show = jest.fn()
    const params = { 'data-attr': 'value' }
    const Comp = mount(
      <Component
        no_animation
        on_show={on_show}
        {...params}
        data={mockData}
        show_drawer_button
      />
    )
    open(Comp)
    expect(on_show.mock.calls.length).toBe(1)
    expect(on_show.mock.calls[0][0].attributes).toMatchObject(params)
  })

  it('has correct selected value', () => {
    const Comp = mount(<Component {...props} data={mockData} />)
    expect(Comp.find('.dnb-input__input').instance().value).toBe(
      mockData[props.value]
    )
  })

  it('has correct selected value after new selection', () => {
    const Comp = mount(<Component {...props} data={mockData} />)
    open(Comp)

    // then simulate changes
    keydown(Comp, 40) // down

    expect(Comp.find('.dnb-input__input').instance().value).toBe(
      mockData[props.value]
    )
  })

  it('has a default title if no value is given', () => {
    const title = 'Make a selection'
    const Comp = mount(
      <Component
        id="autocomplete-id"
        data={mockData}
        title={title}
        show_drawer_button
      />
    )
    expect(Comp.find('.dnb-input__placeholder').text()).toBe(title)
  })

  it('has a corret value content if we send in a React component', () => {
    const value = 1
    const Comp = mount(
      <Component
        id="autocomplete-id"
        data={mockData}
        value={value}
        show_drawer_button
      />
    )
    expect(Comp.find('.dnb-input__input').instance().value).toBe(
      mockData[value]
    )
  })

  it('has a disabled attribute, once we set disabled to true', () => {
    const Comp = mount(
      <Component id="autocomplete-id" data={mockData} show_drawer_button />
    )
    Comp.setProps({
      disabled: true
    })
    expect(
      Comp.find('button.dnb-input__submit-button__button')
        .instance()
        .hasAttribute('disabled')
    ).toBe(true)
  })
})

describe('Autocomplete markup', () => {
  const CheckComponent = mount(
    <Component {...snapshotProps} data={mockData} />
  )

  // compare the snapshot
  it('have to match snapshot', () => {
    expect(toJson(CheckComponent)).toMatchSnapshot()
  })

  it('should validate with ARIA rules as a tabs', async () => {
    expect(
      await axeComponent(CheckComponent, {
        rules: {
          'aria-valid-attr-value': { enabled: false }
        }
      })
    ).toHaveNoViolations()
  })
})

describe('Autocomplete scss', () => {
  it('have to match snapshot', () => {
    const scss = loadScss(
      require.resolve('../style/dnb-autocomplete.scss')
    )
    expect(scss).toMatchSnapshot()
  })
  it('have to match default theme snapshot', () => {
    const scss = loadScss(
      require.resolve('../style/themes/dnb-autocomplete-theme-ui.scss')
    )
    expect(scss).toMatchSnapshot()
  })
})

const keydown = (Comp, keyCode) => {
  document.dispatchEvent(new KeyboardEvent('keydown', { keyCode }))

  Comp.find('.dnb-input__input').simulate('keydown', {
    keyCode
  })
}
const open = (Comp) => {
  Comp.find('button.dnb-input__submit-button__button').simulate('click')
}
