import React from 'react'
import { Button } from 'antd'
import './index.less'

interface IdentityPanelProps {
  isDefault?: boolean
  identityName: string
  onEditClick?: React.MouseEventHandler<HTMLButtonElement>
  onDeleteClick?: React.MouseEventHandler<HTMLButtonElement>
  onSetDefaultClick?: React.MouseEventHandler<HTMLButtonElement>
}

const IdentityPanel: React.FC<IdentityPanelProps> = (props) => {

  const { 
    identityName, 
    isDefault = false,
    onEditClick, 
    onDeleteClick,
    onSetDefaultClick,
  } = props

  return (
    <div className='identity-panel'>
      <div className='identity-name'>
        <div>{identityName}</div>
        {isDefault && (
          <div className='default-tag'>默认</div>
        )}
      </div>
      <div>
        {!isDefault && (
          <Button type='link' onClick={onSetDefaultClick}>
            设为默认
          </Button>
        )}
        <Button type='link' onClick={onEditClick}>
          编辑
        </Button>
        <Button type='link' onClick={onDeleteClick}>
          删除
        </Button>
      </div>
    </div>
  )
}

export default IdentityPanel