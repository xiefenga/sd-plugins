import { Tabs } from 'antd'
import styled from 'styled-components'


export const ThemedTabs = styled(Tabs).attrs({ 
  popupClassName: 'themed-ant-tabs-dropdown-menu',
})`
  .ant-tabs-nav {
    margin: 0;

    &::before {
      display: none;
    }

    .ant-tabs-nav-operations {
      border-top: 1px solid #EEE;
      border-bottom: 1px solid #EEE;
    }

    .ant-tabs-ink-bar {
      display: none;
    }

    .ant-tabs-tab {
      height: 58px;
      padding: 0;
      margin: 0;

      color: ${props => props.theme.font.default};
      font-size: 16px;
      border-top: 1px solid #EEE;
      border-bottom: 1px solid #EEE;

      &:hover {
        color: ${props => props.theme.font.hover};
        background-color: ${props => props.theme.bg.hover};
      }

      .ant-tabs-tab-btn {
        color: inherit;
      }

      &.ant-tabs-tab-active {
        color: ${props => props.theme.font.active};
        background-color: ${props => props.theme.bg.active};
        border-color: ${props => props.theme.bg.active};
      }
    }
  }
`