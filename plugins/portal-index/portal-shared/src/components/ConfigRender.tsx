import React from 'react'
import { useLocalStorageState } from 'ahooks'
import { postConfigMessage } from '@/utils/message'
import { PluginPropsOfConfig } from '../configuration/types'

const PLUGIN_CONFIG_STORAGE_KEY = '@0x1461A0::STORAGE_PLUGIN_PROPS_KEY'

interface ConfigurationProps {
  onConfigChange: (_: any) => void
  customConfig: PluginPropsOfConfig['customConfig']
}

interface ConfigRenderProps {
  Configuration: React.ComponentType<ConfigurationProps>
}

const ConfigRender: React.FC<ConfigRenderProps> = (props) => {

  const { Configuration } = props

  const onConfigChange = (config: any) => {

    postConfigMessage(config)

    pluginProps.customConfig = {
      ...pluginProps.customConfig,
      ...config,
    }

    setPluginProps({ ...pluginProps })
  }

  const [
    pluginProps,
    setPluginProps,
  ] = useLocalStorageState<PluginPropsOfConfig>(
    PLUGIN_CONFIG_STORAGE_KEY,
    {
      defaultValue: {
        isConfig: true,
        onConfigChange,
        customConfig: {
          appId: '',
          componentId: '',
        },
      },
    }
  )

  const { customConfig } = pluginProps

  return (
    <Configuration 
      customConfig={customConfig}
      onConfigChange={onConfigChange}
    />
  )
}

export default ConfigRender