import { DefaultTheme } from 'styled-components'

export type Optional<T> = T | undefined

export interface User {
  avatar: string
  userName: string
  identity: string
  organization: string
}

interface SubNav {
  name: string
  url: string
}

interface Theme {
  name: string
  logo: string
  color: DefaultTheme
}

interface BusinessNav {
  name: string
  url: string
  params?: Record<string, string>
}

export interface PluginConfig {
  logo: string
  isLevel: boolean
  subNavs: SubNav[]
  searchUrl: string
  workbanchUrl: string
  workbanchName: string
  themes: Theme[] 
  currentTheme: Theme
  busninessNavs: BusinessNav[]
}

export interface Store {
  ssoCode: string
  theme: Theme
  setTheme: (_:Theme) => void
}

export interface Notice {
  id: string
  info_url?: string
  info_title: string
  info_content: string
  info_url_title?: string
  last_modify_time: string
}
