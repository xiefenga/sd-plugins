import React from 'react'
import { Button } from 'antd'
import styled from 'styled-components'
import { CSS } from '@dnd-kit/utilities'
import { useSortable } from '@dnd-kit/sortable'

const CardWrapper = styled.div`
  display: flex;
  margin: 20px 0px;
  border-radius: 5px;
  align-items: center;
  border: 1px dashed #d9d9d9;
  transition: border-color 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
  
  &:hover {
    border-color: #40a9ff;
  }

  &:first-child {
    margin-top: 0;
  }

  .title {
    margin: 0;
    font-size: 16px;
    font-weight: 700;
    flex: 1;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    padding: 15px 10px;
    user-select: none;
  }
`

interface SortableMenuCardProps {
  id: string
  title: string
  onEdit: () => void
  sortable?: boolean
}

type Props = SortableMenuCardProps

const MenuCard: React.FC<Props> = (props) => {

  const { title, onEdit, sortable = false } = props

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

  return (
    <CardWrapper ref={setNodeRef} style={style} {...attributes} >
      <div {...listenerProps} className='title'>
        {title}
      </div>
      <Button type='link' onClick={onEdit}>
        编辑
      </Button>
    </CardWrapper>
  )
}

export default MenuCard