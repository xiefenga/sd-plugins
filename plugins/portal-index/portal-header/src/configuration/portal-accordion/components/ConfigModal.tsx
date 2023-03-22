import React from 'react'
import { useSetState } from 'ahooks'
import styled from 'styled-components'
import NiceModal from '@ebay/nice-modal-react'
import { useModal, antdModal } from '@ebay/nice-modal-react'
import { Button, Form, Input, InputNumber, Modal } from 'antd'
import { AccordionMenuItem as MenuItem, AccordionConfig as PluginConfig } from 'portal-shared/configuration'

import MenuDrawer from './MenuDrawer'

const StyledModal = styled(Modal)`
  .ant-modal-footer {
    text-align: center;

    button {
      width: 100px;
    }
  }
`

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
    <StyledModal
      title='手风琴配置'
      closeIcon={null}
      closable={false}
      okText='确认'
      cancelText='取消'
      {...antdModal(modal)}
      onOk={onModalClickOk}
    >
      <Form labelCol={{ span: 5 }} wrapperCol={{ span: 16 }}>
        <Form.Item label='背景图配置'>
          <Button type='primary' size='small' onClick={openBackgroundConfigDrawer}>
            点击配置
          </Button>
        </Form.Item>
        <Form.Item label='其他组件高度'>
          <InputNumber
            size='small'
            addonAfter='px'
            style={{ width: '35%' }}
            placeholder='输入页面其他组件占据高度'
            value={configState.otherHeight}
            onChange={value => value && setConfigState({ otherHeight: value })}
          />
        </Form.Item>
        <Form.Item label='查看更多URL'>
          <Input
            size='small'
            value={configState.moreLink}
            placeholder='输入查看更多跳转链接'
            onChange={e => setConfigState({ moreLink: e.target.value })}
          />
        </Form.Item>
      </Form>
    </StyledModal>
  )
}

export default NiceModal.create(ConfigModal)