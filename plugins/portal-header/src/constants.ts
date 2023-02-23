import '@/runtime'
import defaultLogo from './assets/Logo.png'
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

export const DEFAULT_THEME_KEY = '0x1461A0::DEFAULT_THEME_KEY'

