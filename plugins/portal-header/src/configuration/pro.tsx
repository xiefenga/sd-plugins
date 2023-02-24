import { createRoot } from 'react-dom/client'

import { PluginPropsOfConfig } from '@/types'
import { PLUGIN_CONFIG } from '@/utils/constants'
import ConfigButton from './components/ConfigButton'

export default (dom: HTMLElement, props: PluginPropsOfConfig) => {

  const { onConfigChange, customConfig } = props

  console.log(props)

  // @ts-ignore
  window.xxx = props

  const wrapperConfigChange = (config: any) => {
    onConfigChange({ [PLUGIN_CONFIG]: config })
  }

  const pluginConfig = customConfig[PLUGIN_CONFIG] ?? {}

  createRoot(dom).render(
    <ConfigButton
      pluginConfig={pluginConfig}
      onConfigChange={wrapperConfigChange}
    />
  )
}