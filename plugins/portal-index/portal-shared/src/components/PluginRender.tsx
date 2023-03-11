import { useEffect } from 'react'
import { useLocalStorageState } from 'ahooks'

import { PluginProps } from '@/types'
import { registerMessage } from '@/utils/message'

export const PLUGIN_CONFIG_STORAGE_KEY = '@0x1461A0::STORAGE_PLUGIN_PROPS_KEY'

const defaultPluginProps = {
  appId: '',
  componentId: '',
  customConfig: {
    appId: '',
    componentId: '',
  },
}

interface PluginAppProps<T> {
  pluginConfig: T
}

interface PluginRenderProps<T> {
  configId: string
  PluginApp: React.ComponentType<PluginAppProps<T>>
}

const PluginRender = <T, >(props: PluginRenderProps<T>) => {

  const { configId, PluginApp } = props

  const [
    pluginProps,
    setPluginProps,
  ] = useLocalStorageState<PluginProps<T>>(
    PLUGIN_CONFIG_STORAGE_KEY,
    { defaultValue: defaultPluginProps }
  )

  useEffect(() => {
    return registerMessage(
      e => {
        const customizeConfig = e.data.payload
        setPluginProps({
          appId: '',
          componentId: '',
          customConfig: {
            appId: '',
            componentId: '',
            ...customizeConfig,
          },
          ...customizeConfig,
        })
      }
    )
  }, [])

  console.log(pluginProps)

  const { customConfig } = pluginProps

  const pluginConfig = (customConfig[configId] ?? {}) as T


  return (
    <PluginApp pluginConfig={pluginConfig} />
  )
}

export default PluginRender