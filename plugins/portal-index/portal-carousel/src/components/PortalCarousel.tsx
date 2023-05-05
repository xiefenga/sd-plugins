import React from 'react'
import { CarouselBlock } from '@/types'
import StyledCarousel from '@/components/StyledCarousel'
import CarouselItem from '@/components/CarouselItem'

interface PortalCarouselProps {
  speed: number
  height: number
  detailsUrl: string
  list: CarouselBlock[]
}

const PortalCarousel: React.FC<PortalCarouselProps> = (props) => {

  const { list, speed, height, detailsUrl } = props

  const renderCarouselList = () => {
    return list.map(item => {
      const target = detailsUrl.includes('?')
        ? `${detailsUrl}&dataId=${item.id}`
        : `${detailsUrl}?dataId=${item.id}`
      return (
        <div key={item.id}>
          <CarouselItem
            height={height}
            title={item.title}
            image={item.imgurl}
            detailsUrl={target}
          />
        </div>
      )
    })
  }

  return (
    <StyledCarousel autoplay autoplaySpeed={speed}>
      {renderCarouselList()}
    </StyledCarousel>
  )
}

export default PortalCarousel