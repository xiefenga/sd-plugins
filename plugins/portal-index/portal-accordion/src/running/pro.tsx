import {createRoot} from 'react-dom/client'
import { AccordionConfig, getConfiguration, PORTAL_ACCORDION_PLUGIN } from 'portal-shared'
import App from '@/App'

export default async (dom: HTMLElement) => {

  const pluginConfig: AccordionConfig = await getConfiguration(PORTAL_ACCORDION_PLUGIN)

  createRoot(dom).render(
    <App pluginConfig={pluginConfig} />
  )
}