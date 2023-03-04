import 'antd/dist/antd.css'
import React from 'react'
import { createRoot } from 'react-dom/client'
import { createGlobalStyle } from 'styled-components'
import App from '@/App'

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
  }
`

const PluginRender = () => {

  // const [
  //   pluginProps,
  //   setPluginProps,
  // ] = useLocalStorageState<PluginProps>(
  //   STORAGE_KEY.PLUGIN_PROPS,
  //   { defaultValue: defaultPluginProps }
  // )

  // useEffect(() => {
  //   return registerMessage(
  //     e => {
  //       const customizeConfig = e.data.payload
  //       setPluginProps({
  //         appId: '',
  //         componentId: '',
  //         customConfig: {
  //           appId: '',
  //           componentId: '',
  //           [PLUGIN_CONFIG]: customizeConfig,
  //         },
  //         [PLUGIN_CONFIG]: customizeConfig,
  //       })
  //     }
  //   )
  // }, [])

  // console.log(pluginProps)

  // const { customConfig } = pluginProps

  // const pluginConfig = customConfig[PLUGIN_CONFIG] ?? {}

  const pluginConfig = {
    'menuConfigList': [
      {
        'id': '1',
        'type': '1',
        'title': '任务针对性',
        'description': '任务针对性',
        'background': '/storage_area/form/1234567890/398b4799b3d94b10935b00f33ee5690a.png',
        'preview': '/storage_area/form/1234567890/54ef7a079db74d8a98cc734f473853bd.png',
      },
      {
        'id': '2',
        'type': '2',
        'title': '专业技术干部',
        'description': '专业技术干部',
        'background': '/storage_area/form/1234567890/05c99d9083f9492aba0528f0d1f2e557.png',
        'preview': '/storage_area/form/1234567890/db0f1237fe844052b32e8461b4aac2c1.png',
      },
      {
        'id': '3',
        'type': '3',
        'title': '航天预测分析',
        'description': '航天预测分析',
        'background': '/storage_area/form/1234567890/f3bfef9b0589404eadcbbe479e587fdc.png',
        'preview': '/storage_area/form/1234567890/b679e7f10e45440eb913684902ea466a.png',
      },
      {
        'id': '4',
        'type': '4',
        'title': '技侦领域测评',
        'description': '技侦领域测评',
        'background': '/storage_area/form/1234567890/2206d172aa674014aa2c6cf3fcdfba08.png',
        'preview': '/storage_area/form/1234567890/e7883d563eaa478da1cce6c0e7d972a4.png',
      },
      {
        'id': '5',
        'type': '5',
        'title': '军事训练',
        'description': '军事训练',
        'background': '/storage_area/form/1234567890/2629ed6da7354ba7b0331c15748a44bd.png',
        'preview': '/storage_area/form/1234567890/f72602972eab4a7b8256c38f8b4dbefa.png',
      },
      {
        'id': '6',
        'type': '6',
        'title': '军事教育',
        'description': '军事教育',
        'background': '/storage_area/form/1234567890/a65bbe4faf784a40bebc41d3fb21c8f2.png',
        'preview': '/storage_area/form/1234567890/2f91d325687b45edaaede15a76289835.png',
      },
      {
        'id': '7',
        'type': '7',
        'title': '部队管理',
        'description': '部队管理',
        'background': '/storage_area/form/1234567890/bb8d4f007c2e4bc08ec49dcbadff922a.png',
        'preview': '/storage_area/form/1234567890/f6f8bd929965406db09f6d25e15f977c.png',
      },
      {
        'id': '8',
        'type': '8',
        'title': '工具',
        'description': '工具',
        'background': '/storage_area/form/1234567890/f66fc7ad35cd43c39f99086f3e7564c0.png',
        'preview': '/storage_area/form/1234567890/b9f934647beb4e219686ec8eb46bc767.png',
      },
      {
        'id': '@0x1461A0::PORTAL_ACCORDION::MENU_ITEM_MORE_ID',
        'type': '',
        'title': '查看更多',
        'description': '查看更多',
        'background': '/storage_area/form/1234567890/41a38123c7b74da0b964115938cf2e44.png',
        'preview': '/storage_area/form/1234567890/cf1bf665072b4a6b9df28abd855c64b3.png',
      },
    ],
    'otherHeight': 360,
    'moreLink': '/more/fasd',
  }

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