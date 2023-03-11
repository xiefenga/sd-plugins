import { createRoot } from 'react-dom/client'
import { setConfiguration } from 'portal-shared'
import { PluginProps } from 'portal-shared/configuration'
import { PORTAL_ACCORDION_PLUGIN, PORTAL_CAROUSEL_PLUGIN, PORTAL_HEADER_PLUGIN } from 'portal-shared'

import App from './App'


export default (dom: HTMLDivElement, props: PluginProps) => {

  const { customConfig } = props

  setConfiguration(PORTAL_ACCORDION_PLUGIN, customConfig[PORTAL_ACCORDION_PLUGIN])
  setConfiguration(PORTAL_CAROUSEL_PLUGIN, customConfig[PORTAL_CAROUSEL_PLUGIN])

  const pluginConfig = customConfig[PORTAL_HEADER_PLUGIN] ?? {}

  createRoot(dom).render(
    <App pluginConfig={pluginConfig} />
  )
}