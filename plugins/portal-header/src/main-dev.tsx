import React from 'react'
import { createRoot } from 'react-dom/client'
import { createGlobalStyle } from 'styled-components'
import 'antd/dist/antd.css'
import App from './App'
import { PluginConfig } from './types'
import { DEFAULT_THEME } from './constants'

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
  }
`

export default () => {

  const root = createRoot(
    document.getElementById('root')!
  )

  const pluginConfig = {
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
  } as PluginConfig

  root.render(
    <React.StrictMode>
      <GlobalStyle />
      <App pluginConfig={pluginConfig} />
      {/* <Setting pluginConfig={{}} onConfigChange={() => {}} /> */}
    </React.StrictMode>
  )
}