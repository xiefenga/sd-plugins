import React, { useState } from 'react'
import NiceModal from '@ebay/nice-modal-react'

import SelectPanel from '../SelectPanel'
import { Office } from '@/types/components'
import OrganizationTree from '../trees/OrganizationTree'
import CommonModal from './CommonModal'

interface OfficeModalProp {
  initValue: Office
  onConfirm: (office: Office) => void
}

const OfficeModal: React.FC<OfficeModalProp> = ({ onConfirm, initValue }) => {
  const modal = NiceModal.useModal()

  const [office, setOffice] = useState(initValue)

  const onInnerConfirm = () => {
    onConfirm(office)
    modal.hide()
  }

  return (
    <CommonModal
      modal={modal}
      title='组织设置'
      onOk={onInnerConfirm}
    >
      <SelectPanel
        tip='组织'
        selected={office.office_name}
        selector={
          <OrganizationTree
            checked={office.officeId}
            onChoose={node => {
              setOffice({
                officeId: node?.id ?? '',
                office_name: node?.name ?? '',
              })
            }}
          />
        }
      />
    </CommonModal>
  )
}

export default NiceModal.create(OfficeModal)