/**
 * Page Component
 *
 */

import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'gatsby'
import classnames from 'classnames'
import styled from '@emotion/styled'
import { Global } from '@emotion/core'
import MainMenu from '../menu/MainMenu'
import Sidebar from '../menu/SidebarMenu'
import StickyMenuBar from '../menu/StickyMenuBar'
import { markdownStyle } from './Markdown'
import { buildVersion } from '../../../package.json'
import { MainMenuProvider } from '../menu/MainMenuContext'
import { SidebarMenuProvider } from '../menu/SidebarMenuContext'
import ToggleGrid from '../menu/ToggleGrid'
import {
  setPageFocusElement,
  scrollToLocationHashId
} from 'dnb-ui-lib/src/shared/helpers'
import { Context } from 'dnb-ui-lib/src/shared'
import { Logo, GlobalStatus } from 'dnb-ui-lib/src/components'
import { createSkeletonClass } from 'dnb-ui-lib/src/components/skeleton/SkeletonHelper'

export function scrollToAnimation() {
  // if url hash is defined, scroll to the id
  scrollToLocationHashId({
    offset: 100,
    delay: 100,
    onCompletion: (elem) => {
      try {
        // elem.classList.add('focus')// run link-attention-focus animation
        elem.parentElement.classList.add('focus') // run parent-attention-focus animation
      } catch (e) {
        //
      }
    }
  })
}

class Layout extends React.PureComponent {
  static propTypes = {
    fullscreen: PropTypes.bool,
    children: PropTypes.node.isRequired,
    location: PropTypes.object.isRequired
  }

  static defaultProps = {
    fullscreen: false
  }

  constructor(props) {
    super(props)
    this._mainRef = React.createRef()
    this.state = { fullscreen: props.fullscreen }
  }

  componentDidMount() {
    // gets applied on "onRouteUpdate"
    setPageFocusElement('.dnb-app-content h1:nth-of-type(1)', 'content')

    scrollToAnimation()
  }

  skipToContentHandler = (event) => {
    // because we want to avoid that the hash get's set (#dnb-app-content)
    // we prevent the default and set it manually. The DOM elements have tabIndex="-1" and className="dnb-no-focus" in place
    try {
      event.preventDefault()
      const elem = this._mainRef.current
      elem.setAttribute('tabindex', '-1')
      elem.focus()
      elem.removeAttribute('tabindex') // don't keep tabindex arround, Chrome fucks up the selection / focus feature
    } catch (e) {
      console.warn(e)
    }
  }

  isFullscreen() {
    const { location, fullscreen } = this.props
    return (
      fullscreen ||
      (typeof location !== 'undefined' &&
        /fullscreen/.test(location.search))
    )
  }

  render() {
    const { children, location } = this.props

    const fs = this.state.fullscreen || this.isFullscreen()

    return (
      <MainMenuProvider>
        <SidebarMenuProvider>
          <a
            className="dnb-skip-link"
            href="#dnb-app-content"
            onClick={this.skipToContentHandler}
          >
            Skip to content
          </a>

          <ToggleSkeleton>
            {!fs && <StickyMenuBar />}
            {!fs && <MainMenu enableOverlay />}

            <Wrapper className="content-wrapper">
              {!fs && <Sidebar location={location} showAll={false} />}

              <Content fullscreen={fs}>
                <MainContent ref={this._mainRef}>
                  <GlobalStatus id="main-status" />
                  <div className="dev-grid">{children}</div>
                </MainContent>
                <Footer />
              </Content>

              {fs && <ToggleGrid hidden />}
            </Wrapper>
          </ToggleSkeleton>
        </SidebarMenuProvider>
      </MainMenuProvider>
    )
  }
}

export default Layout

const Wrapper = styled.div`
  position: relative;
  z-index: 2;

  display: flex;
  justify-content: space-between; /* pos Footer at the bottom */

  @media screen and (max-width: 50em) {
    display: block;
  }
`

