import { Theme, ThemeColor } from '@/types'

export const defaultThemeColor: ThemeColor = {
  font: {
    active: '#FFFFFF',
    hover: '#00B8B4',
    default: '#212121',
  },
  bg: {
    default: '#FFFFFF',
    active: '#00B8B4',
    hover: '#00B8B410',
  },
  border: {
    color: '#212121',
  },
}

export const DEFAULT_THEME: Theme = {
  name: '默认主题',
  logo: '',
  color: defaultThemeColor,
}
