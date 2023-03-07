import { createRoot } from 'react-dom/client'
import { PluginPropsOfConfig } from 'portal-shared/configuration'

import Configuration from './Configuration'

export default (dom: HTMLElement, props: PluginPropsOfConfig) => {

  const { onConfigChange, customConfig } = props

  createRoot(dom).render(
    <Configuration
      customConfig={customConfig}
      onConfigChange={onConfigChange}
    />
  )
}