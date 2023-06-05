import { message } from 'antd'
import React, { useRef } from 'react'
import NiceModal from '@ebay/nice-modal-react'

import { Office, User } from '@/types'
import CommonModal from './CommonModal'
import UserTree from '@/components/trees/UserTree'
import { queryExistedUser } from '@/api/account'
import { useBoolean } from 'ahooks'

interface BussinessUser {
  MC: string
   SFZHM: string
}

interface UserModalProsp {
  user: BussinessUser | null
  office: Office| null
  onConfirm: (office: Office, user: User) => void
}

const UserModal: React.FC<UserModalProsp> = ({ user, office, onConfirm }) => {

  const modal = NiceModal.useModal()

  const userRef = useRef<BussinessUser | null>(user)

  const officeRef = useRef<Office | null>(office)

  const [loading, { setTrue, setFalse }] = useBoolean(false)

  const onInnerConfirm = async () => {
    if (userRef.current && officeRef.current) {
      const { MC: name, SFZHM: no } = userRef.current
      try {
        setTrue()
        const users = await queryExistedUser(no)
        if (users.length) {
          message.error('当前用户已存在')
        } else {
          const user = { name, no }
          onConfirm(officeRef.current, user)
          modal.remove()
        }
      } catch (error) {
        message.error('用户信息查询失败')
        console.error(error)
      } finally {
        setFalse()
      }
    } else {
      message.error('请选择用户！')
    }
  }

  return (
    <CommonModal
      title='用户选择'
      modal={modal}
      onOk={onInnerConfirm}
      confirmLoading={loading}
    >
      <UserTree 
        initKey={user?.SFZHM}
        onChoose={choose => {
          userRef.current = choose?.user ?? null
          officeRef.current = choose?.office ?? null
        }}
      />
    </CommonModal>

  )
}

export default NiceModal.create(UserModal)