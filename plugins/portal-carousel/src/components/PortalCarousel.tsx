import React from 'react'
import { CarouselAsset } from '@/types'
import StyledCarousel from '@/components/StyledCarousel'
import CarouselItem from '@/components/CarouselItem'

interface PortalCarouselProps {
  speed: number
  detailsUrl: string
  list: CarouselAsset[]
}

const PortalCarousel: React.FC<PortalCarouselProps> = (props) => {

  const { list, speed, detailsUrl } = props

  const renderCarouselList = () => {
    return list.map(item => {
      const target = detailsUrl.includes('?')
        ? `${detailsUrl}&dataId=${item.dataId}`
        : `${detailsUrl}?dataId=${item.dataId}`
      return (
        <div key={item.dataId}>
          <CarouselItem
            title={item.title}
            image={item.imgurl}
            detailsUrl={target}
          />
        </div>
      )
    })
  }

  return (
    <StyledCarousel  autoplaySpeed={speed}>
      {renderCarouselList()}
    </StyledCarousel>
  )
}

export default PortalCarousel