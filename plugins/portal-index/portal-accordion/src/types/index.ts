
export interface PanelInfo {
  title: string
  description: string
  background: string
  preview: string
  buttons: { text: string, link: string }[]
}

export interface MenuItem {
  id: string
  type: string
  title: string
  description: string
  background: string
  preview: string
}

export * from './api'