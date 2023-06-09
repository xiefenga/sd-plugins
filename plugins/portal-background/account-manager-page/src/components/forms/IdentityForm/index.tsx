import React from 'react'
import { useMount } from 'ahooks'
import { RuleObject } from 'antd/lib/form'
import NiceModal from '@ebay/nice-modal-react'
import { Form, FormInstance, Input } from 'antd'

import { OFFICE_RULES, ROLE_RULES } from './helper'
import RoleModal from '@/components/modals/RoleModal'
import { useAntdUnableFocusRef } from '@/hooks/useUnableFocus'
import { IdentityFormIns, IdentityFormValue } from '@/types/components'
import './index.less'


interface IdentityFormProsp {
  form: FormInstance<IdentityFormIns>
  identityValue: IdentityFormValue
  identityList: IdentityFormValue[]
  setIdentityValue: (val: IdentityFormValue) => void
}

const IdentityForm: React.FC<IdentityFormProsp> = (props) => {

  const { form, identityValue, identityList, setIdentityValue } = props

  const roleInputRef = useAntdUnableFocusRef()

  useMount(() => {

    const { roleNameList } = identityValue
    form.setFieldsValue({
      ...identityValue,
      role: roleNameList.join(','),
    })
  })

  type Role = {
    roleList: string[]
    roleNameList: string[]
  }

  const openRoleModal = () => {
    const { roleList, roleNameList } = identityValue
    NiceModal.show(RoleModal, {
      initValue: { roleList, roleNameList },
      onConfirm(role: Role) {
        form.setFieldsValue({
          role: role.roleNameList.join(','),
        })
        // form.setFieldValue('role', role.roleNameList.join(','))
        setIdentityValue({
          ...identityValue,
          ...role,
        })
      },
    })
  }

  const checkName = async (_: RuleObject, value: string) => {
    const notAccess = identityList.some(identity => {
      return identity._key !== identityValue._key && identity.userName === value
    })
    if (notAccess) {
      throw new Error('名称不能重复！')
    }
  }

  return (
    <Form
      form={form}
      labelCol={{ span: 6 }}
      wrapperCol={{ span: 14 }}
    >
      <Form.Item label='名称' name='userName' rules={[
        { required: true, message: '请输入名称！' },
        { validator: checkName },
      ]}
      >
        <Input onChange={e => setIdentityValue({ ...identityValue, userName: e.target.value })} />
      </Form.Item>
      <Form.Item label='组织' name='office_name' rules={OFFICE_RULES}>
        <Input disabled />
      </Form.Item>
      <Form.Item label='角色' name='role' rules={ROLE_RULES}>
        <Input 
          ref={roleInputRef} 
          onClick={openRoleModal} 
        />
      </Form.Item>
    </Form>
  )
}

export default IdentityForm