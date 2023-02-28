import 'antd/dist/antd.css'
import React from 'react'
import { createRoot } from 'react-dom/client'
import { createGlobalStyle } from 'styled-components'
import App from '@/App'

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
  }
`

const PluginRender = () => {

  return (
    <React.Fragment>
      <GlobalStyle />
      <App />
    </React.Fragment>
  )
}

export default () => {

  createRoot(document.getElementById('root')!)
    .render(
      <PluginRender />
    )
}