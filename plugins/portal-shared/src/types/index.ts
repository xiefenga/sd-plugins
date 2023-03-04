export * from './config/accordion'

export * from './config/header'

import { PORTAL_ACCORDION_PLUGIN, PORTAL_HEADER_PLUGIN } from '@/constants'
import { ThemeEventCenter } from '@/event/EventCenter'
import { AccordionConfig } from './config/accordion'
import { HeaderConfig } from './config/header'

declare global {
  interface Window {
    PROTAL_THEME_EVENT_CENTER: ThemeEventCenter
    PROTAL_CONFIGGURATION: {
      [key: string]: any
    }
  }
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

export interface PluginProps<T> {
  appId: string
  componentId: string
  customConfig: {
    appId: string
    componentId: string
    [key: string]: T | string
  }
  //  & Partial<T>,
}