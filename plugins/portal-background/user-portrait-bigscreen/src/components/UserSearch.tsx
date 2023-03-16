import styled from 'styled-components'
import React, { useState } from 'react'
import { Drawer } from 'antd'

import Search from './Search'

const Button = styled.button`
  position: absolute;
  z-index: 10;
  right: 100px;
  top: 150px;
  cursor: pointer;
  background-color: transparent;
  border: none;
  color: #5EBFE9;
  font-size: 20px;
`

const StyledDrawer = styled(Drawer)`
  .ant-drawer-content {
    margin-top: 100px;
    height: auto;
  }
  .ant-drawer-body {
    padding: 0;
    background: transparent;
  }
`

const UserSearch = () => {

  const [open, setOpen] = useState(false)

  const onClose = () => {
    setOpen(false)
  }

  const openDrawer = () => {
    setOpen(true)
  }
  return (
    <React.Fragment>
      <Button onClick={openDrawer}>
        点击搜索
      </Button>
      <StyledDrawer 
        width={460} 
        visible={open} 
        destroyOnClose
        onClose={onClose} 
        placement='right'
        closable={false}
      >
        <Search />
      </StyledDrawer>
    </React.Fragment>
  )
}

export default UserSearch