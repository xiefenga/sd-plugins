import React from 'react'
import { useSetState } from 'ahooks'
import NiceModal from '@ebay/nice-modal-react'
import { useModal, antdModal } from '@ebay/nice-modal-react'
import { Button, Form, Input, InputNumber, Modal } from 'antd'

import { 
  AccordionMenuItem as MenuItem,
  AccordionConfig as PluginConfig
} from 'portal-shared/configuration'

import MenuDrawer from './MenuDrawer'

interface ConfigModalProps {
  pluginConfig: Partial<PluginConfig>
  submitConfig(config: any): void
}

const ConfigModal: React.FC<ConfigModalProps> = (props) => {

  const { pluginConfig, submitConfig } = props

  const modal = useModal()

  const [configState, setConfigState] = useSetState(pluginConfig)

  const openBackgroundConfigDrawer = () => {
    NiceModal.show(MenuDrawer, {
      menuConfigList: configState.menuConfigList ?? [],
      onSubmit(menuConfigList: MenuItem[]) {
        setConfigState({ menuConfigList })
      },
    })
  }

  const onModalClickOk = () => {
    submitConfig(configState)
    modal.hide()
  }

  return (
    <Modal
      title='手风琴配置'
      closeIcon={null}
      {...antdModal(modal)}
      onOk={onModalClickOk}
    >
      <Form labelCol={{ span: 5 }} wrapperCol={{ span: 12 }}>
        <Form.Item label='查看更多URL'>
          <Input 
            value={configState.moreLink} 
            placeholder='输入查看更多跳转链接' 
            onChange={e => setConfigState({ moreLink: e.target.value })}
          />
        </Form.Item>
        <Form.Item label='其他组件高度'>
          <InputNumber 
            style={{width: '100%'}}
            placeholder='输入页面其他组件占据高度' 
            value={configState.otherHeight}
            onChange={value => value && setConfigState({ otherHeight: value })}
          />
        </Form.Item>
        <Form.Item label='背景图配置'>
          <Button type='primary' size='small' onClick={openBackgroundConfigDrawer}>
            点击配置
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  )
}

export default NiceModal.create(ConfigModal)