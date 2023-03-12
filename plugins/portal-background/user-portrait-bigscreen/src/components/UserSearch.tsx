import styled from 'styled-components'
import React, { useState } from 'react'

import Search from './Search'
import Drawer from '@/components/Drawer'

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
      <Drawer 
        width={460} 
        open={open} 
        destroyOnClose
        onClose={onClose} 
        placement='right'
      >
        <Search />
      </Drawer>
    </React.Fragment>
  )
}

export default UserSearch