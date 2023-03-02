import React from 'react'
import styled from 'styled-components'

const Div = styled.div`
  width: 642px;
  height: 360px;
  position: relative;
`

const StyledImg = styled.img`
  width: 642px;
  height: 360px;
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
  detailsUrl: string
}

const CarouselItem: React.FC<CarouselItemPorps> = (props) => {
  const { title, image, detailsUrl } = props
  return (
    <Div>
      <a href={detailsUrl} target='_blank' rel='noreferrer'>
        <StyledImg src={image} />
        <CarouselText text={title}/>
      </a>
    </Div>
  )
}

export default CarouselItem