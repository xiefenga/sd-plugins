import React from 'react'
import { Modal } from 'antd'
import { useRef } from 'react'
import NiceModal from '@ebay/nice-modal-react'
import { Theme } from 'portal-shared/configuration'
import { useModal, antdModal } from '@ebay/nice-modal-react'

import ThemeForm, { ThemeFormRefProps } from './ThemeForm'

interface ThemeModalProps {
  theme?: Theme
  onSubmit?: (theme: Theme) => void
}

const modalText = {
  okText: '确认',
  cancelText: '取消',
  title: '编辑主题',
}

const ThemeModal: React.FC<ThemeModalProps> = (props) => {

  const { theme, onSubmit } = props

  const modal = useModal()

  const themeFormRef = useRef<ThemeFormRefProps>()

  const onModalClickOk = () => {
    themeFormRef.current?.submit()
  }

  const onModalSubmit = (theme: Theme) => {
    onSubmit?.(theme)
    modal.hide()
  }

  return (
    <Modal
      {...modalText}
      {...antdModal(modal)}
      onOk={onModalClickOk}
    >
      <ThemeForm 
        theme={theme} 
        ref={themeFormRef}
        onSubmit={onModalSubmit}
      />
    </Modal>
  )
}

export default NiceModal.create(ThemeModal)