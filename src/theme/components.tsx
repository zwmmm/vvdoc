import React from 'react'
import Prism from '@theme-ui/prism'
import { Alert, Message } from 'theme-ui'
import Blockquote from '../components/Blockquote'
import Playground from '../components/Playground'

const components = {
  blockquote: Blockquote,
  pre: ({ children }: { children: React.ReactNode }) => <>{children}</>,
  code: Prism,
  Message,
  Alert,
  Playground
}

export default components
