import React from 'react'
import { createRoot } from 'react-dom/client'

import App from '@/App'
import { worker } from '@/mocks/browser'

import '../index.css'
import 'antd/dist/antd.css'


export default () => {
  worker.start()
  const root = createRoot(
    document.getElementById('root')!
  )
  root.render(
    <React.StrictMode>
      <App assetId='ec7c93f2-ed52-073f-3928-2e41b63b8aca' />
    </React.StrictMode>
  )
}