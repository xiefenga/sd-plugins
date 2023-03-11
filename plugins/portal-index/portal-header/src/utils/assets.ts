import '@/utils/runtime'
import defaultLogo from '@/assets/Logo.png'
import Font_HarmonyOS_Sans_SC from '@/assets/HarmonyOS_Sans_SC_Light.ttf'
import { DEFAULT_THEME as DEFAULT_THEME_WITHOUT_LOGO } from 'portal-shared'

export {
  defaultLogo,
  Font_HarmonyOS_Sans_SC
}

export const DEFAULT_THEME = {
  ...DEFAULT_THEME_WITHOUT_LOGO,
  logo: defaultLogo,
}