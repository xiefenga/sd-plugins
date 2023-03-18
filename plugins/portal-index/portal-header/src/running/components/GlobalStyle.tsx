import React from 'react'
import { createGlobalStyle } from 'styled-components'
import { Font_HarmonyOS_Sans_SC } from '@/utils/assets'

export const CustomeFontStyle =  createGlobalStyle`
  @font-face {
    font-family: HarmonyOS_Sans_SC;
    src: url(${Font_HarmonyOS_Sans_SC});
  }

  body {
    font-weight: 400;
    font-family: HarmonyOS_Sans_SC!important;
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
      word-break: keep-all;
    }

    .ant-dropdown-menu-item-active {
      background: ${props => props.theme.bg.hover};
      color: ${props => props.theme.font.hover};
    }

    .ant-dropdown-menu-item-selected  {
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