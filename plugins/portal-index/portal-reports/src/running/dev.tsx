// @ts-nocheck
import {createRoot} from 'react-dom/client'
import App from '@/App'
import {
  registerStore,
  getBlockData,
  getBlockVariables
} from '@njsdata/bigscreen-sdk'
import 'antd/dist/antd.css'

export default () => {

  const customConfig = {
    variable: { default_value: '测试的数据', id: '测试的ID' },
    options: {
      auto: true,
      showToolbar: false,
      columns: ['年份', '数值', '指标名称'],
      showColumns: ['指标名称', '数值'],
      dataSourceType: 2,
      customCss: '',
    },
    bigscreen: {
      blocks: [
      ],
    },
    block:{
      dataConfig: {},
      baseConfig: {},
    },
    data: [
      ['项目一', '', ''],
      ['项目二', '', ''],
      ['项目三', '', ''],
    ],
  }

  registerStore(customConfig)
  // console.log(getBlockData(), 'getBlockData')
  // console.log(getBlockVariables(), 'getBlockVariables')
  
  createRoot(
    document.getElementById('root')!
  ).render(
    <div style={{ width: 500, height: 400 }}>
      <App {...customConfig} />
    </div>
    
  )
}