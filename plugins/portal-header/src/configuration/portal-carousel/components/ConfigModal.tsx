import React from 'react'
import { Modal } from 'antd'
import NiceModal from '@ebay/nice-modal-react'
import { useModal, antdModal } from '@ebay/nice-modal-react'

const ConfigModal: React.FC = () => {

  const modal = useModal()

  return (
    <Modal
      closeIcon={null}
      title='图片轮播配置'
      {...antdModal(modal)}
    >
      ConfigModal
    </Modal>
  )
}

export default NiceModal.create(ConfigModal)