import { createRoot } from 'react-dom/client'

import App from './App'
import { PluginProps } from '@/types'
import { PLUGIN_CONFIG } from '@/utils/constants'


export default (dom: HTMLDivElement, props: PluginProps) => {

  console.log(props)

  const { customConfig } = props

  const pluginConfig = customConfig[PLUGIN_CONFIG] ?? {}

  createRoot(dom).render(
    <App pluginConfig={pluginConfig} />
  )
}