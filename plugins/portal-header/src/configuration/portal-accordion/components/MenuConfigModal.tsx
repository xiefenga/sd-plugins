import React from 'react'
import { Form, Input, Modal } from 'antd'
import { ImageUpload } from 'portal-shared'
import NiceModal from '@ebay/nice-modal-react'
import { useModal, antdModal } from '@ebay/nice-modal-react'

interface MenuConfigModalProps {
  title: string
  description: string
  background: string
  preview: string
  onSubmit?: (value: FormValue) => void
}

export interface FormValue {
  description: string
  background: string
  preview: string
}

const MenuConfigModal: React.FC<MenuConfigModalProps> = (props) => {

  const {
    title,
    description,
    background,
    preview,
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
        <Form.Item
          label='背景图'
          name='background'
          rules={[{ required: true, message: '请上传背景图!' }]}
        >
          <ImageUpload tip='上传背景图' />
        </Form.Item>
        <Form.Item
          label='缩略图'
          name='preview'
          rules={[{ required: true, message: '请上传缩略图!' }]}
        >
          <ImageUpload tip='上传缩略图' />
        </Form.Item>
      </Form>
    </Modal>
  )
}

export default NiceModal.create(MenuConfigModal)