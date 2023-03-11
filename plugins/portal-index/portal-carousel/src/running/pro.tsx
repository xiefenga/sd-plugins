import App from '@/App'
import { createRoot } from 'react-dom/client'
import { CarouselConfig } from 'portal-shared/configuration'
import { getConfiguration, PORTAL_CAROUSEL_PLUGIN } from 'portal-shared'

export default async (dom: HTMLElement) => {

  const pluginConfig: CarouselConfig = await getConfiguration(PORTAL_CAROUSEL_PLUGIN)

  createRoot(dom).render(
    <App pluginConfig={pluginConfig} />
  )
}