import '@/utils/runtime'
import React from 'react'
import { createGlobalStyle } from 'styled-components'
import HarmonyOS_Sans_SC from '@/assets/HarmonyOS_Sans_SC_Light.ttf'

export const CustomeFontStyle =  createGlobalStyle`
  @font-face {
    font-family: HarmonyOS_Sans_SC;
    src: url(${HarmonyOS_Sans_SC});
  }

  body {
    font-family: HarmonyOS_Sans_SC;
    font-weight: 400;
    color: ${props => props.theme.font.default};
  }
`

export const ThemedAntdTabsDropdownStyle = createGlobalStyle`
  .themed-ant-tabs-dropdown-menu {
    border: 1px solid ${props => props.theme.border.color};

    a {
      color: inherit;
      font-family: inherit;
      font-size: inherit;
      transition: color .1s;
    }

    .ant-tabs-dropdown-menu-item {
      text-align: center;

      &.ant-tabs-dropdown-menu-item-active {
        background: ${props => props.theme.bg.active};
        color: ${props => props.theme.font.active};
      }
    }
  }
`

export const ThemedAntdDropdownMenuStyle = createGlobalStyle`
  .themed-ant-dropdown-menu {
    border: 1px solid ${props => props.theme.border.color};

    a {
      transition: none;
    }
    
    .ant-dropdown-menu-item {
      font-size: inherit;
      text-align: center;
    }

    .ant-dropdown-menu-item-active {
      background: ${props => props.theme.bg.active};
      color: ${props => props.theme.font.active};
    }
  }
`

export const ThemedAntdPopoverStyle = createGlobalStyle`
  .themed-ant-popover {
    .ant-popover-content {

      .ant-popover-arrow {
        .ant-popover-arrow-content {
          transform: translateY(11px) rotate(45deg);
          border: 1px solid ${props => props.theme.border.color};
        }
      }
      .ant-popover-inner {
        border: 1px solid ${props => props.theme.border.color};
      }
    }
  }
`

const GlobalStyle = () => (
  <React.Fragment>
    <CustomeFontStyle />
    <ThemedAntdPopoverStyle />
    <ThemedAntdDropdownMenuStyle />
    <ThemedAntdTabsDropdownStyle />
  </React.Fragment>
)

export default GlobalStyle