import { createRoot } from 'react-dom/client'
import Setting from './setting/index'
import { PluginConfig } from './types'

interface PluginPropsOfConfig {
  isConfig: true
  onConfigChange: (config: any) => void
  customConfig: Partial<PluginConfig>
}

export default (dom: HTMLElement, props: PluginPropsOfConfig) => {
  const { onConfigChange, customConfig } = props
  console.log(props)

  createRoot(dom).render(
    <Setting 
      pluginConfig={customConfig} 
      onConfigChange={onConfigChange} 
    />
  )
}