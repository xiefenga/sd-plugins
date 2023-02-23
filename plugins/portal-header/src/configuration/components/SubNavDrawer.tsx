import React from 'react'
import { useState } from 'react'
import styled from 'styled-components'
import NiceModal from '@ebay/nice-modal-react'
import { useModal, antdDrawer } from '@ebay/nice-modal-react'
import { PlusOutlined, DeleteOutlined } from '@ant-design/icons'
import { Button, Col, Drawer, Input, message, Row, Space } from 'antd'

const TitleRow = styled(Row).attrs({ gutter: 20 })`
  font-size: 16px;
  font-weight: 700;
  margin-bottom: 10px;
  text-align: center;
`

const EditRow = styled(Row).attrs({ gutter: 20 })`
  margin-top: 10px;
  text-align: center;
`

const AddButton = styled(Button).attrs({ type: 'text', size: 'small' })``

interface SingleEditRowProps {
  nav: Nav
  setNav: (nav: Nav) => void
  removeSelf: () => void
}

const SingleEditRow: React.FC<SingleEditRowProps> = (props) => {

  const { nav, setNav, removeSelf } = props

  return (
    <EditRow>
      <Col span={7}>
        <Input
          size='small'
          value={nav.name}
          onChange={e => setNav({ ...nav, name: e.target.value })}
        />
      </Col>
      <Col span={12}>
        <Input
          size='small'
          value={nav.url}
          onChange={e => setNav({ ...nav, url: e.target.value })}
        />
      </Col>
      <Col span={5}>
        <AddButton onClick={removeSelf}>
          <DeleteOutlined />
        </AddButton>
      </Col>
    </EditRow>
  )
}

interface Nav {
  name: string
  url: string
}

interface SubNavDrawerProps {
  subNavs: Nav[]
  setSubNavs: (navs: Nav[]) => void
}

const SubNavDrawer: React.FC<SubNavDrawerProps> = (props) => {

  const { subNavs, setSubNavs } = props

  const modal = useModal()

  const [navs, setNavs] = useState([...subNavs])

  const addNav = () => {
    const lastNav = navs.at(-1)
    if (!lastNav || (lastNav.url && lastNav.name)) {
      setNavs([...navs, { name: '', url: '' }])
    } else {
      message.warning('请先填写未完成的配置')
    }
  }

  const onCancal = () => {
    modal.hide()
  }

  const onConfirm = () => {
    setSubNavs(navs.filter(nav => nav.url && nav.name))
  }

  const DrawerFooter = (
    <Row justify='center'>
      <Space size='middle'>
        <Button onClick={onCancal}>取消</Button>
        <Button type='primary' onClick={onConfirm}>确认</Button>
      </Space>
    </Row>
  )

  return (
    <Drawer
      title='下级配置'
      destroyOnClose
      placement='left'
      closeIcon={null}
      footer={DrawerFooter}
      {...antdDrawer(modal)}
    >
      <TitleRow>
        <Col span={7}>下级名称</Col>
        <Col span={12}>地址</Col>
        <Col span={5}>
          <AddButton onClick={addNav}>
            <PlusOutlined />
          </AddButton>
        </Col>
      </TitleRow>

      {navs.map((nav, index) => (
        <SingleEditRow
          key={nav.name}
          nav={nav}
          setNav={(nav) => {
            navs[index] = nav
            setNavs([...navs])
          }}
          removeSelf={() => {
            navs.splice(index, 1)
            setNavs([...navs])
          }}
        />
      ))}
    </Drawer>
  )
}

export default NiceModal.create(SubNavDrawer)