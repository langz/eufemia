/**
 * HTML Element
 *
 */

import React from 'react'
import PropTypes from 'prop-types'
import { warn, isTrue, registerElement } from '../shared/component-helper'

import E from './Element'

const renderProps = {}

const propTypes = {
  sticky: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  sticky_offset: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),

  children: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.object,
    PropTypes.func
  ])
}

const defaultProps = {
  sticky: false,
  sticky_offset: null,

  // React props
  children: null,

  // Web Component props
  ...renderProps
}

export const StickyHelper = () => {
  return (
    <tr className="dnb-table__sticky-helper">
      <td />
    </tr>
  )
}

export default class Table extends React.PureComponent {
  static tagName = 'dnb-table'
  static propTypes = propTypes
  static defaultProps = defaultProps
  static renderProps = renderProps

  static enableWebComponent() {
    registerElement(Table.tagName, Table, defaultProps)
  }

  constructor(props) {
    super(props)

    this._ref = React.createRef()
  }

  componentDidMount() {
    if (isTrue(this.props.sticky)) {
      this.init()
    }
  }

  init = () => {
    this.enableStickyHeader()

    if (this.intersectionObserver && this._ref.current) {
      try {
        const tableElem = this._ref.current
        const trElem = tableElem.querySelector('thead > tr:first-of-type')
        trElem.classList.add('sticky')
        const tdElem =
          tableElem.querySelector(
            'tbody > tr.dnb-table__sticky-helper > td:first-of-type'
          ) || this.getTdElement(tableElem)
        if (tdElem) {
          this.intersectionObserver?.observe(tdElem)
        }
      } catch (e) {
        this.stickyWarning(e)
      }
    }
  }

  componentWillUnmount() {
    this.intersectionObserver?.disconnect()
  }

  getTdElement(e) {
    return e.querySelector(
      'tbody > tr:not(.dnb-table__sticky-helper):first-of-type > td:first-of-type, tbody > .dnb-table__tr:first-of-type > .dnb-table__td:first-of-type'
    )
  }
  getThElement(e) {
    return e.querySelector(
      'thead > tr:first-of-type > th:first-of-type, thead > .dnb-table__tr:first-of-type > .dnb-table__th:first-of-type'
    )
  }

  enableStickyHeader() {
    if (
      !(
        typeof window !== 'undefined' &&
        typeof IntersectionObserver !== 'undefined' &&
        this._ref.current
      )
    ) {
      return // stop here
    }

    const tableElem = this._ref.current
    const trElem = tableElem.querySelector(
      'thead > tr:first-of-type, thead > .dnb-table__tr:first-of-type'
    )

    const thElem = this.getThElement(tableElem)
    const tdElem = this.getTdElement(tableElem)
    let thHeight = 80
    let tdHeight = 64
    let offsetTop = 0

    try {
      offsetTop = parseFloat(this.props.sticky_offset) || offsetTop

      if (offsetTop > 0) {
        if (
          typeof this.props.sticky_offset === 'string' &&
          String(this.props.sticky_offset).includes('em')
        ) {
          offsetTop = offsetTop * 16
        }
        trElem.style.top = this.props.sticky_offset //use it as a string here
      }

      thHeight =
        (thElem && parseFloat(window.getComputedStyle(thElem).height)) ||
        thHeight
      tdHeight =
        (tdElem && parseFloat(window.getComputedStyle(tdElem).height)) ||
        tdHeight
    } catch (e) {
      this.stickyWarning(e)
    }
    const marginTop = thHeight + tdHeight + offsetTop

    this.intersectionObserver = new IntersectionObserver(
      (entries) => {
        const [entry] = entries
        try {
          // console.log('entry.isIntersecting', entry.isIntersecting, trElem)
          if (entry.isIntersecting) {
            trElem.classList.remove('show-shadow')
          } else {
            trElem.classList.add('show-shadow')
          }
        } catch (e) {
          this.stickyWarning(e)
        }
      },
      {
        rootMargin: `-${marginTop}px 0px 0px 0px`
      }
    )
  }

  stickyWarning(e = '') {
    warn('Could not enable Sticky mode in table:', e)
  }

  render() {
    const {
      sticky, // eslint-disable-line

      ...props
    } = this.props

    return <E is="table" {...props} ref={this._ref} />
  }
}

Table.StickyHelper = StickyHelper
