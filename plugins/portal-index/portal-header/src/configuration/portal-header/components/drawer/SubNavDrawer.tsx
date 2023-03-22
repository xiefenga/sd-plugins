import React from 'react'
import { useState } from 'react'
import { v4 as uuidv4 } from 'uuid'
import styled from 'styled-components'
import NiceModal from '@ebay/nice-modal-react'
import { SubNav } from 'portal-shared/configuration'
import { useModal, antdDrawer } from '@ebay/nice-modal-react'
import { Button, Col, Drawer, Empty, message, Row, Space } from 'antd'
import PlusButton from '../PlusButton'
import { arrayMove, SortableContext, sortableKeyboardCoordinates, verticalListSortingStrategy } from '@dnd-kit/sortable'
import { closestCenter, DndContext, DragEndEvent, KeyboardSensor, PointerSensor, useSensor, useSensors } from '@dnd-kit/core'
import SubNavCard from '../SubNavCard'

const StyledDrawer = styled(Drawer).attrs({
  width: 540,
  title: '下级配置',
  closeIcon: null,
  placement: 'left',
  destroyOnClose: true,
})``

const StyledRow = styled(Row).attrs({ gutter: 20 })`
  font-weight: 700;
  margin-bottom: 10px;
`

interface SubNavDrawerProps {
  navs: SubNav[]
  onChange: (navs: SubNav[]) => void
}

const SubNavDrawer: React.FC<SubNavDrawerProps> = (props) => {

  const { navs, onChange } = props

  const modal = useModal()

  const [navList, setNavList] = useState([...navs])

  const onCancel = () => {
    modal.hide()
  }

  const onConfirm = () => {
    onChange(navList.filter(nav => nav.url && nav.name))
    modal.hide()
  }

  const DrawerFooter = (
    <Row justify='center'>
      <Space size='middle'>
        <Button onClick={onCancel}>取消</Button>
        <Button type='primary' onClick={onConfirm}>确认</Button>
      </Space>
    </Row>
  )

  const renderTitle = () => {
    return (
      <StyledRow>
        <Col span={2}></Col>
        <Col span={6}>名称</Col>
        <Col span={12}>URL</Col>
      </StyledRow>
    )
  }

  const renderSubNavs = () => {
    if (navList.length === 0) {
      return (
        <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
      )
    }

    return navList.map((nav, index) => {

      const onNavNameChange = (value: string) => {
        navList[index].name = value
        setNavList([...navList])
      }

      const onNavUrlChange = (value: string) => {
        navList[index].url = value
        setNavList([...navList])
      }

      const onRemove = () => {
        navList.splice(index, 1)
        setNavList([...navList])
      }

      return (
        <SubNavCard 
          sortable
          nav={nav}
          id={nav.id}
          key={nav.id}
          onRemove={onRemove}
          onNavUrlChange={onNavUrlChange}
          onNavNameChange={onNavNameChange}
        />
      )
    })
  }

  const onPlusClick = () => {
    const lastNav = navList[navList.length - 1]
    if (!lastNav || (lastNav.url && lastNav.name)) {
      setNavList([...navList, { name: '', url: '', id: uuidv4() }])
    } else {
      message.warning('请先填写未完成的配置')
    }
  }

  const renderPlusButton = () => {
    return (
      <PlusButton onClick={onPlusClick} />
    )
  }

  const drawerProps = {
    ...antdDrawer(modal),
    footer: DrawerFooter,
  }

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  )

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event
    if (over === null) {
      message.error('handleDragEnd over 为空')
    } else if (active.id !== over.id) {
      setNavList(list => {
        const oldIndex = list.findIndex(nav => nav.id === active.id)
        const newIndex = list.findIndex(nav => nav.id === over.id)
        return arrayMove(list, oldIndex, newIndex)
      })
    }
  }

  return (
    <StyledDrawer {...drawerProps}>
      {renderTitle()}
      <DndContext
        sensors={sensors}
        onDragEnd={handleDragEnd}
        collisionDetection={closestCenter}
      >
        <SortableContext
          items={navList.map(nav => nav.id)}
          strategy={verticalListSortingStrategy}
        >
          {renderSubNavs()}
        </SortableContext>
      </DndContext>
      {renderPlusButton()}
    </StyledDrawer>
  )
}

export default NiceModal.create(SubNavDrawer)