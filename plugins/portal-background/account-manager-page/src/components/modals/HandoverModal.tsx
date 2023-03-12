import { message } from 'antd'
import React, { useRef, useState } from 'react'
import NiceModal from '@ebay/nice-modal-react'

import { NOOP } from '@/util'
import { handover } from '@/api/account'
import HandoverTree from '../trees/HandoverTree'
import { UserAll_1 } from '@/types/api/account'
import CommonModal from './CommonModal'

type HandoverModalMode = 'delete' | 'record'

interface RecordMode {
  mode: 'record'
  onConfirm: (id: string) => void
}

interface DeleteMode {
  mode?: 'delete'
  refresh: () => void
  deleteAccounts: string[]
}

type HandoverModalProps = RecordMode | DeleteMode & { mode?: HandoverModalMode }

function isRecordMode(props: HandoverModalProps): props is RecordMode {
  return props.mode === 'record'
}

const HandoverModal: React.FC<HandoverModalProps> = (props) => {

  const modal = NiceModal.useModal()

  const [handoverId, setHandoverId] = useState('')

  const confirmFnRef = useRef(NOOP)

  if (isRecordMode(props)) {
    const { onConfirm } = props
    confirmFnRef.current = () => {
      onConfirm(handoverId)
      modal.resolve()
      modal.hide()
    }
  } else {
    const { refresh, deleteAccounts } = props
    confirmFnRef.current = async () => {
      try {
        await handover(handoverId, deleteAccounts)
        message.success('删除成功！')
        refresh()
        modal.hide()
      } catch (error: any) {
        if (error.data && error.data.message) {
          message.error(error.data.message, 5)
        } else {
          message.error('删除失败')
        }
      }
    }
  }

  const onInnerConfirm = async () => {
    if (!handoverId) {
      message.error('请选择交接人！')
    } else {
      confirmFnRef.current()
    }
  }

  const onChoose = (meta: UserAll_1 | null) => setHandoverId(meta?.id ?? '')

  return (
    <CommonModal
      modal={modal}
      title='删除并交接'
      onOk={onInnerConfirm}
    >
      <HandoverTree onChoose={onChoose} />
    </CommonModal>

  )
}

export default NiceModal.create(HandoverModal)