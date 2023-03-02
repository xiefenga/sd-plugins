import React from 'react'
import { useState } from 'react'
import { useAsyncEffect } from 'ahooks'

import { compose } from '@/utils'
import { queryFAssetById } from '@/api'
import { CarouselAsset, PluginProps } from '@/types'
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

type PluginPorps = Omit<PluginProps['customConfig'], 'appId' | 'componentId'>

const App: React.FC<PluginPorps> = (props) => {

  const { assetId, speedTime, detailsUrl } = props

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
      detailsUrl={detailsUrl}
      speed={parseFloat(speedTime ?? '3') * 1000}
    />
  )
}

export default App