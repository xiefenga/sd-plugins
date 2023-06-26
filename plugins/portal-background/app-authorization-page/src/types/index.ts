export interface RoleGroup {
  company_id: string
  create_member: string
  create_time: number
  id: string
  last_modifer: string
  last_modifer_time: number
  name: string
  origin: number
  roleItemList: RoleItem[]
}

export interface RoleItem {
  group_id: string
  id: string
  name: string
  office_id: string
  roleMenuItemList: RoleMenuItem[]
  role_type: string
  update_by: string
  update_date: number
  zhname?: string
}

export interface RoleMenuItem {
  menu_id: string
  privs?: string
  role_id: string
}

export interface RoleApp {
  app_name: string
  auth_name: string
  auth_id: string
  data_id: string
  app_id: string
}

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
  length: number
  multipleComponentFlag: boolean
  not_null_flag: number
  queryable: number
  scale: number
}

type AssetData = number | string | boolean | null

export type QueryAssetsResp = [AssetsColumn[], AssetData[][]]

export interface AppAsset {
  name: string
  photo: string
  no_access_photo: string
  url: string
  data_id: string
  [key: string]: string | number | null
}

export interface PermissionAsset {
  id: string
  name: string
}

export interface PluginConfig {
  appAssetId: string
  permissionAssetId: string
}

export type UnsafePluginProps<T> = PluginProps<Partial<T>>

export interface PluginProps<T> {
  appVariables: []
  customConfig: {
    appId: string
    componentId: string
  } & T
  sysVariables: []
  themeInfo: []
}
