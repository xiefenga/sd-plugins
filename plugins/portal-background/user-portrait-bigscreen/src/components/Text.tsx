import Tooltip from 'rc-tooltip'
import styled from 'styled-components'
import React, { PropsWithChildren } from 'react'
import 'rc-tooltip/assets/bootstrap.css'

import Space from './Space'

const Div = styled.div<{ color: string }>`
  font-size: 14px;
  font-weight: 400;
  color: ${prop => prop.color};
  line-height: 20px;
`

const Span = styled.span<{ color: string, max?: number }>`
  display: inline-block;
  color: ${prop => prop.color};
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  vertical-align: -5px;
  max-width: ${props => props.max? props.max + 'px' : '100%'};
`

interface TextProps {
  color?: string
  label?: string
  newLine?: boolean
  space?: number
  max?: number
}

const Text: React.FC<PropsWithChildren<TextProps>> = (props) => {
  const { max, color = 'rgba(255, 255, 255, 0.6)', label, newLine = false, space = 0 } = props
  const renderLabel = () => {
    return label == null
      ? null
      : (<span>{label}: </span>)
  }
  const renderNewLine = () => {
    return newLine && (
      <React.Fragment>
        <br />
        <Space y={space} />
      </React.Fragment>
    )
  }
  return (
    <Div color='rgba(255, 255, 255, 0.6)'>
      {renderLabel()}
      {renderNewLine()}
      <Tooltip
        showArrow
        placement='top'
        overlay={props.children}
      >
        <Span max={max} color={color}>
          {props.children}
        </Span>
      </Tooltip>
    </Div>
  )
}

export default Text