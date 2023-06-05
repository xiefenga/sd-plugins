import React from 'react'
import { message } from 'antd'
import { useRequest } from 'ahooks'
import NiceModal from '@ebay/nice-modal-react'

import CommonModal from './CommonModal'
import { syncAccount } from '@/api/account'

const ConfirmModal: React.FC = () => {

  const modal = NiceModal.useModal()

  const { loading, run } = useRequest(syncAccount, {
    manual: true,
    onFinally() {
      modal.remove()
      message.success('同步成功')
    },
  })

  return (
    <CommonModal
      title='提示'
      onOk={run}
      modal={modal}
      confirmLoading={loading}
    >
      <h3>是否确定同步？</h3>
    </CommonModal>

  )
}

export default NiceModal.create(ConfirmModal)