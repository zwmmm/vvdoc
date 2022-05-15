import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import App from './App'
import { ThemeProvider } from 'theme-ui'
import theme from './theme/index'
import components from './theme/components'


function defaultMain(props: any) {
  return props.children
}

const Main = defaultMain

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
