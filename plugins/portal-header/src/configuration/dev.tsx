import 'antd/dist/antd.css'
import { createRoot } from 'react-dom/client'
import Configuration from './Configuration'
import { ConfigRender } from 'portal-shared'

export default () => {

  createRoot(document.getElementById('root')!)
    .render(
      <ConfigRender Configuration={Configuration} />
    )
}