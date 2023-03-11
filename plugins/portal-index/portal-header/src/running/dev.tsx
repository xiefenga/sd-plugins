import { createRoot } from 'react-dom/client'
import { PluginRender, PORTAL_HEADER_PLUGIN } from 'portal-shared'
import 'antd/dist/antd.css'
import App from './App'

const Dev = (props: any) => {
  return (
    <div style={{ height: 200 }}>
      <App {...props} />
    </div>
  )
}


export default () => {

  createRoot(document.getElementById('root')!)
    .render(
      <PluginRender 
        PluginApp={Dev}
        configId={PORTAL_HEADER_PLUGIN}
      />
    )
}