import React from 'react'
import styled from 'styled-components'
import { Button, ButtonProps } from 'antd'
import { PlusOutlined } from '@ant-design/icons'

const PlusAntdButton = styled(Button).attrs({
  block: true,
  type: 'dashed',
  children: <PlusOutlined />,
})`
  height: 40px;
  margin-top: 20px;
`

type PlusButtonProps = Omit<ButtonProps, 'block' | 'type' | 'children'>

const PlusButton: React.FC<PlusButtonProps> = (props) => {
  return (
    <PlusAntdButton {...props} />
  )
}

export default PlusButton