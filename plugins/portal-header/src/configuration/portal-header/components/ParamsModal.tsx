import React, { useState } from 'react'
import { Col, Input, Modal, Select } from 'antd'
import NiceModal from '@ebay/nice-modal-react'
import { useModal, antdModal } from '@ebay/nice-modal-react'
import PlusButton from './PlusButton'
import { StyledRow } from './drawer/SysNavDrawer'
import { BusinessNav, ParamOption } from 'portal-shared'

type ParamType = Partial<NonNullable<BusinessNav['params']>[0]>

interface ParamsModalProps {
  initialParams: NonNullable<BusinessNav['params']>
  onChange: (params: NonNullable<BusinessNav['params']>) => void
}

function isParam(param: any): param is NonNullable<BusinessNav['params']>[0] {
  return param.name && param.name.trim() !== '' && param.option && param.option.trim() !== ''
}

const ParamsModal: React.FC<ParamsModalProps> = (props) => {

  const modal = useModal()

  const { initialParams, onChange } = props

  const [paramsList, setParamsList] = useState<ParamType[]>(initialParams)

  const renderTitle = () => {
    return (
      <StyledRow>
        <Col span={8}>参数名</Col>
        <Col span={12}>参数值</Col>
      </StyledRow>
    )
  }

  const renderParamsList = () => {
    return paramsList.map((param, index) => {

      const onParamNameChange = (value: string) => {
        param.name = value
        setParamsList([...paramsList])
      }

      const onParamOptionChange = (value: ParamOption) => {
        param.option = value
        setParamsList([...paramsList])
      }

      return (
        <div key={index}>
          <StyledRow>
            <Col span={8}>
              <Input 
                value={param.name}
                onChange={e => onParamNameChange(e.target.value)}
                placeholder='请输入参数名'
              />
            </Col>
            <Col span={12}>
              <Select
                allowClear
                value={param.option}
                placeholder='请选择参数'
                style={{ width: '100%' }}
                onChange={value => onParamOptionChange(value)}
                options={[
                  { label: '用户ID', value: 'id' },
                  { label: '用户登录账号', value: 'loginName' },
                  { label: '用户SSOCode', value: 'SSOCode' },
                ]}
              />
            </Col>
          </StyledRow>
        </div>
      )
    })
  }

  const onModalOkClick = () => {
    onChange(
      paramsList.filter<NonNullable<BusinessNav['params']>[0]>(isParam)
    )
    modal.hide()
  }

  return (
    <Modal 
      title='参数配置'
      okText='确认'
      cancelText='取消'
      {...antdModal(modal)}
      onOk={onModalOkClick}
    >
      {renderTitle()}
      {renderParamsList()}
      <PlusButton onClick={() => setParamsList([...paramsList, {}])} />
    </Modal>
  )
}

export default NiceModal.create(ParamsModal)