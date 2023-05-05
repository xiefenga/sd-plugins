import React from 'react'
import { useState } from 'react'
import { useAsyncEffect } from 'ahooks'
import { CarouselConfig } from 'portal-shared/configuration'

import { compose } from '@/utils'
import { queryFAssetById } from '@/api'
import { CarouselBlock, NewsAsset } from '@/types'
import { transformAssetsResp } from '@/utils/assets'
import PortalCarousel from '@/components/PortalCarousel'

// image extension
const imgExtReg = /\.(png|jpg|jpeg|gif|bmp|webp)$/i

const transformImgUrlFiled = (assetsData: NewsAsset[]) => {
  return assetsData
    .sort((a, b) => b.news_publish_time - a.news_publish_time)
    .filter(item => {
      if (item.news_file_path && item.business_status === '已上架') {
        const files = JSON.parse(item.news_file_path)
        if (files.length > 0) {
          const file = files[0] as Partial<{ name: string, url: string, previewUrl: string }>
          console.log(file.url)
          return imgExtReg.test(file.url ?? file.previewUrl ?? '')
        }
      }
      return false
    })
    .map<CarouselBlock>(item => ({
      id: item.news_id,
      title: item.news_title,
      imgurl: JSON.parse(item.news_file_path!)[0].url,
    }))
}

const transformCarouselAssets = compose(transformImgUrlFiled, transformAssetsResp)

interface AppProps {
  pluginConfig: Partial<CarouselConfig>
}

const App: React.FC<AppProps> = (props) => {

  const { pluginConfig } = props

  const { assetId, speedTime = 2, detailsUrl, height = 360, num = 5 } = pluginConfig

  const [list, setList] = useState<CarouselBlock[]>([])

  useAsyncEffect(async () => {
    if (assetId) {
      const resp = await queryFAssetById(assetId)
      const assets = transformCarouselAssets(resp)
      console.log(assets)
      setList(assets.slice(0, num))
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