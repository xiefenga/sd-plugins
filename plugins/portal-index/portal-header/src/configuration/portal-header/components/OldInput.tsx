import React from 'react'
import { Col, Input, Row } from 'antd'
import { useControllableValue } from 'ahooks'

interface OldInputValue {
  text: string
  url: string
}

interface OldInputProps {
  value?: OldInputValue
  onChange?: (value: OldInputValue) => void
}

const OldInput: React.FC<OldInputProps> = (props) => {

  const [value, onChange] = useControllableValue(props, {
    defaultValue: {} as OldInputValue,
  })


  return (
    <Row gutter={10}>
      <Col span={6}>
        <Input 
          size='small'
          value={value?.text}
          onChange={e => onChange({
            ...(value ?? {}),
            text: e.target.value,
          })}
          placeholder='回到旧版文字'
        />
      </Col>
      <Col span={18}>
        <Input 
          size='small' 
          value={value?.url}
          placeholder='旧版首页地址'
          onChange={e => onChange({
            ...(value ?? {}),
            url: e.target.value,
          })}
        />
      </Col>
    </Row>
  )
}

export default OldInput