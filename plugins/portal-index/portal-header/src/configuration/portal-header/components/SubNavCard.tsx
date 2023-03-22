import React from 'react'
import styled from 'styled-components'
import { CSS } from '@dnd-kit/utilities'
import { useSortable } from '@dnd-kit/sortable'
import { Button, Col, Input, Popconfirm } from 'antd'
import { SubNav } from 'portal-shared/configuration'
import { AlignLeftOutlined, DeleteOutlined } from '@ant-design/icons'

import { StyledRow } from './drawer/SysNavDrawer'

const StyledPopConfirm = styled(Popconfirm).attrs({
  okText: '确认',
  cancelText: '取消',
  title: '确认删除?',
})``

const SortButton = styled.div`
  cursor: pointer;
  font-size: 18px;
`

interface SubNavCardProps {
  id: string
  nav: SubNav
  sortable: boolean
  onRemove: () => void
  onNavUrlChange: (value: string) => void
  onNavNameChange: (value: string) => void
}

const SubNavCard: React.FC<SubNavCardProps> = (props) => {

  const { 
    nav, 
    sortable,
    onRemove, 
    onNavUrlChange, 
    onNavNameChange, 
  } = props

  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({ id: props.id })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  }

  const listenerProps = sortable ? listeners : {}

  const boxProps = sortable ? {
    style,
    ref: setNodeRef,
    ...attributes,
  }: {}

  return (
    <StyledRow {...boxProps}>
      <Col span={2}>
        <SortButton {...listenerProps}>
          <AlignLeftOutlined rotate={-90} />
        </SortButton>
      </Col>
      <Col span={6}>
        <Input
          size='small'
          value={nav.name}
          placeholder='下级名称'
          onChange={e => onNavNameChange(e.target.value)}
        />
      </Col>
      <Col span={12}>
        <Input
          size='small'
          value={nav.url}
          placeholder='下级地址'
          onChange={e => onNavUrlChange(e.target.value)}
        />
      </Col>
      <Col span={2}>
        <StyledPopConfirm onConfirm={onRemove}>
          <Button type='dashed'>
            <DeleteOutlined />
          </Button>
        </StyledPopConfirm>
      </Col>
    </StyledRow>
  )
}

export default SubNavCard