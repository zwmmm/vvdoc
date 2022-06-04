import { lighten } from '@theme-ui/color'
import { makeTheme } from '@theme-ui/css/utils'
import { system } from '@theme-ui/presets'
import dark from '@theme-ui/prism/presets/dracula.json'
import light from '@theme-ui/prism/presets/prism.json'
import { merge, useColorMode } from 'theme-ui'
import { config } from '../config'

const theme = merge(
  makeTheme({
    colors: {
      modes: {
        dark: {
          primary: '#5468ff',
          muted: '#303030',
          background: '#111',
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
        '--docsearch-text-color': (t) => `${t.colors?.gray} !important`,
        '--docsearch-muted-color': (t) => `${t.colors?.gray} !important`,
        '--docsearch-primary-color': (t) => `${t.colors?.primary}!important`,
        '--docsearch-logo-color': (t) => `${t.colors?.primary}!important`,
        '--docsearch-key-gradient': (t) => `transparent !important`,
        '--docsearch-searchbox-background': (t) =>
          `${t.colors?.muted}!important`,
        '--docsearch-modal-shadow': (t) => `none !important`,
        '--docsearch-footer-shadow': (t) => `none !important`,
        '--docsearch-footer-background': (t) => `${t.colors?.muted}!important`,
        '--docsearch-modal-background': (t) =>
          `${t.colors?.background}!important`,
        '--docsearch-searchbox-focus-background': (t) =>
          `${t.colors?.muted}!important`,
        fontFamily:
          'ui-sans-serif,system-ui,-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica Neue,Arial,Noto Sans,sans-serif,Apple Color Emoji,Segoe UI Emoji,Segoe UI Symbol,Noto Color Emoji',
        '& .DocSearch-Button-Key': {
          boxShadow: 'none',
          display: 'block',
          margin: '2px 0 0',
          border: (t) => `1px solid ${t.colors?.gray}`,
          borderRight: 'none',
          borderRadius: `4px 0 0 4px`,
          pl: '6px',
          minWidth: 0,
          width: 'auto',
          height: 22,
          lineHeight: `22px`,
          fontSize: 0,
          transition: `color .5s,border-color .5s`,
          fontFamily:
            'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif',
        },
        '& .DocSearch-Button-Key + .DocSearch-Button-Key': {
          borderRight: (t) => `1px solid ${t.colors?.gray}`,
          borderLeft: 'none',
          borderRadius: `0 4px 4px 0`,
          pl: '2px',
          pr: '6px',
        },
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
        p: 1,
        background: 'muted',
        borderRadius: 6,
      },
      pre: {
        background: 'muted',
        p: `6px 0px !important`,
        fontSize: 1,
        borderRadius: 12,
        '.token-line': {
          pl: 3,
          borderLeft: '2px solid transparent',
        },
        '.token-line.highlight': {
          background: `rgba(200, 200, 255, .1)`,
          borderLeftColor: 'primary',
        },
        // @ts-ignore
        variant: () => {
          const [mode] = useColorMode()
          return `prism.${mode}`
        },
      },
      h2: {
        borderBottom: '1px solid',
        borderColor: 'muted',
        pb: 2,
        mt: 40,
      },
    },
    prism: {
      dark,
      light,
    },
  }),
  config?.theme?.styles || {}
)

export default merge(system, theme)
