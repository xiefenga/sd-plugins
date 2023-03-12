import React, { useState } from 'react'
import NiceModal from '@ebay/nice-modal-react'

import RoleTree from '../trees/RoleTree'
import SelectPanel from '../SelectPanel'
import { Role } from '@/types/components'
import CommonModal from './CommonModal'

interface RoleModalProps {
  initValue: Role 
  onConfirm: (role: Role) => void
}


const RoleModal: React.FC<RoleModalProps> = ({ onConfirm, initValue }) => {

  const modal = NiceModal.useModal()

  const [role, setRole] = useState(initValue)

  const onInnerConfirm = () => {
    onConfirm(role)
    modal.hide()
  }

  return (
    <CommonModal
      width={570}
      modal={modal}
      title='角色设置'
      onOk={onInnerConfirm}
    >
      <SelectPanel
        tip='角色'
        selected={role.roleNameList.join('、')}
        selector={
          <RoleTree
            checked={role.roleList}
            onChoose={nodes => {
              const newRole = nodes.reduce((memo, node) => {
                memo.roleList.push(node.id)
                memo.roleNameList.push(node.name)
                return memo
              }, { roleList: [] as string[], roleNameList: [] as string[] })
              setRole(newRole)
            }}
          />
        }
      />
    </CommonModal>
  )
}

export default NiceModal.create(RoleModal)