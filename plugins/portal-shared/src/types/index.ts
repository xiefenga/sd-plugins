export * from './config/accordion'

export * from './config/header'

import { ThemeEventCenter } from '@/event/EventCenter'

declare global {
  interface Window {
    PROTAL_THEME_EVENT_CENTER: ThemeEventCenter
    PROTAL_CONFIGGURATION: {
      [key: string]: any
    }
  }
}