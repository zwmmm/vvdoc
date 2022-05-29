import { system } from '@theme-ui/presets'
import { merge } from 'theme-ui'
import prism from '@theme-ui/prism/presets/dracula.json'
import { makeTheme } from '@theme-ui/css/utils'

const theme = makeTheme({
  colors: {
    modes: {
      dark: {
        muted: '#303030',
        background: '#141414',
        highlight: '#2c2c29'
      }
    }
  },
  layout: {
    container: {
      maxWidth: 1180
    }
  },
  styles: {
    p: {
      margin: '0',
      marginBottom: '1.4em'
    },
    ul: {
      pl: '2em',
    },
    li: {
      pl: '0.2em',
      '::marker': {
        color: 'primary'
      }
    },
    code: {
      fontFamily: 'monospace',
      fontSize: 1,
    },
    pre: {
      p: 2,
      fontSize: 1,
      ...prism
    }
  }
})

export default merge(system, theme)
