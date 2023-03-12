import { message } from 'antd'
import React, { useRef } from 'react'
import NiceModal from '@ebay/nice-modal-react'

import UserTree from '@/components/trees/UserTree'
import { BussinessUserResp } from '@/types/api/account'
import CommonModal from './CommonModal'

interface UserModalProsp {
  onConfirm: (name: string, no: string) => void
}

const UserModal: React.FC<UserModalProsp> = ({ onConfirm }) => {

  const modal = NiceModal.useModal()

  const userRef = useRef<BussinessUserResp | null>()

  const onInnerConfirm = () => {
    if (userRef.current != null) {
      const { MC, SFZHM } = userRef.current
      onConfirm(MC, SFZHM)
      modal.remove()
    } else {
      message.error('请选择用户！')
    }
  }

  return (
    <CommonModal
      title='用户选择'
      modal={modal}
      onOk={onInnerConfirm}
    >
      <UserTree onChoose={user => userRef.current = user} />
    </CommonModal>

  )
}

export default NiceModal.create(UserModal)