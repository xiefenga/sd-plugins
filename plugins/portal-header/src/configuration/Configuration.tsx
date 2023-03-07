import omit from 'lodash.omit'
import { Button, Col, Form, message, Row, Upload } from 'antd'
import { PluginPropsOfConfig } from 'portal-shared/configuration'

import { ConfigFileJSON } from '@/types'
import HeaderConfigButton from './portal-header'
import AccordionConfigButton from './portal-accordion'
import { download, readFile2Json } from '@/utils/helper'
import { ConfigFileFlag, ConfigFileScope } from '@/utils/constants'

interface RenderPorps {
  onConfigChange: (_: any) => void
  customConfig: PluginPropsOfConfig['customConfig']
}

const isConfigFile = (config: any): config is ConfigFileJSON => {
  return config.type === ConfigFileFlag && config.scope === ConfigFileScope
}

const Configuration = (props: RenderPorps) => {

  const { customConfig, onConfigChange } = props

  const exportConfig = () => {
    const pluginConfig = omit(customConfig, ['appId', 'componentId'])

    const currentTime = new Date()

    const configFileJson = {
      time: currentTime,
      type: ConfigFileFlag,
      scope: ConfigFileScope,
      configuration: pluginConfig,
    }
    const blob = new Blob([JSON.stringify(configFileJson, null, 2)], { type: 'application/json' })
    download(blob, `门户首页插件配置-${currentTime.getTime()}.json`)
  }

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
      <Form.Item label='图片轮播'>
        <HeaderConfigButton
          customConfig={customConfig}
          onConfigChange={onConfigChange}
        />
      </Form.Item>
      <Row justify='center' gutter={20}>
        <Col span={10}>
          <Upload
            maxCount={1}
            showUploadList={false}
            accept='application/json'
            beforeUpload={() => false}
            onChange={async ({ file }) => {
              const configFile = file as unknown as File
              try {
                const config = await readFile2Json(configFile)
                // 配置校验
                if(isConfigFile(config)) {
                  onConfigChange({ ...config.configuration })
                } else {
                  message.error('配置文件有误')
                }    
              } catch (error) {
                message.error('导入配置文件出错' + error)
                console.error(error)
              }   
            }}
          >
            <Button block type='primary'>
              配置导入
            </Button>
          </Upload>
        </Col>
        <Col span={10}>
          <Button block type='primary' onClick={exportConfig}>
            配置导出
          </Button>
        </Col>
      </Row>
    </Form>
  )
}

export default Configuration