import './runtime'
import { createRoot } from 'react-dom/client'
import { PluginConfig } from './types'
import App from './App'

interface PluginPropsRender {
  appId: string
  componentId: string
  customConfig: Partial<PluginConfig>
}

export default (dom: HTMLDivElement, props: PluginPropsRender) => {
  const root = createRoot(dom)

  console.log(props)

  const { customConfig } = props

  root.render(
    <App pluginConfig={customConfig} />
  )
}