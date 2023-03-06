import React from 'react'
import styled from 'styled-components'
import { useStore } from 'portal-shared'

import UserInfo from './UserInfo'
import SubNavigation from './SubNavigation'
import { defaultLogo } from '@/utils/assets'

const HeaderTopWrapper = styled.div`
  width: 100%;
  height: 120px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  position: relative;

  svg {
    width: 12px;
    height: 10px;
    font-size: 14px;
    margin-left: 3px;
  }
`

const logoImg = styled.img.attrs({ draggable: false })

const Logo = logoImg`
  width: 260px;
  height: 60px;
  object-fit: cover;
`

const HeaderTop: React.FC = () => {
  const theme = useStore(state => {
    if (state.theme.logo === '') {
      return {
        ...state.theme,
        logo: defaultLogo,
      }
    } else {
      return state.theme
    }
  })

  return (
    <HeaderTopWrapper>
      <SubNavigation />
      <Logo src={theme.logo} />
      <UserInfo />
    </HeaderTopWrapper>
  )
}

export default HeaderTop