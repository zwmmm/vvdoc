import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App'
import { ThemeProvider } from 'theme-ui'
import theme from './theme/index'
import components from './theme/components'

const Main = import.meta.globEager('/index.tsx')['/index.tsx']?.default || DefaultMain

function DefaultMain(props: any) {
  return props.children
}
const root = ReactDOM.createRoot(document.getElementById('app') as HTMLElement)
root.render(
  <ThemeProvider theme={theme} components={components}>
    <BrowserRouter>
      <Main>
        <App/>
      </Main>
    </BrowserRouter>
  </ThemeProvider>
)
