import React from 'react'
import { Form, message } from 'antd'
import NiceModal from '@ebay/nice-modal-react'

import { changePassword } from '@/api/account'
import PasswordForm from '../forms/PasswordForm'
import CommonModal from './CommonModal'

interface PasswordModalProps {
  account: string
  code: string
  refresh: () => void
}

const PasswordModal: React.FC<PasswordModalProps> = (props) => {
  const { account, code, refresh } = props

  const modal = NiceModal.useModal()
  const [passwordForm] = Form.useForm()

  const onInnerConfirm = async () => {
    try {
      await passwordForm.validateFields()
      try {
        await changePassword(code, passwordForm.getFieldValue('password'))
        message.success('密码修改成功！')
        refresh()
        passwordForm.resetFields()
        modal.hide()
      } catch (error) {
        message.error('修改密码失败, ' + error)
        console.log(error)
      }
    } catch (_) {
      // 
    }
  }

  return (
    <CommonModal
      title='修改密码'
      modal={modal}
      onOk={onInnerConfirm}
    >
      <PasswordForm
        account={account}
        form={passwordForm}
      />
    </CommonModal>

  )
}

export default NiceModal.create(PasswordModal)

