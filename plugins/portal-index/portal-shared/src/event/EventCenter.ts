import { Theme } from '@/types'

interface ThemeEventHandler {
  (value: Theme): void
}

export class ThemeEventCenter {

  private listeners: ThemeEventHandler[] = []

  public on(event: string, handler: ThemeEventHandler) {
    this.listeners.push(handler)
    return () => {
      const index = this.listeners.indexOf(handler)
      if (index !== -1) {
        this.listeners.splice(index, 1)
      }
    }
  }

  public emit(event: string, theme: Theme) {
    this.listeners.forEach(handler => handler(theme))
  }

}