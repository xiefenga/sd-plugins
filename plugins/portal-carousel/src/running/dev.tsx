import App from '@/App'
import 'antd/dist/antd.css'
import { createRoot } from 'react-dom/client'
import React from 'react'

export default () => {
  createRoot(
    document.getElementById('root')!
  ).render(
    <div style={{ width: 642, height: 360 }}>
      <App
        speedTime='2'
        detailsUrl='/'
        height='360'
        assetId='6bdf25f0-4df0-eb99-5a88-81c86a477966'
      />
    </div>
  )
}