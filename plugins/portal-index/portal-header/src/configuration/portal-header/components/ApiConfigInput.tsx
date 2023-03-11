import React from 'react'
import { Row, Col, Input } from 'antd'
import { useControllableValue } from 'ahooks'

interface ApiConfigInputValue {
  addKey: string
  queryKey: string
  updateKey: string
}

interface ApiConfigInputProps {
  value?: ApiConfigInputValue
  onChange?: (value: ApiConfigInputValue) => void
}

const ApiConfigInput: React.FC<ApiConfigInputProps> = (props) => {

  const [value, onChange] = useControllableValue(props, {
    defaultValue: {} as ApiConfigInputValue,
  })

  return (
    <Row gutter={10}>
      <Col span={7}>
        <Input 
          size='small' 
          placeholder='新增' 
          value={value?.addKey}
          onChange={e => onChange({
            ...(value ?? {}),
            addKey: e.target.value,
          })}
        />
      </Col>
      <Col span={7}>
        <Input 
          size='small' 
          placeholder='查询'
          value={value?.queryKey}
          onChange={e => onChange({
            ...(value ?? {}),
            queryKey: e.target.value,
          })}
        />
      </Col>
      <Col span={7}>
        <Input 
          size='small' 
          placeholder='修改'
          value={value?.updateKey}
          onChange={e => onChange({
            ...(value ?? {}),
            updateKey: e.target.value,
          })} 
        />
      </Col>
    </Row>
  )
}

export default ApiConfigInput