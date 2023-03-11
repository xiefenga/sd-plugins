import React from 'react'
import { useState } from 'react'
import { useRequest } from 'ahooks'
import styled from 'styled-components'
import { Drawer, Spin, message } from 'antd'
import NiceModal from '@ebay/nice-modal-react'
import { useModal, antdDrawer } from '@ebay/nice-modal-react'
import { arrayMove, SortableContext, sortableKeyboardCoordinates, verticalListSortingStrategy } from '@dnd-kit/sortable'
import { DndContext, closestCenter, KeyboardSensor, PointerSensor, useSensor, useSensors, type DragEndEvent } from '@dnd-kit/core'

import { AccordionMenuItem as MenuItem } from 'portal-shared'
import { getMenuGroup } from '@/api'
import { FormValue } from './MenuConfigModal'
import { MORE_MENU_ID } from '@/utils/constants'
import MenuCard from './MenuCard'
import MenuConfigModal from './MenuConfigModal'

const LoadingContent = styled.div`
  height: 100px;
`

const MORE_MENU = {
  data_id: MORE_MENU_ID,
  menuTypeTitle: '查看更多',
  menuType: '',
}

interface MenuDrawerProps {
  menuConfigList: MenuItem[]
  onSubmit: (val: MenuItem[]) => void
}

const MenuDrawer: React.FC<MenuDrawerProps> = (props) => {

  const { onSubmit, menuConfigList } = props

  const modal = useModal()

  const [menuList, setMenuList] = useState<MenuItem[]>([])

  const { loading } = useRequest(async () => {

    const group = await getMenuGroup()

    const menuList = group.concat(MORE_MENU).map(menu => {

      const config = menuConfigList.find(config => config.id === menu.data_id) ?? {}

      return {
        id: menu.data_id,
        type: menu.menuType,
        title: menu.menuTypeTitle,
        description: '',
        background: '',
        preview: '',
        ...config,
      }
    })
    setMenuList(menuList)
  })

  const renderDrawerContent = () => {
    if (loading) {
      return (
        <Spin tip='加载中...'>
          <LoadingContent />
        </Spin>
      )
    } else {

      return menuList.map(menu => {

        const openMenuModal = () => {
          NiceModal.show(MenuConfigModal, {
            title: menu.title,
            description: menu.description,
            background: menu.background,
            preview: menu.preview,
            onSubmit(value: FormValue) {
              menu.description = value.description
              menu.background = value.background
              menu.preview = value.preview
              setMenuList([...menuList])
            },
          })
        }

        return (
          <MenuCard
            id={menu.id}
            key={menu.id}
            title={menu.title}
            onEdit={openMenuModal}
            sortable={menu.id !== MORE_MENU_ID}
          />
        )
      })
    }
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
      setMenuList(list => {
        const oldIndex = list.findIndex(menu => menu.id === active.id)
        const newIndex = list.findIndex(menu => menu.id === over.id)
        return arrayMove(list, oldIndex, newIndex)
      })
    }
  }

  const onDrawerClose = () => {
    onSubmit(menuList)
    modal.hide()
  }

  return (
    <Drawer
      title='背景配置'
      placement='left'
      {...antdDrawer(modal)}
      onClose={onDrawerClose}
    >
      <DndContext
        sensors={sensors}
        onDragEnd={handleDragEnd}
        collisionDetection={closestCenter}
      >
        <SortableContext
          items={menuList.map(menu => menu.id)}
          strategy={verticalListSortingStrategy}
        >
          {renderDrawerContent()}
        </SortableContext>
      </DndContext>
    </Drawer>
  )
}

export default NiceModal.create(MenuDrawer)