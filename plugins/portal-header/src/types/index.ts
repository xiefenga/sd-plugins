import { PluginProps } from 'portal-shared/configuration'
import { ConfigFileFlag, ConfigFileScope } from '@/utils/constants'


export interface User {
  avatar: string
  userName: string
  identity: string
  organization: string
}

export interface Notice {
  id: string
  info_url?: string
  info_title: string
  info_content: string
  info_url_title?: string
  last_modify_time: string
}

export interface ConfigFileJSON {
  time: number
  type: typeof ConfigFileFlag,
  scope: typeof ConfigFileScope,
  configuration: Omit<PluginProps['customConfig'], 'appId' | 'componentId'>,
}