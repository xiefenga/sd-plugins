import React from 'react'
import { createGlobalStyle } from 'styled-components'

const ColorPickerPopoverStyle = createGlobalStyle`
  .color-picker-popover {
    .ant-popover-arrow {
      /* display: none; */
    }
    .ant-popover-inner-content {
      padding: 0;
    }
  }
`

const GlobalStyle = () => {
  return (
    <React.Fragment>
      <ColorPickerPopoverStyle />
    </React.Fragment>
  )
}

export default GlobalStyle