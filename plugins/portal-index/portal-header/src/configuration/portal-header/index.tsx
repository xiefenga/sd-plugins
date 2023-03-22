import { PORTAL_HEADER_PLUGIN } from 'portal-shared'
import { PluginPropsOfConfig } from 'portal-shared/configuration'

import ConfigButton from './components/ConfigButton'

interface Props {
  onConfigChange: (_: any) => void
  customConfig: PluginPropsOfConfig['customConfig']
}

const Render = (props: Props) => {

  const { customConfig, onConfigChange } = props

  const pluginConfig = customConfig[PORTAL_HEADER_PLUGIN] ?? {}

  const wrapperConfigChange = (config: any) => {
    onConfigChange({ [PORTAL_HEADER_PLUGIN]: config })
  }

  return (
    <ConfigButton
      pluginConfig={pluginConfig}
      onConfigChange={wrapperConfigChange}
    />
  )
}

export default Render