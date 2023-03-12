import { createGlobalStyle } from 'styled-components'
import YouSheBiaoTiHei from '@/assets/YouSheBiaoTiHei.ttf'
import React from 'react'


export const FontStyle = createGlobalStyle`
  @font-face {
    font-family: 'YouSheBiaoTiHei';
    src: url(${YouSheBiaoTiHei});
  }
`

export const RCTooltipStyle = createGlobalStyle`
  .rc-tooltip-inner {
    white-space: nowrap;
    /* max-width: 100px; */
    min-height: 0!important;
  }
`

const GlobalStyle = () => (
  <React.Fragment>
    <FontStyle />
    <RCTooltipStyle />
  </React.Fragment>
)

export default GlobalStyle