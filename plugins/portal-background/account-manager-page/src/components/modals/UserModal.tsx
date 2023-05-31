import { message } from 'antd'
import React, { useRef } from 'react'
import NiceModal from '@ebay/nice-modal-react'

import { Office, User } from '@/types'
import CommonModal from './CommonModal'
import UserTree from '@/components/trees/UserTree'
import { BussinessUserResp } from '@/types/api/account'

interface UserModalProsp {
  onConfirm: (office: Office, user: User) => void
}

const UserModal: React.FC<UserModalProsp> = ({ onConfirm }) => {

  const modal = NiceModal.useModal()

  const userRef = useRef<BussinessUserResp | null>()

  const officeRef = useRef<Office | null>()

  const onInnerConfirm = () => {
    if (userRef.current && officeRef.current) {
      const { MC: name, SFZHM: no } = userRef.current
      const user = { name, no }
      onConfirm(officeRef.current, user)
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
      <UserTree onChoose={choose => {
        userRef.current = choose?.user ?? null
        officeRef.current = choose?.office ?? null
      }} />
    </CommonModal>

  )
}

export default NiceModal.create(UserModal)