import { createRoot } from 'react-dom/client'
import 'antd/dist/antd.css'

import Setting from './App'
// import { PluginConfig } from '@/types'

// interface PluginPropsOfConfig {
//   isConfig: true
//   onConfigChange: (config: any) => void
//   customConfig: Partial<PluginConfig>
// }

export default () => {

  // const { onConfigChange, customConfig } = props
  // console.log(props)

  createRoot(document.getElementById('root')!).render(
    <Setting 
      pluginConfig={{}} 
      onConfigChange={() => {}} 
    />
  )
}