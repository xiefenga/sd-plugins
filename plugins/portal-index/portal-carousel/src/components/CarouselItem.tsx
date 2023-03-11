import React, { useRef } from 'react'
import { Image } from 'antd'
import styled from 'styled-components'
import { useSize } from 'ahooks'

const Div = styled.div<{ height: number }>`
  height: ${props => props.height}px;
  position: relative;
`
type Size = {
  width: number
  height: number
}

const StyledImg = styled(Image).attrs({ preview: false })<Partial<Size>>`
  width: ${props => props.width}px;
  height: ${props => props.height}px;
  object-fit: cover;
`

const TextWrapper = styled.div`
  position: absolute;
  bottom: 10px;
  left: 0;
  color: #212121;
  background-color: #fff;
  padding: 5px 10px;
  font-size: 20px;
  font-weight: 700;
  max-width: 80%;
  
  > .carousel-text {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  &::after {
    content: '';
    position: absolute;
    border: 5px solid transparent;
    border-left-color: #fff;
    border-top-color: #fff;
    left: 0;
    bottom: -10px;
  }
`

const CarouselText: React.FC<{ text: string }> = ({ text }) => {
  return (
    <TextWrapper>
      <div className='carousel-text'>
        { text }
      </div>
    </TextWrapper>
  )
}

interface CarouselItemPorps {
  title: string
  image: string
  height: number
  detailsUrl: string
}

const CarouselItem: React.FC<CarouselItemPorps> = (props) => {
  const { title, image, height, detailsUrl } = props
  const divRef = useRef<HTMLDivElement>(null)

  const size = useSize(divRef)

  return (
    <Div height={height} ref={divRef}>
      <a href={detailsUrl} target='_blank' rel='noreferrer'>
        <StyledImg width={size?.width} height={size?.height} src={image} placeholder />
        <CarouselText text={title}/>
      </a>
    </Div>
  )
}

export default CarouselItem