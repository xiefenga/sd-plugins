import React from 'react'
import { Col, Form, Input, Modal, Row, Switch } from 'antd'
import { ImageUpload } from 'portal-shared'
import NiceModal from '@ebay/nice-modal-react'
import { useModal, antdModal } from '@ebay/nice-modal-react'

interface MenuConfigModalProps {
  title: string
  description: string
  background: string
  preview: string
  url?: string
  code?: boolean
  onSubmit?: (value: FormValue) => void
}

export interface FormValue {
  description: string
  background: string
  preview: string
  url: string
  code: boolean
}

const MenuConfigModal: React.FC<MenuConfigModalProps> = (props) => {

  const {
    title,
    description,
    background,
    preview,
    url,
    code,
    onSubmit = () => {},
  } = props

  const [form] = Form.useForm()

  const modal = useModal()

  const onModalClickOk = () => {
    form.submit()
  }

  const onFormFinish = (value: FormValue) => {
    onSubmit(value)
    modal.hide()
  }

  const initialValues = {
    description,
    background,
    preview,
    url,
    code,
  }

  return (
    <Modal
      title='菜单配置'
      okText='确认'
      cancelText='取消'
      {...antdModal(modal)}
      onOk={onModalClickOk}
    >
      <Form initialValues={initialValues} form={form} onFinish={onFormFinish} labelCol={{ span: 4 }} wrapperCol={{ span: 12 }}>
        <Form.Item label='名称'>
          <Input value={title} disabled />
        </Form.Item>
        <Form.Item
          label='描述'
          name='description'
          rules={[{ required: true, message: '请填写描述!' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item name='url' label='总览地址'>
          <Input />
        </Form.Item>
        <Form.Item name='code' label='SSO Code'>
          <Switch />
        </Form.Item>
        <Row style={{ paddingLeft: 6 }}>
          <Col span={10}>
            <Form.Item
              label='背景图'
              name='background'
              labelCol={{ span: 9 }}
              rules={[{ required: true, message: '请上传背景图!' }]}
            >
              <ImageUpload tip='上传背景图' />
            </Form.Item>
          </Col>
          <Col span={9}>
            <Form.Item
              label='缩略图'
              name='preview'
              labelCol={{ span: 9 }}
              rules={[{ required: true, message: '请上传缩略图!' }]}
            >
              <ImageUpload tip='上传缩略图' />
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </Modal>
  )
}

export default NiceModal.create(MenuConfigModal)