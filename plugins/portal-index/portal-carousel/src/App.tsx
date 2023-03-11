import React from 'react'
import { useState } from 'react'
import { useAsyncEffect } from 'ahooks'
import { CarouselConfig } from 'portal-shared/configuration'

import { compose } from '@/utils'
import { queryFAssetById } from '@/api'
import { CarouselAsset } from '@/types'
import { transformAssetsResp } from '@/utils/assets'
import PortalCarousel from '@/components/PortalCarousel'


const transformImgUrlFiled = (assetsData: CarouselAsset[]) => {
  return assetsData.map(item => {
    return {
      ...item,
      imgurl: item.imgurl && JSON.parse(item.imgurl)[0]?.url,
    } as CarouselAsset
  })
}

const transformCarouselAssets = compose(transformImgUrlFiled, transformAssetsResp)

interface AppProps {
  pluginConfig: Partial<CarouselConfig>
}

const App: React.FC<AppProps> = (props) => {

  const { pluginConfig } = props

  const { assetId, speedTime = 2, detailsUrl, height = 360 } = pluginConfig

  const [list, setList] = useState<CarouselAsset[]>([])

  useAsyncEffect(async () => {
    if (assetId) {
      const resp = await queryFAssetById(assetId)
      const assets = transformCarouselAssets(resp)
      setList(assets)
    }
  }, [])

  if (!assetId) {
    return (
      <div>缺少assetId</div>
    )
  } else if (!detailsUrl) {
    return (
      <div>缺少detailsUrl</div>
    )
  }


  return (
    <PortalCarousel
      list={list}
      height={height}
      detailsUrl={detailsUrl}
      speed={speedTime * 1000}
    />
  )
}

export default App