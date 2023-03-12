import styled from 'styled-components'
import React, { PropsWithChildren } from 'react'
import smallBaseImage from '@/assets/small-base.png'
import { designWidth, designHeight } from '@/config'

const ChartPosition = styled.div<{ left: number, top: number }>`
  position: absolute;
  top: ${prop => prop.top / designHeight * 100}%;
  left: ${prop => prop.left / designWidth * 100}%;
`

const SmallBase = styled.div`
  width: 295px;
  height: 185px;
  margin: 0 auto;
  background-image: url(${smallBaseImage});
  background-size: cover;
  background-repeat: no-repeat;
  margin-top: -110px;
`

const ChartSize = styled.div<{ width?: number, height?: number }>`
  margin: 0 auto;
  width: ${props => props.width}px;
  height: ${props => props.height}px;
`

interface ChartWrapperProps {
  x?: number
  y?: number
  w?: number
  h?: number
}

const ChartWrapper: React.FC<PropsWithChildren<ChartWrapperProps>> = (props) => {
  const { x = 0, y = 0, w, h } = props
  return (
    <ChartPosition left={x} top={y}>
      <ChartSize width={w} height={h}>
        {props.children}
      </ChartSize>
      <SmallBase />
    </ChartPosition>
  )
}

export default ChartWrapper