
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

type Nullable<T> = T | null

export interface NewsAsset {
  news_id: string
  news_title: string
  news_subtitle?: any
  news_column: string
  news_tag: string
  news_source: string
  news_abstract: string
  news_secrecy: number
  news_index?: any
  news_browse_setting: number
  comment_setting: number
  news_text: string
  news_list_figure?: any
  news_visit_num?: any
  news_comment_num?: any
  news_like_num?: any
  user_id: string
  news_publish_time: number
  news_publish_state: number
  news_author: string
  news_file_path: Nullable<string>
  all?: any
  parent_id?: any
  office_id?: any
  create_member?: any
  create_time?: any
  create_member_ip_address?: any
  last_modifier?: any
  last_modify_time: number
  last_modifier_ip_address?: any
  flow_instance_id?: any
  flow_name?: any
  flow_instance_name?: any
  handle_usernames?: any
  process_status?: any
  business_status: string
}


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