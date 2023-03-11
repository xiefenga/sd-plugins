import App from '@/App'
import 'antd/dist/antd.css'
import { createRoot } from 'react-dom/client'
import { PluginRender, PORTAL_CAROUSEL_PLUGIN } from 'portal-shared'

export default () => {
  createRoot(
    document.getElementById('root')!
  ).render(
    <PluginRender
      configId={PORTAL_CAROUSEL_PLUGIN}
      PluginApp={(props: any) => (
        <div style={{ width: 642, height: 360 }}>
          <App {...props} />
        </div>
      )}
    />
  )
}