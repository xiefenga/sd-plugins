import { Form } from 'antd'
import { PluginPropsOfConfig } from '@/types'
import HeaderConfigButton from './portal-header'
import AccordionConfigButton from './portal-accordion'

interface RenderPorps {
  onConfigChange: (_: any) => void
  customConfig: PluginPropsOfConfig['customConfig']
}

const Configuration = (props: RenderPorps) => {
  const { customConfig, onConfigChange } = props

  return (
    <Form labelCol={{ span: 8 }}>
      <Form.Item label='顶栏'>
        <HeaderConfigButton
          customConfig={customConfig}
          onConfigChange={onConfigChange}
        />

      </Form.Item>
      <Form.Item label='手风琴'>
        <AccordionConfigButton
          customConfig={customConfig}
          onConfigChange={onConfigChange}
        />
      </Form.Item>
    </Form>
  )
}

export default Configuration