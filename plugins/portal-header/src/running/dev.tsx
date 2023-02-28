import 'antd/dist/antd.css'
import React, { useEffect } from 'react'
import { createRoot } from 'react-dom/client'
import { useLocalStorageState } from 'ahooks'
import { createGlobalStyle } from 'styled-components'

import App from './App'
import { PluginProps } from '@/types'
import { registerMessage } from '@/utils/message'
import { PLUGIN_CONFIG, STORAGE_KEY } from '@/utils/constants'


const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
  }
`

const defaultPluginProps = {
  appId: '',
  componentId: '',
  customConfig: {
    appId: '',
    componentId: '',
  },
}

const PluginRender = () => {

  const [
    pluginProps,
    setPluginProps,
  ] = useLocalStorageState<PluginProps>(
    STORAGE_KEY.PLUGIN_PROPS,
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
            [PLUGIN_CONFIG]: customizeConfig,
          },
          [PLUGIN_CONFIG]: customizeConfig,
        })
      }
    )
  }, [])

  console.log(pluginProps)

  const { customConfig } = pluginProps

  const pluginConfig = customConfig[PLUGIN_CONFIG] ?? {}

  return (
    <React.Fragment>
      <GlobalStyle />
      <App pluginConfig={pluginConfig} />
    </React.Fragment>
  )
}

export default () => {

  createRoot(document.getElementById('root')!)
    .render(
      <PluginRender />
    )
}