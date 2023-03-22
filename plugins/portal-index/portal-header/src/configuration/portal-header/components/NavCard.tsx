import React from 'react'
import styled from 'styled-components'
import { CSS } from '@dnd-kit/utilities'
import { useSortable } from '@dnd-kit/sortable'
import { Button, Checkbox, Col, Input } from 'antd'
import { BusinessNav } from 'portal-shared/configuration'
import { AlignLeftOutlined, DeleteOutlined, PlusOutlined } from '@ant-design/icons'

import { StyledRow } from './drawer/SysNavDrawer'

const SortButton = styled.div`
  cursor: pointer;
  font-size: 18px;
`

interface NavCardProps {
  id: string
  nav: BusinessNav
  sortable: boolean
  onRemove: () => void
  openParamsMoal: () => void
  onNavUrlChange: (value: string) => void
  onNavNameChange: (value: string) => void
  onHashRouteChange: (checked: boolean) => void
}

const NavCard: React.FC<NavCardProps> = (props) => {

  const { 
    nav, 
    onRemove,
    sortable,
    openParamsMoal,
    onNavUrlChange, 
    onNavNameChange, 
    onHashRouteChange,
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
    <div {...boxProps}>
      <StyledRow>
        <Col span={2}>
          <SortButton {...listenerProps}>
            <AlignLeftOutlined rotate={-90} />
          </SortButton>
        </Col>
        <Col span={5}>
          <Input
            size='small'
            value={nav.name}
            placeholder='导航名称'
            onChange={e => onNavNameChange(e.target.value)}
          />
        </Col>
        <Col span={10}>
          <Input
            size='small'
            value={nav.url}
            placeholder='路由地址'
            onChange={e => onNavUrlChange(e.target.value)}
          />
        </Col>
        <Col span={3} style={{ textAlign: 'center' }}>
          <Checkbox
            checked={nav.isHash}
            onChange={e => onHashRouteChange(e.target.checked)}
          />
        </Col>
        <Col span={2}>
          <Button size='small' type='dashed' onClick={onRemove}>
            <DeleteOutlined />
          </Button>
        </Col>
        <Col span={2}>
          <Button size='small' type='dashed' onClick={openParamsMoal}>
            <PlusOutlined />
          </Button>
        </Col>
      </StyledRow>
    </div>
  )
}

export default NavCard