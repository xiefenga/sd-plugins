import { Modal, ModalProps } from 'antd'
import React, { PropsWithChildren } from 'react'
import { antdModal, NiceModalHandler } from '@ebay/nice-modal-react'
import './index.less'


interface CommonModalBaseProps {
  modal: NiceModalHandler<Record<string, unknown>>
}

export type CommonModalProps = PropsWithChildren<
  CommonModalBaseProps & 
  Omit<ModalProps, 'visible' | 'open' | 'onCancel' | 'afterClose' | 'className'>
>

const className='common-customize-modal'

const defaultProps = {
  className,
  centered: true,
  destroyOnClose: true,
}

const CommonModal: React.FC<CommonModalProps> = (props) => {

  const { modal, children, ...wrapperProps } = props
  
  const injection = antdModal(modal)

  const modalProps = {
    ...injection,
    ...defaultProps,
    ...wrapperProps,
  }

  return (
    <Modal {...modalProps}>
      {children}
    </Modal>
  )
}

export default CommonModal