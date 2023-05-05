import React from 'react'
import styled from 'styled-components'
import NiceModal from '@ebay/nice-modal-react'
import { Form, Input, InputNumber, Modal } from 'antd'
import { useModal, antdModal } from '@ebay/nice-modal-react'
import { CarouselConfig } from 'portal-shared/configuration'

interface ConfigModalProps {
  pluginConfig: Partial<CarouselConfig>
  submitConfig: (config: CarouselConfig) => void
} 

const StyledModal = styled(Modal)`
  .ant-modal-footer {
    text-align: center;

    button {
      width: 100px;
    }
  }
`

const ConfigModal: React.FC<ConfigModalProps> = (props) => {

  const modal = useModal()

  const [form] = Form.useForm<CarouselConfig>()

  const { submitConfig, pluginConfig } = props

  pluginConfig.height ??= 360

  pluginConfig.num ??= 5

  const initialValues = { ...pluginConfig }

  const onModalClickOk = () => {
    form.submit()
  }

  const onFinish = (value: CarouselConfig) => {
    submitConfig(value)
    modal.hide()
  }

  return (
    <StyledModal
      closeIcon={null}
      closable={false}
      title='图片轮播配置'
      okText='确定'
      cancelText='取消'
      {...antdModal(modal)}
      onOk={onModalClickOk}
    >
      <Form form={form} onFinish={onFinish} initialValues={initialValues} labelCol={{ span: 5 }} wrapperCol={{ span: 16 }}>
        <Form.Item 
          name='height' 
          label='轮播高度'
          rules={[{ required: true, message: '请输入轮播高度' }]}
        >
          <InputNumber
            min={0}
            size='small'
            addonAfter='px'
            style={{ width: '35%' }}
            placeholder='请输入...'
          />
        </Form.Item>
        <Form.Item 
          name='num' 
          label='数量'
          rules={[{ required: true, message: '请输入轮播数量' }]}
        >
          <InputNumber
            min={0}
            size='small'
            addonAfter='个'
            style={{ width: '35%' }}
            placeholder='请输入...'
          />
        </Form.Item>
        <Form.Item
          name='speedTime'
          label='轮播时长'
          rules={[{ required: true, message: '请输入资产ID' }]}
        >
          <InputNumber
            min={0}
            size='small'
            addonAfter='秒'
            style={{ width: '35%' }}
            placeholder='请输入轮播时长'
          />
        </Form.Item>
        <Form.Item
          name='assetId'
          label='轮播资产'
          rules={[{ required: true, message: '请输入资产ID' }]}
        >
          <Input
            size='small'
            placeholder='请输入轮播数据资产ID'
          />
        </Form.Item>
        <Form.Item
          label='详情地址'
          name='detailsUrl'
          rules={[{ required: true, message: '请输入地址' }]}
        >
          <Input
            size='small'
            placeholder='请输入新闻详情基础地址'
          />
        </Form.Item>
      </Form>
    </StyledModal>
  )
}

export default NiceModal.create(ConfigModal)