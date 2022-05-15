import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import App from './App'
import { ThemeProvider } from 'theme-ui'
import theme from './theme/index'
import components from './theme/components'

const mains = Object.values(import.meta.globEager('@root/index.tsx'))

function defaultMain(props: any) {
  return props.children
}

function render(_Main: any) {
  const Main = _Main || defaultMain
  ReactDOM.render(
    <ThemeProvider theme={theme} components={components}>
      <BrowserRouter>
        <Main>
          <App/>
        </Main>
      </BrowserRouter>
    </ThemeProvider>,
    document.getElementById('root')
  )
}
render(mains[0]?.default)
