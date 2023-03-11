import { ThemeEventCenter } from '@/event/EventCenter'

export const EVENT_CENTER = (
  window.PROTAL_THEME_EVENT_CENTER ??= new ThemeEventCenter()
)

export const EVENT_THEME_CHANGE = '@0x1461A0::THEME_CHANGE_EVENT'