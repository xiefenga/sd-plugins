import React from 'react'
import { RuleObject } from 'antd/es/form'
import { Form, FormInstance, Input } from 'antd'
import { StoreValue } from 'antd/es/form/interface'
import { PASSWORD_RULES } from '@/components/forms/AccountForm/helper'

interface PasswordFormProps {
  account: string
  form: FormInstance
}

const PasswordForm: React.FC<PasswordFormProps> = (props) => {
  const { form, account } = props

  const validateSamePassword = async (_: RuleObject, value: StoreValue) => {
    if (value && value !== form.getFieldValue('password')) {
      throw '确认密码与新密码不一致！'
    }
  }

  const retypePasswordRules = [
    { validator: validateSamePassword },
    { required: true, message: '请再次输入确认密码！' },
  ]

  return (
    <Form
      form={form}
      labelCol={{ span: 6 }}
      wrapperCol={{ span: 16 }}
    >
      <Form.Item label='登录名'>
        <Input disabled value={account} />
      </Form.Item>
      <Form.Item name='password' label='新密码' rules={PASSWORD_RULES}>
        <Input.Password />
      </Form.Item>
      <Form.Item name="re-password" label='确认密码' rules={retypePasswordRules}>
        <Input.Password />
      </Form.Item>
    </Form>
  )
}

export default PasswordForm