/**
 * All inline tags for Markdown
 */

import React from 'react'
import CodeBlock from './CodeBlock'
import { Checkbox, Input } from 'dnb-ui-lib/src/components'
import {
  Ul,
  Ol,
  Dl,
  P,
  Hr,
  Blockquote,
  Code
} from 'dnb-ui-lib/src/elements'
import Table from './Table'
// import Img from './Img'
// import Tag from './Tag' // use it like so: <Tag is="p" {...props} />
import Tabbar from './Tabbar'
import Anchor from './Anchor'
import Intro, { IntroFooter } from './Intro'
import Header from './AutoLinkHeader'
import Copy from './Copy'

export default {
  Copy,
  Intro,
  IntroFooter,
  Tabbar,
  // img: Img, // -> <figure> cannot appear as a descendant of <p>
  h1: (props) => <Header level="1" {...props} />,
  h2: (props) => <Header level="2" {...props} />,
  h3: (props) => <Header level="3" {...props} />,
  h4: (props) => <Header level="4" {...props} />,
  h5: (props) => <Header level="5" {...props} />,
  h6: (props) => <Header level="6" {...props} />,
  a: Anchor,
  link: Anchor,
  // eslint-disable-next-line
  input: ({ type, ...rest }) => {
    switch (type) {
      case 'checkbox':
        return <Checkbox {...rest} disabled={false} />
      default:
        return <Input {...rest} />
    }
  },
  table: Table,
  code: (...args) => CodeBlock(...args),
  inlineCode: ({ ...props }) => {
    if (props.inline) {
      props.inline = props.inline.toString()
    }
    return (
      <Copy>
        <Code {...props} />
      </Copy>
    )
  },
  ul: (props) => <Ul {...props} />,
  ol: (props) => <Ol {...props} />,
  dl: (props) => <Dl {...props} />,
  p: (props) => <P {...props} />,
  paragraph: (props) => <P {...props} />,
  blockquote: (props) => <Blockquote {...props} />,
  hr: (props) => <Hr light {...props} />
}
