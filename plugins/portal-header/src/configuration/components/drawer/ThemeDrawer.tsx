import React from 'react'
import { Drawer } from 'antd'
import styled from 'styled-components'
import { useState, useRef } from 'react'
import NiceModal from '@ebay/nice-modal-react'
import { useModal, antdDrawer } from '@ebay/nice-modal-react'

import { Theme } from '@/types'
import PlusButton from '../PlusButton'
import ThemeCard from '../theme/ThemeCard'
import ThemeModal from '../theme/ThemeModal'
import { DEFAULT_THEME } from '@/utils/constants'

const ThemeConfigDrawer = styled(Drawer).attrs({
  width: 450,
  closeIcon: null,
  title: '主题配置',
  placement: 'left',
  destroyOnClose: true,
})``

interface ThemeDrawerPorps {
  themes: Theme[]
  onThemesChange: (themes: Theme[]) => void
}

const ThemeDrawer: React.FC<ThemeDrawerPorps> = (props) => {

  const modal = useModal()

  const { themes, onThemesChange } = props

  const ditryRef = useRef(false)

  const [themeList, setThemeList] = useState(() => [DEFAULT_THEME].concat(themes))

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
          key={theme.name}
          logo={theme.logo}
          text={theme.name}
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

  const onDrawerClose = () => {
    onThemesChange(themeList.slice(1))
    modal.hide()
    // if (ditryRef.current) {
    //   Modal.confirm({
    //     okText: '确认',
    //     cancelText: '取消',
    //     title: '确认修改主题',
    //     onOk() {
    //       onThemesChange(themeList.slice(1))
    //       modal.hide()
    //     },
    //     onCancel() {
    //       modal.hide()
    //     },
    //   })
    // } else {
    //   modal.hide()
    // }
  }

  const DrawerProps = {
    ...antdDrawer(modal),
    onClose: onDrawerClose,
  }

  return (
    <ThemeConfigDrawer {...DrawerProps}>
      {renderThemeList()}
      {renderPlusButton()}
    </ThemeConfigDrawer>
  )
}

export default NiceModal.create(ThemeDrawer)