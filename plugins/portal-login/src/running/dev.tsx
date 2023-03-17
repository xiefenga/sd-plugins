import App from '@/App'
import { createRoot } from 'react-dom/client'
import 'antd/dist/antd.css'
import pluginJson from '../../plugin.json'

export default () => {
  const root = createRoot(
    document.getElementById('root')!
  )
  const { $config } = pluginJson.props
  root.render(
    <App appId='' pluginConfig={$config} />
  )
}