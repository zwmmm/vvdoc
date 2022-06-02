import { makeTheme } from '@theme-ui/css/utils'
import { system } from '@theme-ui/presets'
import prism from '@theme-ui/prism/presets/dracula.json'
import { merge } from 'theme-ui'

const theme = makeTheme({
  colors: {
    modes: {
      dark: {
        primary: '#1976d2',
        muted: '#303030',
        background: '#141414',
        highlight: '#2c2c29',
      },
    },
  },
  layout: {
    container: {
      px: 3,
      maxWidth: 1440,
    },
  },
  styles: {
    p: {
      margin: '0',
      marginBottom: '1.4em',
    },
    ul: {
      pl: '2em',
    },
    li: {
      pl: '0.2em',
      '::marker': {
        color: 'primary',
      },
    },
    code: {
      fontFamily: 'monospace',
      fontSize: 1,
    },
    pre: {
      p: 3,
      fontSize: 1,
      borderRadius: 12,
      ...prism,
    },
    h2: {
      borderBottom: '1px solid',
      borderColor: 'muted',
      pb: 2,
    },
  },
})

export default merge(system, theme)
