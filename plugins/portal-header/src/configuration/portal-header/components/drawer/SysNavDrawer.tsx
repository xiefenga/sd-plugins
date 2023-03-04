import React, { useState } from 'react'
import styled from 'styled-components'
import NiceModal from '@ebay/nice-modal-react'
import { useModal, antdDrawer } from '@ebay/nice-modal-react'
import { Button, Col, Drawer, Empty, Input, message, Row } from 'antd'

{/* <Col span={8}>
          <Select
            style={{ width: '100%' }}
            placeholder='请选择参数'
            options={[
              { label: '用户ID', value: 'id' },
              { label: '用户登录账号', value: 'loginName' },
              { label: '用户SSOCode', value: 'ssocode' },
            ]}
          />
        </Col> */}

import { BusinessNav } from '@/types'
import PlusButton from '../PlusButton'
import { DeleteOutlined } from '@ant-design/icons'

const StyledDrawer = styled(Drawer).attrs({
  width: 500,
  closeIcon: null,
  title: '导航配置',
  placement: 'left',
  destroyOnClose: true,
})``

const StyledRow = styled(Row).attrs({ gutter: 20 })`
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

      return (
        <div key={index}>
          <StyledRow>
            <Col span={8}>
              <Input value={nav.name} onChange={e => onNavNameChange(e.target.value)} />
            </Col>
            <Col span={12}>
              <Input value={nav.url} onChange={e => onNavUrlChange(e.target.value)} />
            </Col>
            <Col span={4}>
              <Button type='dashed' onClick={onRemove}>
                <DeleteOutlined />
              </Button>
            </Col>
          </StyledRow>
          {/* params */}
          {/* <Row></Row> */}
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

  const onDrawerClose = () => {
    onChange(navList)
    modal.hide()
  }

  const drawerProps = {
    ...antdDrawer(modal),
    onClose: onDrawerClose,
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