import { default as _config } from '@config';

export let config = _config

if (import.meta.hot) {
  import.meta.hot!.accept('/@siteData', (m) => {
    config = m.default
  })
}