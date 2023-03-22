import { Theme, ThemeColor } from '@/configuration/types'

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
  id: '@0x1461a0::PORTAL_INDEX:DEFAULT_THEMEM::THEMEM_ID',
  name: '默认主题',
  logo: '',
  color: defaultThemeColor,
}
