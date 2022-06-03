import Prism from '@theme-ui/prism'
import React from 'react'
import { Alert, Message } from 'theme-ui'
import Blockquote from '../components/Blockquote'
import Playground from '../components/Playground'
import { HeaderLink } from '../Layout/HeaderLink'
import { Wrapper } from '../Layout/Wrapper'

interface HeadingProps {
  children?: React.ReactNode
  href?: string
  id: string
}

const context = {
  index: 1,
}

const components = {
  blockquote: Blockquote,
  pre: ({ children }: { children: React.ReactNode }) => <>{children}</>,
  code: Prism,
  Message,
  Alert,
  Playground,
  wrapper: Wrapper,
  h2: ({ children, ...props }: HeadingProps) => (
    <HeaderLink tag="h2" context={context} {...props}>
      {children}
    </HeaderLink>
  ),
  h3: ({ children, ...props }: HeadingProps) => (
    <HeaderLink tag="h3" context={context} {...props}>
      {children}
    </HeaderLink>
  ),
  h4: ({ children, ...props }: HeadingProps) => (
    <HeaderLink tag="h4" context={context} {...props}>
      {children}
    </HeaderLink>
  ),
  h5: ({ children, ...props }: HeadingProps) => (
    <HeaderLink tag="h5" context={context} {...props}>
      {children}
    </HeaderLink>
  ),
  h6: ({ children, ...props }: HeadingProps) => (
    <HeaderLink tag="h6" context={context} {...props}>
      {children}
    </HeaderLink>
  ),
}

export default components
