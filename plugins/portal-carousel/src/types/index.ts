
export interface CarouselAsset {
  author: string
  content: string
  dataId: number
  imgurl: string
  publish_time: number
  source: string
  title: string
}

export interface PluginConfig {
  detailsUrl: string
  assetId: string
  speedTime: string
}

export interface PluginProps {
  appId: string
  componentId: string
  customConfig: {
    appId: string
    componentId: string
  } & Partial<PluginConfig>
}