import App from '@/App'
import React from 'react'
import { createRoot } from 'react-dom/client'
require('../index.css')
require('antd/dist/antd.css')

export default () => {
  const root = createRoot(
    document.getElementById('root')!
  )
  root.render(
    <React.StrictMode>
      <App assetId='ccf54bf3-ea7b-aac0-2ee3-6ff39eda1e33' />
    </React.StrictMode>
  )
}