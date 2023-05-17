
export interface AssetsColumn {
  asset_id: string
  col_alias: string
  col_datatype: number
  col_desc: string
  col_index: number
  col_name: string
  displayed: number
  id: string
  import_flag: boolean
  is_ciphertext: boolean
  is_private: boolean
  multipleComponentFlag: boolean
  not_null_flag: number
  primary_key_flag: number
  queryable: number
}

export type FormAssetsResponse = [AssetsColumn[], any[]]

export interface PluginConfig {
  detailsUrl: string
  assetId: string
  speedTime: string
  height: string
}

export interface PluginProps {
  appId: string
  componentId: string
  customConfig: {
    appId: string
    componentId: string
  } & Partial<PluginConfig>
}

export interface CarouselBlock {
  id: string
  title: string
  imgurl: string
}

export interface NewsChartResp {
  dataId: string
  title: string
  newsFilePath: string
}
