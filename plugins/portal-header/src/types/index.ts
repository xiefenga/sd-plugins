import { PLUGIN_CONFIG } from '@/utils/constants'
import { DefaultTheme } from 'styled-components'
import { HeaderConfig, AccordionConfig } from 'portal-shared'
import { PORTAL_HEADER_PLUGIN, PORTAL_ACCORDION_PLUGIN } from 'portal-shared'

export type Optional<T> = T | undefined

export interface User {
  avatar: string
  userName: string
  identity: string
  organization: string
}

export interface SubNav {
  name: string
  url: string
}

export interface Theme {
  name: string
  logo: string
  color: DefaultTheme
}

export interface BusinessNav {
  name: string
  url: string
  params?: Record<string, string>
}

export interface PluginConfig {
  isLevel: boolean
  subNavs: SubNav[]
  searchUrl: string
  workbanch: {
    url: string
    text: string
  }
  themes: Theme[]
  currentTheme: Theme
  busninessNavs: BusinessNav[]
  navAssetId: string
}

export interface Store {
  ssoCode: string
  theme: Theme
  setTheme: (_: Theme) => void
}

export interface Notice {
  id: string
  info_url?: string
  info_title: string
  info_content: string
  info_url_title?: string
  last_modify_time: string
}

export interface PluginPropsOfConfig {
  isConfig: true,
  onConfigChange: (config: any) => void,
  customConfig: {
    appId: string
    componentId: string
    [PLUGIN_CONFIG]?: Partial<PluginConfig>
    [PORTAL_HEADER_PLUGIN]?: Partial<HeaderConfig>
    [PORTAL_ACCORDION_PLUGIN]?: Partial<AccordionConfig>
  }
}

export interface PluginProps {
  appId: string
  componentId: string
  customConfig: {
    appId: string
    componentId: string
    [PLUGIN_CONFIG]?: Partial<PluginConfig>
    [PORTAL_HEADER_PLUGIN]?: Partial<HeaderConfig>
    [PORTAL_ACCORDION_PLUGIN]?: Partial<AccordionConfig>
  },
  [PLUGIN_CONFIG]?: Partial<PluginConfig>
}