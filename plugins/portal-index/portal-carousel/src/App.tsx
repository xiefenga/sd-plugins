import React from 'react'
import { useState } from 'react'
import { useAsyncEffect } from 'ahooks'
import { CarouselConfig } from 'portal-shared/configuration'

import { queryNewsChartData } from '@/api'
import { CarouselBlock, NewsChartResp } from '@/types'
import PortalCarousel from '@/components/PortalCarousel'

const transformNewsChartResp = (resp: NewsChartResp[]): CarouselBlock[] => {
  return resp.map<CarouselBlock>(item => {
    const { dataId, title, newsFilePath } = item
    const file = JSON.parse(newsFilePath)[0]
    const imgurl = file.url ?? file.previewUrl ?? ''
    return {
      title,
      imgurl,
      id: dataId,
    }
  })
}

interface AppProps {
  pluginConfig: Partial<CarouselConfig>
}

const App: React.FC<AppProps> = (props) => {

  const { pluginConfig } = props

  const { assetId, speedTime = 2, detailsUrl, height = 360, num = 5 } = pluginConfig

  const [list, setList] = useState<CarouselBlock[]>([])

  useAsyncEffect(async () => {
    if (assetId) {
      const resp = await queryNewsChartData(assetId, num)
      const blockList = transformNewsChartResp(resp)
      setList(blockList)
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