import { createRoot } from 'react-dom/client'
import { PluginRender, PORTAL_ACCORDION_PLUGIN } from 'portal-shared'
import 'antd/dist/antd.css'

import App from '@/App'

export default () => {

  createRoot(document.getElementById('root')!)
    .render(
      <PluginRender 
        PluginApp={App}
        configId={PORTAL_ACCORDION_PLUGIN}
      />
    )
}