const Content = ({ className, fullscreen, children }) => (
  <ContentWrapper
    className={classnames(
      'dnb-app-content',
      fullscreen && 'fullscreen-page',
      className
    )}
  >
    <Global styles={markdownStyle} />
    {children}
  </ContentWrapper>
)
Content.propTypes = {
  fullscreen: PropTypes.bool.isRequired,
  children: PropTypes.node.isRequired,
  className: PropTypes.string
}
Content.defaultProps = {
  className: null
}

const ContentWrapper = styled.div`
  position: relative;
  z-index: 2; /* heigher than styled.aside */

  width: 100%;

  margin-left: 30vw; /* fallback */
  margin-left: var(--aside-width);
  padding: 0;

  /* we use padding here, insted of margin,
  because applyPageFocus is else scrolling the page unwanted
  height of StickyMenuBar - 1px border */
  padding-top: 4rem;

  .dnb-app-content {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;

    min-height: calc(100vh - 4rem); /* height of StickyMenuBar */
    padding: 2rem 5vw 2rem;
  }

  background-color: var(--color-black-background);
  border-left: 1px solid var(--color-black-border);

  /* make sure that Sidebar aside "styled.aside" gets the same max-width */
  @media screen and (max-width: 50em) {
    margin-left: 0;
    padding-left: 0;
  }

  &.fullscreen-page {
    margin: 0;
    padding-top: 0;
    border: none;
  }

  /* for wider screens */
  &:not(.fullscreen-page) {
    .dnb-app-content > div:first-of-type {
      @media screen and (min-width: 70em) {
        max-width: 70rem;
      }
    }
  }
`

const MainContent = React.forwardRef((props, ref) => (
  <StyledMain
    ref={ref}
    role="main"
    id="dnb-app-content"
    className="dnb-no-focus dnb-spacing"
    {...props}
  />
))

const StyledMain = styled.main`
  width: 100%;
  min-height: 85vh;
  padding: 0 2rem;
`

const FooterWrapper = styled.footer`
  position: relative;
  z-index: 2; /* 1 higher than aside */

  display: flex;
  align-items: center;
  justify-content: space-between;

  padding: 1rem;

  border-top: 1px solid var(--color-black-border);
  background-color: var(--color-emerald-green);
  color: var(--color-white);

  a {
    margin-left: 0.5rem;
  }
  small {
    padding: 0 2rem;
  }

  .toggle-grid {
    margin-left: 1rem;
  }
`
const Footer = () => {
  const { skeleton } = React.useContext(Context)
  return (
    <FooterWrapper>
      <Logo height="40" color="white" />
      <small className={createSkeletonClass('font', skeleton)}>
        Last Portal update: {buildVersion}
        <Link
          to="/license"
          className="dnb-anchor dnb-anchor--contrast dnb-anchor--no-underline"
        >
          Copyright (c) 2018-present DNB.no
        </Link>
      </small>
      <span />
    </FooterWrapper>
  )
}

let skeletonCount = 0
let skeletonTimeout = null
function ToggleSkeleton(props) {
  const { update, skeleton } = React.useContext(Context)

  const params = {
    onMouseDown: (e) => {
      const x = e.clientX
      const y = e.clientY
      if (x < 20 && y < 20) {
        e.preventDefault()
        e.stopPropagation()
        skeletonCount++
        clearTimeout(skeletonTimeout)
        skeletonTimeout = setTimeout(() => {
          skeletonCount = 0
        }, 1e3)
        if (skeletonCount >= 3) {
          skeletonCount = 0
          update({ skeleton: !skeleton })
          setSkeletonEnabled(!skeleton)
        }
      }
    }
  }

  return (
    <div
      key="skeleton"
      className="skeleton-enabler"
      {...params}
      {...props}
    />
  )
}

export function setSkeletonEnabled(skeleton) {
  try {
    window.localStorage.setItem(
      'skeleton-enabled',
      skeleton ? true : false
    )
  } catch (e) {
    //
  }
}
