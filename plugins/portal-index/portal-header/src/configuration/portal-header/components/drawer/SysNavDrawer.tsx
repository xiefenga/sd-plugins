import React from 'react'
import { useState } from 'react'
import { v4 as uuidv4 } from 'uuid'
import styled from 'styled-components'
import NiceModal from '@ebay/nice-modal-react'
import { BusinessNav } from 'portal-shared/configuration'
import { useModal, antdDrawer } from '@ebay/nice-modal-react'
import { Button, Col, Drawer, Empty, message, Row, Space } from 'antd'
import { arrayMove, SortableContext, sortableKeyboardCoordinates, verticalListSortingStrategy } from '@dnd-kit/sortable'
import { closestCenter, DndContext, DragEndEvent, KeyboardSensor, PointerSensor, useSensor, useSensors } from '@dnd-kit/core'

import NavCard from '../NavCard'
import PlusButton from '../PlusButton'
import ParamsModal from '../ParamsModal'

const StyledDrawer = styled(Drawer).attrs({
  width: 600,
  closeIcon: null,
  title: '导航配置',
  placement: 'left',
  destroyOnClose: true,
})``

export const StyledRow = styled(Row).attrs({ gutter: 20 })`
  font-weight: 700;
  margin-bottom: 15px;
`

interface SysNavDrawerProps {
  navs: BusinessNav[]
  onChange: (navs: BusinessNav[]) => void
}

const SysNavDrawer: React.FC<SysNavDrawerProps> = (props) => {

  const modal = useModal()

  const { navs, onChange } = props

  const [navList, setNavList] = useState<BusinessNav[]>(() => {
    return (
      JSON.parse(JSON.stringify(navs)) as BusinessNav[]
    ).map(item => {
      if (!item.id) {
        item.id = uuidv4()
      }
      return item
    })
  })

  const renderTitle = () => {
    return (
      <StyledRow>
        <Col span={2}></Col>
        <Col span={5}>名称</Col>
        <Col span={10}>URL</Col>
        <Col span={3} style={{ textAlign: 'center' }}>Hash</Col>
        <Col span={4} style={{ textAlign: 'center' }}>操作</Col>
      </StyledRow>
    )
  }

  const renderNavList = () => {

    if (navList.length === 0) {
      return (
        <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
      )
    }

    return navList.map((nav, index) => {

      const onNavNameChange = (value: string) => {
        nav.name = value
        setNavList([...navList])
      }

      const onNavUrlChange = (value: string) => {
        nav.url = value
        setNavList([...navList])
      }

      const onHashRouteChange = (checked: boolean) => {
        nav.isHash = checked
        setNavList([...navList])
      }

      const onRemove = () => {
        navList.splice(index, 1)
        setNavList([...navList])
      }

      const openParamsMoal = () => {
        NiceModal.show(ParamsModal, {
          initialParams: nav.params ?? [],
          onChange(params: any) {
            nav.params = params
            setNavList([...navList])
          },
        })
      }

      return (
        <NavCard
          sortable
          nav={nav}
          id={nav.id}
          key={nav.id}
          onRemove={onRemove}
          onNavUrlChange={onNavUrlChange}
          openParamsMoal={openParamsMoal}
          onNavNameChange={onNavNameChange}
          onHashRouteChange={onHashRouteChange}
        />
      )
    })
  }

  const onPlusButtonClick = () => {
    const last = navList[navList.length - 1]
    if (!last || (last.name && last.url)) {
      setNavList([...navList, { name: '', url: '', id: uuidv4() }])
    } else {
      message.warning('请先填写未完成的配置')
    }
  }

  const renderPlusButton = () => {
    return (
      <PlusButton onClick={onPlusButtonClick} />
    )
  }

  const onCancel = () => {
    modal.hide()
  }

  const onConfirm = () => {
    onChange(navList)
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
        console.log(oldIndex, newIndex)
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
          {renderNavList()}
        </SortableContext>
      </DndContext>
      {renderPlusButton()}
    </StyledDrawer>
  )
}

export default NiceModal.create(SysNavDrawer)