/**
 * Component Test
 *
 */

import React from 'react'
import {
  mount,
  fakeProps,
  toJson,
  loadScss
} from '../../../core/jest/jestSetup'
import Component from '../Space'

// just to make sure we re-run the test in watch mode due to changes in theese files
import _form_row from '../style/_space.scss' // eslint-disable-line
import dnb_form_row from '../style/dnb-space.scss' // eslint-disable-line
import dnb_form_row_theme_ui from '../style/themes/dnb-space-theme-ui.scss' // eslint-disable-line

const snapshotProps = fakeProps(require.resolve('../Space'), {
  optional: true
})
snapshotProps.id = 'space'
snapshotProps.element = 'div'
snapshotProps.no_collapse = false

describe('Space component', () => {
  it('have to match snapshot', () => {
    const Comp = mount(<Component {...snapshotProps} />)
    expect(toJson(Comp)).toMatchSnapshot()
  })

  it('should have correct CSS classes', () => {
    const Comp = mount(<Component element="span" top="large" />)
    expect(
      Comp.find('span.dnb-space').hasClass('dnb-space__top--large')
    ).toBe(true)
  })

  it('should have collapse CSS classe', () => {
    const Comp = mount(<Component top="large" no_collapse={true} />)
    expect(Comp.find('.dnb-space--no-collapse').exists()).toBe(true)
  })
})

describe('Space scss', () => {
  it('have to match snapshot', () => {
    const scss = loadScss(require.resolve('../style/dnb-space.scss'))
    expect(scss).toMatchSnapshot()
  })
  it('have to match default theme snapshot', () => {
    const scss = loadScss(
      require.resolve('../style/themes/dnb-space-theme-ui.scss')
    )
    expect(scss).toMatchSnapshot()
  })
})
