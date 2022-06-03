import { makeTheme } from '@theme-ui/css/utils'
import { system } from '@theme-ui/presets'
import prism from '@theme-ui/prism/presets/dracula.json'
import { merge } from 'theme-ui'
import { lighten } from '@theme-ui/color'

const theme = makeTheme({
  colors: {
    modes: {
      dark: {
        primary: '#5468ff',
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
    root: {
      fontFamily:
        'ui-sans-serif,system-ui,-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica Neue,Arial,Noto Sans,sans-serif,Apple Color Emoji,Segoe UI Emoji,Segoe UI Symbol,Noto Color Emoji',
    },
    a: {
      px: 1,
      textDecoration: 'none',
      '&:hover': {
        color: lighten('primary', 0.05),
      },
    },
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
      mt: 40,
    },
  },
})

export default merge(system, theme)
