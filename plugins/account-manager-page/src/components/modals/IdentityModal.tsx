import { Form } from 'antd'
import { v4 as uuidv4 } from 'uuid'
import React, { useState } from 'react'
import NiceModal from '@ebay/nice-modal-react'
import IdentityForm from '../forms/IdentityForm'
import { IdentityFormIns, IdentityFormValue } from '@/types/components'
import CommonModal from './CommonModal'

const DEFAULT_IDENTITY_VALUE = {
  officeId: '',
  office_name: '',
  userName: '',
  roleList: [],
  roleNameList: [],
}

interface IdentityModalProps {
  identityList: IdentityFormValue[]
  initValue?: IdentityFormValue
  onConfirm?: (val: IdentityFormValue) => void
}

// const NECESSARY_KEYS = ['userName', 'officeId', 'roleList', 'leader', 'authority']

const IdentityModal: React.FC<IdentityModalProps> = (props) => {

  const {
    identityList,
    initValue = { ...DEFAULT_IDENTITY_VALUE, _key: uuidv4() },
    onConfirm = () => { },
  } = props

  const modal = NiceModal.useModal()

  const [identityForm] = Form.useForm<IdentityFormIns>()

  const [identityValue, setIdentityValue] = useState<IdentityFormValue>(initValue)

  const onInnerConfirm = async () => {
    try {
      await identityForm.validateFields()
      onConfirm(identityValue)
      modal.hide()
    } catch (_) {
    // 
    }
  }

  return (
    <CommonModal
      title='身份设置'
      modal={modal}
      onOk={onInnerConfirm}
    >
      <IdentityForm
        form={identityForm}
        identityList={identityList}
        identityValue={identityValue}
        setIdentityValue={setIdentityValue}
      />
    </CommonModal>
    
  )
}

export default NiceModal.create(IdentityModal)