import { useRef } from 'react'
import styled from 'styled-components'
import NiceModal from '@ebay/nice-modal-react'
import { useMemoizedFn, useMount, useRequest } from 'ahooks'
import { Modal, ModalProps, Radio, RadioGroupProps, message } from 'antd'

import RolePath from './RolePath'
import { updateAppAuth } from '@/api'
import { PermissionAsset, RoleApp } from '@/types'

const Div = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
  .title {
    font-size: 16px;
    line-height: 2;
  }
`

interface UpdateAppModalProps {
  group: string
  role: string
  role_id: string
  app: RoleApp
  permissions: PermissionAsset[]
}

const UpdateAppModal = (props: UpdateAppModalProps) => {

  const { group, role, app, role_id, permissions } = props

  useMount(() => {
    if (permissions.length === 0) {
      message.error('暂无可用权限，请先创建权限')
      modal.hide()
    }
  })

  const modal = NiceModal.useModal()

  const { loading, run } = useRequest(updateAppAuth, {
    manual: true,
    onSuccess: () => {
      modal.resolve()
      modal.hide()
    },
    onError(error: any) {
      message.error(error?.data?.message ?? '应用权限更新失败')
    },
  })

  const permisssionRef = useRef<string>(app.auth_id)

  const options: RadioGroupProps['options'] = permissions.map(item => ({ label: item.name, value: item.id }))

  const onChange: RadioGroupProps['onChange'] = useMemoizedFn(
    (e) => {
      permisssionRef.current = e.target.value
    }
  )

  const modalProps: ModalProps = {
    title:'更新应用权限',
    destroyOnClose: true,
    confirmLoading: loading,
    ...NiceModal.antdModal(modal),
    onOk: () => {
      run({
        role_id,
        data_id: app.data_id,
        datapp_id: app.app_id,
        operation_type: permisssionRef.current,
      })
    },
  }

  return (
    <Modal {...modalProps}>
      <Div>
        <span className='title'>当前角色:</span>
        <RolePath group={group} role={role} />
      </Div>
      <Div>
        <span className='title'>应用名称:</span>
        <span>{app.app_name}</span>
      </Div>
      <Div>
        <span className='title'>应用权限:</span>
        <Radio.Group
          options={options}
          onChange={onChange}
          defaultValue={app.auth_id}
        />
      </Div>
    </Modal>
  )
}

export default NiceModal.create(UpdateAppModal)