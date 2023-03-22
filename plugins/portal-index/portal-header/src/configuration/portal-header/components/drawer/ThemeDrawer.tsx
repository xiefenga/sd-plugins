import React from 'react'
import styled from 'styled-components'
import { useState, useRef } from 'react'
import { DEFAULT_THEME  } from 'portal-shared'
import NiceModal from '@ebay/nice-modal-react'
import { Theme } from 'portal-shared/configuration'
import { Button, Drawer, message, Row, Space } from 'antd'
import { useModal, antdDrawer } from '@ebay/nice-modal-react'
import { arrayMove, SortableContext, sortableKeyboardCoordinates, verticalListSortingStrategy } from '@dnd-kit/sortable'
import { DndContext, closestCenter, KeyboardSensor, PointerSensor, useSensor, useSensors, type DragEndEvent } from '@dnd-kit/core'

import PlusButton from '../PlusButton'
import ThemeCard from '../theme/ThemeCard'
import ThemeModal from '../theme/ThemeModal'


const ThemeConfigDrawer = styled(Drawer).attrs({
  width: 450,
  closeIcon: null,
  title: '主题配置',
  placement: 'left',
  destroyOnClose: true,
})``

interface ThemeDrawerPorps {
  defaultLogo?: string
  themes: Theme[]
  onThemesChange: (themes: Theme[]) => void
}

const ThemeDrawer: React.FC<ThemeDrawerPorps> = (props) => {

  const modal = useModal()

  const { themes, onThemesChange, defaultLogo = '' } = props

  const defaultTheme = { ...DEFAULT_THEME, logo: defaultLogo }

  const ditryRef = useRef(false)

  const [themeList, setThemeList] = useState(() => [defaultTheme].concat(themes))

  const updateThemeList = (value: Theme[]) => {
    ditryRef.current = true
    setThemeList(value)
  }

  const openThemeModal = () => {
    NiceModal.show(ThemeModal, {
      onSubmit(theme: Theme) {
        updateThemeList(themeList.concat(theme))
      },
    })
  }

  const renderThemeList = () => {
    return themeList.map((theme, index) => {

      const openThemeModal = () => {
        NiceModal.show(ThemeModal, {
          theme,
          onSubmit(theme: Theme) {
            themeList[index] = theme
            updateThemeList([...themeList])
          },
        })
      }

      const onRemoveSelf = () => {
        themeList.splice(index, 1)
        updateThemeList([...themeList])
      }

      return (
        <ThemeCard
          id={theme.id}
          key={theme.id}
          logo={theme.logo}
          text={theme.name}
          sortable={index !== 0}
          isDefault={index === 0}
          onEdit={openThemeModal}
          onRemove={onRemoveSelf}
        />
      )
    })
  }

  const renderPlusButton = () => {
    return (
      <PlusButton onClick={openThemeModal} />
    )
  }

  const onCancel = () => {
    modal.hide()
  }

  const onConfirm = () => {
    onThemesChange(themeList.slice(1))
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

  const DrawerProps = {
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
      setThemeList(list => {
        const oldIndex = list.findIndex(menu => menu.id === active.id)
        const newIndex = list.findIndex(menu => menu.id === over.id)
        return arrayMove(list, oldIndex, newIndex)
      })
    }
  }

  return (
    <ThemeConfigDrawer {...DrawerProps}>
      <DndContext
        sensors={sensors}
        onDragEnd={handleDragEnd}
        collisionDetection={closestCenter}
      >
        <SortableContext
          items={themeList.map(theme => theme.id)}
          strategy={verticalListSortingStrategy}
        >
          {renderThemeList()}
        </SortableContext>
      </DndContext>
      {renderPlusButton()}
    </ThemeConfigDrawer>
  )
}

export default NiceModal.create(ThemeDrawer)