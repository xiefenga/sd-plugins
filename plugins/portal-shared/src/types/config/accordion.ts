export interface AccordionMenuItem {
  id: string
  type: string
  title: string
  description: string
  background: string
  preview: string
}

export interface AccordionConfig {
  moreLink: string
  otherHeight: number
  menuConfigList: AccordionMenuItem[]
}