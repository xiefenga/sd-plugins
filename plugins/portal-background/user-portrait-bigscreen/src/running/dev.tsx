import React from 'react'
import { createRoot } from 'react-dom/client'
import { createGlobalStyle } from 'styled-components'

import ScreenApp from '@/App'
import { devConfiguration } from '@/config'

const DevGlobalStyle = createGlobalStyle`
  :root, body, #root {
    margin: 0;
    width: 100vw;
    height: 100vh;
  }
`

export default () => {
  const root = createRoot(document.getElementById('root')!)
  root.render(
    <React.StrictMode>
      <ScreenApp {...devConfiguration} />
      <DevGlobalStyle />
    </React.StrictMode>
  )

}