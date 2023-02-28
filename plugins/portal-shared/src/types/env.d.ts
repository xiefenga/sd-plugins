import { ThemeEventCenter } from '@/event/EventCenter'

declare global {
  interface Window {
    PROTAL_THEME_EVENT_CENTER: ThemeEventCenter
  }
}

