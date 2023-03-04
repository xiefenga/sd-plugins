import {createRoot} from 'react-dom/client'

import App from '@/App'
import { AccordionConfig, getConfiguration, PORTAL_ACCORDION_PLUGIN } from 'portal-shared'

export default async (dom: HTMLElement) => {

  // console.log(props)

  // const { customConfig } = props

  // const pluginConfig = customConfig[PLUGIN_CONFIG] ?? {}


  const pluginConfig: AccordionConfig = await getConfiguration(PORTAL_ACCORDION_PLUGIN)

  createRoot(dom).render(
    <App pluginConfig={pluginConfig} />
  )
}