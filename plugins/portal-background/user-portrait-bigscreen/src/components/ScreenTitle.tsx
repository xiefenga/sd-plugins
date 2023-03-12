import React from 'react'
import styled from 'styled-components'
import titleBackground from '@/assets/title.png'

const Div = styled.div`
  z-index: 1;
  width: 100%;
  height: 129px;
  position: absolute;
  top: 0;
  left: 0;
  background-image: url(${titleBackground});
  background-size: cover;
  background-repeat: no-repeat;
  background-position: 0% 0%;
`

const H1 = styled.h1`
  text-align: center;
  font-size: 48px;
  margin: 0;
  margin-top: 10px;
  color: #FFFFFF;
  font-weight: normal;
  font-family: 'YouSheBiaoTiHei';
  text-shadow: 0px 9px 33px #2F9DCD;
  user-select: none;
`

const ScreenTitle: React.FC = () => {
  return (
    <Div>
      <H1>用户画像分析</H1>
    </Div>
  )
}

export default ScreenTitle