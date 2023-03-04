import { createRoot } from 'react-dom/client'

import App from './App'
import { PluginProps } from '@/types'
import { PORTAL_ACCORDION_PLUGIN, PORTAL_HEADER_PLUGIN } from 'portal-shared'

import { setConfiguration } from 'portal-shared'


export default (dom: HTMLDivElement, props: PluginProps) => {

  console.log(props)

  const { customConfig } = props

  setConfiguration(PORTAL_ACCORDION_PLUGIN, customConfig[PORTAL_ACCORDION_PLUGIN])

  const pluginConfig = customConfig[PORTAL_HEADER_PLUGIN] ?? {}

  createRoot(dom).render(
    <App pluginConfig={pluginConfig} />
  )
}