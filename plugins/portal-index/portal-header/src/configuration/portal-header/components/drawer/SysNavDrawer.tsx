import React from 'react'
import { useState } from 'react'
import styled from 'styled-components'
import { BusinessNav } from 'portal-shared'
import NiceModal from '@ebay/nice-modal-react'
import { useModal, antdDrawer } from '@ebay/nice-modal-react'
import { DeleteOutlined, PlusOutlined } from '@ant-design/icons'
import { Button, Col, Drawer, Empty, Input, message, Row, Space } from 'antd'

import PlusButton from '../PlusButton'
import ParamsModal from '../ParamsModal'

const StyledDrawer = styled(Drawer).attrs({
  width: 500,
  closeIcon: null,
  title: '导航配置',
  placement: 'left',
  destroyOnClose: true,
})``

export const StyledRow = styled(Row).attrs({ gutter: 20 })`
  font-weight: 700;
  margin-bottom: 10px;
`

interface SysNavDrawerProps {
  navs: BusinessNav[]
  onChange: (navs: BusinessNav[]) => void
}

const SysNavDrawer: React.FC<SysNavDrawerProps> = (props) => {

  const modal = useModal()

  const { navs, onChange } = props

  const [navList, setNavList] = useState(navs)

  const renderTitle = () => {
    return (
      <StyledRow>
        <Col span={8}>名称</Col>
        <Col span={12}>URL</Col>
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
        <div key={index}>
          <StyledRow>
            <Col span={8}>
              <Input value={nav.name} onChange={e => onNavNameChange(e.target.value)} />
            </Col>
            <Col span={10}>
              <Input value={nav.url} onChange={e => onNavUrlChange(e.target.value)} />
            </Col>
            <Col span={3}>
              <Button type='dashed' onClick={onRemove}>
                <DeleteOutlined />
              </Button>
            </Col>
            <Col span={3}>
              <Button type='dashed' onClick={openParamsMoal}>
                <PlusOutlined />
              </Button>
            </Col>
          </StyledRow>
        </div>
      )
    })
  }

  const onPlusButtonClick = () => {
    const last = navList.at(-1)
    if (!last || (last.name && last.url)) {
      setNavList([...navList, { name: '', url: '' }])
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

  return (
    <StyledDrawer {...drawerProps}>
      {renderTitle()}
      {renderNavList()}
      {renderPlusButton()}
    </StyledDrawer>
  )
}

export default NiceModal.create(SysNavDrawer)