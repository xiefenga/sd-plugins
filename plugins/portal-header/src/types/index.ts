import { HeaderConfig, AccordionConfig } from 'portal-shared'
import { PORTAL_HEADER_PLUGIN, PORTAL_ACCORDION_PLUGIN } from 'portal-shared'

export type Optional<T> = T | undefined

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

export interface PluginPropsOfConfig {
  isConfig: true,
  onConfigChange: (config: any) => void,
  customConfig: {
    appId: string
    componentId: string
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
    [PORTAL_HEADER_PLUGIN]?: Partial<HeaderConfig>
    [PORTAL_ACCORDION_PLUGIN]?: Partial<AccordionConfig>
  },
}