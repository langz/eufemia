/**
 * HTML Element
 *
 */

import React from 'react'
import E from './Element'
import PropTypes from 'prop-types'
import classnames from 'classnames'

const Ol = ({ nested, inside, outside, ...p } = {}) => {
  if (nested) {
    p.className = classnames(p.className, 'dnb-ol--nested')
  }
  if (inside) {
    p.className = classnames(p.className, 'dnb-ol--inside')
  }
  if (outside) {
    p.className = classnames(p.className, 'dnb-ol--outside')
  }

  return <E is="ul" {...p} />
}
Ol.tagName = 'dnb-ol'
Ol.propTypes = {
  className: PropTypes.string,
  inside: PropTypes.bool,
  outside: PropTypes.bool,
  nested: PropTypes.bool
}
Ol.defaultProps = {
  className: null,
  inside: null,
  outside: null,
  nested: null
}
export default Ol
