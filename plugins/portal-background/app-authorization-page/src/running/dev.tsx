import React from 'react'
import { createRoot } from 'react-dom/client'
import { createGlobalStyle } from 'styled-components'
import 'antd/dist/antd.css'

import App from '@/App'
import { worker } from '@/mocks/browser'
import { PluginConfigProvider } from '@/context'

const GlobalStyle = createGlobalStyle`
  #root {
    height: 100vh;
  }
`

export default () => {
  worker.start({ onUnhandledRequest: 'bypass' })
  createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
      <PluginConfigProvider 
        value={{ 
          appAssetId: 'app', 
          permissionAssetId: 'permission', 
        }}
      >
        <GlobalStyle />
        <App />
      </PluginConfigProvider>
    </React.StrictMode>
  )
}