import React from 'react'
import { Form, FormProps, Input } from 'antd'
import styled from 'styled-components'
import { forwardRef, useImperativeHandle } from 'react'

import { Theme } from '@/types'
import ImageUpload from '../ImageUpload'
import ColorPicker from '../ColorPicker'

const StyledForm = styled(Form).attrs({
  labelCol: { span: 5 },
  wrapperCol: { span: 10 },
})``

interface ThemeFormProps {
  theme?: Theme
  onSubmit?: (theme: Theme) => void
}

export interface ThemeFormRefProps {
  submit: () => void
}

const ThemeForm = forwardRef((props: ThemeFormProps, ref) => {

  const { theme, onSubmit } = props

  const [form] = Form.useForm()

  useImperativeHandle(ref, () => ({
    submit() {
      form.submit()
    },
  }), [])

  const onFinish: FormProps['onFinish'] = (value) => {
    console.log(value)
    const theme = {
      name: value.name,
      logo: value.logo,
      color: {
        font: {
          active: value.fontActive,
          hover: value.fontHover,
          default: value.fontDefault,
        },
        bg: {
          active: value.bgActive,
          hover: value.bgHover,
          default: value.bgDefault,
        },
        border: {
          color: '#212121',
        },
      },
    } as Theme
    onSubmit?.(theme)
  }

  const formInitialValues = {
    name: theme?.name,
    logo: theme?.logo,
    fontDefault: theme?.color.font.default ?? '#FFFFFF',
    fontHover: theme?.color.font.hover ?? '#FFFFFF',
    fontActive: theme?.color.font.active ?? '#FFFFFF',
    bgDefault: theme?.color.bg.default ?? '#FFFFFF',
    bgHover: theme?.color.bg.hover ?? '#FFFFFF',
    bgActive: theme?.color.bg.active ?? '#FFFFFF',
  }


  return (
    <StyledForm
      form={form}
      onFinish={onFinish}
      initialValues={formInitialValues}
    >
      <Form.Item
        name='name'
        label='主题名'
        rules={[{ required: true, message: '请输入主题名!' }]}
      >
        <Input placeholder='请输入主题名' />
      </Form.Item>
      <Form.Item
        name='logo'
        label='Logo'
        rules={[{ required: true, message: '请上传Logo!' }]}
      >
        <ImageUpload tip='上传Logo' />
      </Form.Item>
      <p>字体颜色</p>
      <Form.Item name='fontDefault' label='默认颜色'>
        <ColorPicker />
      </Form.Item>
      <Form.Item name='fontHover' label='鼠标悬浮'>
        <ColorPicker />
      </Form.Item>
      <Form.Item name='fontActive' label='选中颜色'>
        <ColorPicker />
      </Form.Item>
      <p>背景颜色</p>
      <Form.Item name='bgDefault' label='默认颜色'>
        <ColorPicker />
      </Form.Item>
      <Form.Item name='bgHover' label='鼠标悬浮'>
        <ColorPicker />
      </Form.Item>
      <Form.Item name='bgActive' label='选中颜色'>
        <ColorPicker />
      </Form.Item>
    </StyledForm>
  )
})

ThemeForm.displayName = 'ThemeForm'

export default ThemeForm