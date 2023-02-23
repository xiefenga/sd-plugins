import React from 'react'
import styled from 'styled-components'

import UserInfo from './UserInfo'
import { useStore } from '@/hooks'
import SubNavigation from './SubNavigation'

const HeaderTopWrapper = styled.div`
  width: 100%;
  height: 120px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  position: relative;

  svg {
    width: 10px;
    height: 10px;
    font-size: 12px;
    margin-left: 2px;
  }
`

const logoImg = styled.img.attrs({ draggable: false })

const Logo = logoImg`
  width: 260px;
  height: 60px;
  object-fit: cover;
`

const HeaderTop: React.FC = () => {
  const { theme } = useStore()
  return (
    <HeaderTopWrapper>
      <SubNavigation />
      <Logo src={theme.logo} />
      <UserInfo />
    </HeaderTopWrapper>
  )
}

export default HeaderTop