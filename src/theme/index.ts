import { system } from '@theme-ui/presets'
import { merge } from 'theme-ui'

export default merge(system, {
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
    ul: {
      paddingLeft: '1em'
    },
    p: {
      margin: '0',
      marginBottom: '1.4em'
    }
  }
})
