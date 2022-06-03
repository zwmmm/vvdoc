import React from 'react'
import Prism from '@theme-ui/prism'
import { Alert, Message } from 'theme-ui'
import Blockquote from '../components/Blockquote'
import Playground from '../components/Playground'
import { Wrapper } from '../Layout/Wrapper'

const components = {
  blockquote: Blockquote,
  pre: ({ children }: { children: React.ReactNode }) => <>{children}</>,
  code: Prism,
  Message,
  Alert,
  Playground,
  wrapper: Wrapper,
}

export default components
