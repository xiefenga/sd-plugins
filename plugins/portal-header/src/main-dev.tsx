import 'antd/dist/antd.css'
import React, { useEffect } from 'react'
import { createRoot } from 'react-dom/client'
import { useLocalStorageState } from 'ahooks'
import { createGlobalStyle } from 'styled-components'

import App from './App'
import { PluginProps } from './types'
import { registerMessage } from './utils/message'
import { PLUGIN_CONFIG, DEFAULT_THEME, STORAGE_KEY } from './utils/constants'

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

  const _pluginConfig = {
    isLevel: true,
    themes: [
      { ...DEFAULT_THEME, name: '主题1' },
      { ...DEFAULT_THEME, name: '主题2' },
      { ...DEFAULT_THEME, name: '主题3' },
      { ...DEFAULT_THEME, name: '主题4' },
    ],
    subNavs: [
      { name: '21基地', url: '/' },
      { name: '信通基地', url: '/' },
      { name: '网空部队', url: '/' },
      { name: '军航部队', url: '/' },
    ],
    busninessNavs: [
      { name: '概览', url: 'xx' },
      { name: '综合态势', url: 'xx' },
      { name: '军事训练', url: 'xx' },
      { name: '军事教育', url: 'xx' },
      { name: '部队管理', url: 'xx' },
      { name: '航天发射', url: 'xx' },
      { name: '技侦训练', url: 'xx' },
      { name: '任务针对性训练', url: 'xx' },
      { name: '技术干部培养', url: 'xx' },
      { name: '数据资源', url: 'xx' },
      { name: '论坛中心', url: 'xx' },
      { name: '门户管理后台', url: 'xx' },
    ],
  }

  createRoot(document.getElementById('root')!)
    .render(
      <PluginRender />
    )
}