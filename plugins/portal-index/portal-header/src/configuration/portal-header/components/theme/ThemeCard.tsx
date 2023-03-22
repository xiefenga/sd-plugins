import React from 'react'
import styled from 'styled-components'
import { CSS } from '@dnd-kit/utilities'
import { useSortable } from '@dnd-kit/sortable'
import { Button, Image, Popconfirm } from 'antd'

const ThemeCardWrapper = styled.div`
  display: flex;
  margin: 20px 0;
  border-radius: 5px;
  padding: 15px 10px;
  border: 1px dashed #d9d9d9;
  transition: border-color 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
  
  &:hover {
    border-color: #40a9ff;
  }

  &:first-child {
    margin-top: 0;
  }

  .title-box {
    flex: 1;
    display: flex;
    align-items: center;
  }

  .title {
    margin: 0;
    font-size: 16px;
    font-weight: 700;
    overflow: hidden;
    flex: 1;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .ant-image {
    display: flex;
    align-items: center;
    margin-right: 10px;
  }
`

interface ThemeCardProps {
  id: string
  logo: string
  text: string
  isDefault?: boolean
  sortable: boolean
  onEdit: () => void
  onRemove: () => void
}

const ThemeCard: React.FC<ThemeCardProps> = (props) => {

  const { logo, text, onEdit, onRemove, isDefault = false, sortable } = props

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
    <ThemeCardWrapper {...boxProps} >
      <div {...listenerProps} className='title-box'>
        <Image
          src={logo}
          width={88}
          height={20}
          preview={false}
          draggable={false}
        />
        <p className='title'>{ text }</p>
      </div>
      <div className='btn'>
        <Button disabled={isDefault} type='link' size='small' onClick={onEdit}>
          编辑
        </Button>
        <Popconfirm
          okText='确认'
          cancelText='取消'
          title='确认删除?'
          onConfirm={onRemove}
        >
          <Button disabled={isDefault} type='link' size='small'>
            删除
          </Button>
        </Popconfirm>
      </div>
    </ThemeCardWrapper>
  )
}

export default ThemeCard