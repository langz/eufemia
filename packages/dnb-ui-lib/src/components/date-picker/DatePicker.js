/**
 * Web DatePicker Component
 *
 */

import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
// import {
//   registerElement,
//   validateDOMAttributes,
//   processChildren,
//   dispatchCustomElementEvent
// } from '../../shared/component-helper'
import DatePickerRange from './DatePickerRange'
import DatePickerInput from './DatePickerInput'
import DatePickerFooter from './DatePickerFooter'

const renderProps = {
  on_change: null
}

export const propTypes = {
  mask: PropTypes.string,
  label: PropTypes.string
}

export const defaultProps = {
  mask: 'dd/mm/yyyy',
  label: null,
  ...renderProps
}

export default class DatePicker extends PureComponent {
  static tagName = 'dnb-date-picker'
  static propTypes = propTypes
  static defaultProps = defaultProps
  static renderProps = renderProps

  // static enableWebComponent() {
  //   registerElement(DatePicker.tagName, DatePicker, defaultProps)
  // }

  state = {
    pickerIsVisible: false,
    startDate: null,
    endDate: null
  }

  constructor(props) {
    super(props)

    const separators = props.mask.match(/[^mdy]/g)
    this.maskList = props.mask.split(/[^mdy]/).reduce((acc, cur) => {
      acc.push(cur)
      if (separators.length > 0) {
        acc.push(separators.shift())
      }
      return acc
    }, [])

    // this.dayRef = React.createRef()
  }

  onInputChange = ({ startDate, endDate }) => {
    if (startDate)
      this.setState({
        startDate
      })
    if (endDate)
      this.setState({
        endDate
      })
  }

  onPickerChange = ({ startDate, endDate }) => {
    this.setState({
      startDate,
      endDate
    })
  }

  showPicker = () => {
    this.setState({
      pickerIsVisible: true
    })
  }

  hidePicker = () => {
    this.setState({
      pickerIsVisible: false
    })
  }

  togglePicker = () => {
    const pickerIsVisible = !this.state.pickerIsVisible
    this.setState({
      pickerIsVisible
    })
  }

  render() {
    return (
      <span className="dnb-date-picker">
        <DatePickerInput
          label={this.props.label}
          onChange={this.onInputChange}
          onFocus={this.showPicker}
          onSubmit={this.togglePicker}
          startDate={this.state.startDate}
          endDate={this.state.endDate}
        />
        {this.state.pickerIsVisible && (
          <>
            <DatePickerRange
              onChange={this.onPickerChange}
              startDate={this.state.startDate}
              endDate={this.state.endDate}
            />
            <DatePickerFooter
              onCancel={this.hidePicker}
              onSubmit={this.hidePicker}
            />
          </>
        )}
      </span>
    )
  }
}