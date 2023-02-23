import { Menu } from 'antd'
import styled from 'styled-components'

interface MenuStyleProps {
  fontSize?: number
}

// 会导致抖动
export const ThemedMenu_1 = styled(Menu) <MenuStyleProps>`
  border: 1px solid ${props => props.theme.border.color};

  a {
    transition: none;
  }
  
  .ant-dropdown-menu-item {
    font-size: ${props => props.fontSize ?? ''}px;
    text-align: center;
  }

  .ant-dropdown-menu-item-active {
    background: ${props => props.theme.bg.active};
    color: ${props => props.theme.font.active};
  }
`

export const ThemedMenu = styled(Menu).attrs({ className: 'themed-ant-dropdown-menu' })``

export default ThemedMenu