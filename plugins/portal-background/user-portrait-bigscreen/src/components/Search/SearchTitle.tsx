import React from 'react'
import styled from 'styled-components'
import titleBackground from '@/assets/small-title.png'

const Div = styled.div`
  user-select: none;
  width: 427px;
  height: 29px;
  background: url(${titleBackground});
  background-size: 453px 44px;
  background-position: -12px -7px;
  /* background-size: cover;
  background-position: 0 -12px; */
  color: #fff;
  font-family: YouSheBiaoTiHei;
  display: flex;
  align-items: center;
  overflow: hidden;
`
const Span = styled.span`
  margin-left: 40px;
`

interface SearchTitleProps {
  title: string
}

const SearchTitle: React.FC<SearchTitleProps> = (props) => {
  return (
    <Div>
      <Span>{props.title}</Span>
    </Div>
  )
}

export default SearchTitle