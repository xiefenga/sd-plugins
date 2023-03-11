import React from 'react'
import { Popover, Typography } from 'antd'
import styled from 'styled-components'
import { SketchPicker } from 'react-color'
import { useControllableValue } from 'ahooks'

const ColorPickerPopover = styled(Popover).attrs({
  trigger: 'click',
  overlayClassName: 'color-picker-popover',
})``

const PickerWrapper = styled.div`
  width: 115px;
  height: 34px;
  display: flex;
  padding: 2px 10px;
  cursor: pointer;
  border-radius: 4px;
  align-items: center;
  user-select: none;
  background-color: #fff;
  border: 1px solid #eee;
`

const ColorPreivew = styled.div<{ color: string }>`
  width: 22px;
  height: 22px;
  border-radius: 4px;
  border: 1px solid #abaeb3;
  margin-right: 8px;
  background-color: ${props => props.color};
`

interface ColorPickerProps {
  value?: string
  onChange?: (color: string) => void
}

const ColorPicker: React.FC<ColorPickerProps> = (props) => {

  const innerProps = { ...props }

  // 处理 color 为 undefined 时，defaultValue 不生效的问题
  if ('value' in props && props.value == null) {
    delete innerProps.value
  }

  const [color, setColor] = useControllableValue(innerProps,
    {
      defaultValue: '#FFFFFF',
    }
  )

  return (
    <ColorPickerPopover
      content={
        <SketchPicker
          color={color}
          onChange={color => setColor(color.hex)}
        />
      }
    >
      <PickerWrapper>
        <ColorPreivew color={color} />
        <Typography.Text style={{ color: '#5e605f' }} ellipsis={{ tooltip: color }}>
          {color}
        </Typography.Text>
      </PickerWrapper>
    </ColorPickerPopover>
  )
}

export default ColorPicker