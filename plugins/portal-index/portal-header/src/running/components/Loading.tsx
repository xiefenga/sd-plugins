import { Spin, SpinProps } from 'antd'
import React from 'react'
import styled from 'styled-components'

const LoadingContainer = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
`

const Loading: React.FC<Omit<SpinProps, 'children' | 'spining'>> = (props) => {
  return (
    <LoadingContainer>
      <Spin spinning {...props} />
    </LoadingContainer>
  )
}

export default Loading