import React from 'react'
import { useState } from 'react'
import { SubNav } from 'portal-shared'
import styled from 'styled-components'
import NiceModal from '@ebay/nice-modal-react'
import { DeleteOutlined } from '@ant-design/icons'
import { useModal, antdDrawer } from '@ebay/nice-modal-react'
import { Button, Col, Drawer, Empty, Input, message, Popconfirm, Row, Space } from 'antd'

import PlusButton from '../PlusButton'

const StyledDrawer = styled(Drawer).attrs({
  width: 500,
  title: '下级配置',
  closeIcon: null,
  placement: 'left',
  destroyOnClose: true,
})``

const StyledRow = styled(Row).attrs({ gutter: 20 })`
  font-weight: 700;
  margin-bottom: 10px;
`

const StyledPopConfirm = styled(Popconfirm).attrs({
  okText: '确认',
  cancelText: '取消',
  title: '确认删除?',
})``

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
        <Col span={8}>名称</Col>
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
        <StyledRow key={index}>
          <Col span={8}>
            <Input
              value={nav.name}
              onChange={e => onNavNameChange(e.target.value)}
            />
          </Col>
          <Col span={12}>
            <Input
              value={nav.url}
              onChange={e => onNavUrlChange(e.target.value)}
            />
          </Col>
          <Col span={4}>
            <StyledPopConfirm onConfirm={onRemove}>
              <Button type='dashed'>
                <DeleteOutlined />
              </Button>
            </StyledPopConfirm>
          </Col>
        </StyledRow>
      )
    })
  }

  const onPlusClick = () => {
    const lastNav = navList[navList.length - 1]
    if (!lastNav || (lastNav.url && lastNav.name)) {
      setNavList([...navList, { name: '', url: '' }])
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

  return (
    <StyledDrawer {...drawerProps}>
      {renderTitle()}
      {renderSubNavs()}
      {renderPlusButton()}
    </StyledDrawer>
  )
}

export default NiceModal.create(SubNavDrawer)