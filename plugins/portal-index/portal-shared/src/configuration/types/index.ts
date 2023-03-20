import { Theme } from '@/types'
import { PORTAL_ACCORDION_PLUGIN, PORTAL_CAROUSEL_PLUGIN, PORTAL_HEADER_PLUGIN } from '@/constants'

// accordion
export interface AccordionMenuItem {
  id: string
  type: string
  title: string
  description: string
  background: string
  preview: string
  url?: string
  code?: boolean
}

export interface AccordionConfig {
  moreLink: string
  otherHeight: number
  menuConfigList: AccordionMenuItem[]
}

// header
export interface SubNav {
  name: string
  url: string
}

export type ParamOption = 'id' | 'loginName' | 'SSOCode'

export type BusinessNavParam = { 
  name: string, 
  option: ParamOption 
}

export interface BusinessNav {
  name: string
  url: string
  isHash?: boolean
  params?: BusinessNavParam[]
}

export interface HeaderConfig {
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
  topHeight: number
  defaultLogo: string
  noticeLink: string
  old: string
  apiConfig: {
    addKey: string
    queryKey: string
    updateKey: string
  }  
}

// carousel 
export interface CarouselConfig {
  assetId: string,
  speedTime: number,
  detailsUrl: string,
  height: number
}

export interface PluginPropsOfConfig {
  isConfig: true,
  onConfigChange: (config: any) => void,
  customConfig: {
    appId: string
    componentId: string
    [PORTAL_HEADER_PLUGIN]?: Partial<HeaderConfig>
    [PORTAL_ACCORDION_PLUGIN]?: Partial<AccordionConfig>
    [PORTAL_CAROUSEL_PLUGIN]?: Partial<CarouselConfig>
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
    [PORTAL_CAROUSEL_PLUGIN]?: Partial<CarouselConfig>
  },
}