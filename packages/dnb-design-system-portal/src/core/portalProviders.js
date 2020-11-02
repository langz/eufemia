/**
 * Global Portal providers
 *
 */

import React from 'react'
import PropTypes from 'prop-types'

import { CacheProvider } from '@emotion/core'
import createEmotionCache from '@emotion/cache'

import { Provider as EufemiaProvider } from 'dnb-ui-lib/src/shared'
import stylisPlugin from 'dnb-ui-lib/src/style/stylis'
import { isTrue } from 'dnb-ui-lib/src/shared/component-helper'

import cssVars from 'css-vars-ponyfill'

// run the polyfill because of the dynamic menu changes
cssVars()

const emotionCache = createEmotionCache({
  stylisPlugins: [stylisPlugin]
})

// Optional, use a Provider
export const rootElement = ({ element }) => {
  return (
    <CacheProvider value={emotionCache}>
      <EufemiaProvider
        skeleton={getSkeletonEnabled()} // To simulate a whole page skeleton
        locale={getLang()}
      >
        {element}
      </EufemiaProvider>
    </CacheProvider>
  )
}
rootElement.propTypes = {
  element: PropTypes.node.isRequired
}

export function getLang(locale = 'nb-NO') {
  try {
    const l = window.localStorage.getItem('locale')
    if (l) {
      locale = l
    }
  } catch (e) {
    //
  }
  return locale
}
export function setLang(locale) {
  try {
    window.localStorage.setItem('locale', locale)
  } catch (e) {
    //
  }
}

const isTest = () => typeof window !== 'undefined' && window.IS_TEST
export function getSkeletonEnabled() {
  if (isTest()) {
    return false
  }
  try {
    return isTrue(window.localStorage.getItem('skeleton-enabled'))
  } catch (e) {
    //
  }
  return false
}
