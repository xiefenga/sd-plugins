import 'antd/dist/antd.css'
import { createRoot } from 'react-dom/client'
import { useLocalStorageState } from 'ahooks'

import { PluginPropsOfConfig } from '@/types'
import { postMessage } from '@/utils/message'
import ConfigButton from './components/ConfigButton'
import { PLUGIN_CONFIG, STORAGE_KEY } from '@/utils/constants'

import Configuration from './Configuration'

const _PluginRender = () => {

  const onConfigChange = (config: any) => {

    postMessage(config)

    setPluginProps({
      isConfig: true,
      onConfigChange,
      customConfig: {
        appId: '',
        componentId: '',
        [PLUGIN_CONFIG]: config,
      },
    })
  }

  const [
    pluginProps,
    setPluginProps,
  ] = useLocalStorageState<PluginPropsOfConfig>(
    STORAGE_KEY.PLUGIN_PROPS,
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

  console.log(pluginProps)

  const { customConfig } = pluginProps

  const pluginConfig = customConfig[PLUGIN_CONFIG] ?? {}

  return (
    <ConfigButton
      pluginConfig={pluginConfig}
      onConfigChange={onConfigChange}
    />
  )
}

const PluginRender2 = () => {

  const onConfigChange = (config: any) => {

    postMessage(config)

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
    STORAGE_KEY.PLUGIN_PROPS,
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

  console.log(pluginProps)

  const { customConfig } = pluginProps


  return (
    <Configuration
      customConfig={customConfig}
      onConfigChange={onConfigChange}
    />
  )
}


export default () => {

  createRoot(document.getElementById('root')!)
    .render(
      <PluginRender2 />
    )
}