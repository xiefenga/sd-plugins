import '@/utils/runtime'
import defaultLogo from '@/assets/Logo.png'
import { DefaultTheme } from 'styled-components'

export const defaultThemeColor: DefaultTheme = {
  font: {
    active: '#fff',
    hover: '#00B8B4',
    default: '#212121',
  },
  bg: {
    default: '#fff',
    active: '#00B8B4',
    hover: '#00B8B410',
  },
  border: {
    color: '#212121',
  },
}

export const DEFAULT_THEME = {
  name: '默认主题',
  logo: defaultLogo,
  color: defaultThemeColor,
}

export const STORAGE_KEY = {
  DEFAULT_THEME: '@0x1461A0::STORAGE_DEFAULT_THEME_KEY',
  PLUGIN_PROPS: '@0x1461A0::STORAGE_PLUGIN_PROPS_KEY',
}

export const MESSAGE_TYPE = '@0x1461A0::PLUGIN_CONFIG_SYNC'

export const PLUGIN_CONFIG = '@0x1461A0::CUSTOMIZE_CONFIG_KEY'
