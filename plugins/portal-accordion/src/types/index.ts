import { PLUGIN_CONFIG } from '@/utils/constants'

export interface PanelInfo {
  title: string
  description: string
  background: string
  preview: string
  buttons: { text: string, link: string }[]
}

export interface MenuItem {
  id: string
  type: string
  title: string
  description: string
  background: string
  preview: string
}

export interface PluginConfig {
  moreLink: string
  otherHeight: number
  menuConfigList: MenuItem[]
}

export interface PluginPropsOfConfig {
  isConfig: true,
  onConfigChange: (config: any) => void,
  customConfig: {
    appId: string
    componentId: string
    [PLUGIN_CONFIG]?: Partial<PluginConfig>
  }
}

export interface PluginProps {
  appId: string,
  componentId: string,
  customConfig: {
    appId: string,
    componentId: string,
    [PLUGIN_CONFIG]?: Partial<PluginConfig>
  },
  [PLUGIN_CONFIG]?: Partial<PluginConfig>
}

export * from './api'