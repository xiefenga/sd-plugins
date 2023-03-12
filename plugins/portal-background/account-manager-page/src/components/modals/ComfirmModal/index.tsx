import { Modal } from 'antd'
import { cloneElement, isValidElement, ReactNode, useEffect, useRef } from 'react'
import './index.less'

interface ModalSettings {
  icon?: ReactNode,
  width?: number
  title: ReactNode
  content: ReactNode
  className?: string
  onConfirm?: (() => Promise<void>) | ((close: () => void) => void)
  onCancel?: () => void,
}

const useConfirmModal = (settings: ModalSettings) => {

  const {
    width,
    title,
    content,
    onConfirm,
    className,
    onCancel,
    icon = null,
  } = settings

  const modalRef = useRef<ReturnType<typeof Modal.confirm>>()

  const modalProps = {
    icon: isValidElement(icon)
      ? cloneElement<any>(icon, { className: 'customize-confirm-modal-icon' })
      : icon,
    width,
    title,
    content,
    className: `customize-confirm-modal ${className}`,
    okText: '确定',
    cancelText: '取消',
    onOk: onConfirm,
    onCancel: onCancel,
    maskClosable: true,
    closable: true,
  }

  useEffect(() => {
    modalRef.current?.update(modalProps)
  })


  return () => {
    modalRef.current = Modal.confirm(modalProps)
    return modalRef.current
  }
}


export default useConfirmModal