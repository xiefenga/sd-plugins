import { ComponentType } from 'react'

type RequireContext = __WebpackModuleApi.RequireContext

interface ComponentRecord {
  id: string
  Component: ComponentType
}

type Impoter = (context: RequireContext) => ComponentRecord[]

export const importAllComponents: Impoter = (context) => {
  return context.keys().map(id => ({
    id,
    Component: context(id).default,
  }))
}

export const renderContext = (context: RequireContext) => {
  return importAllComponents(context)
    .map(({ id, Component }) => (
      <Component key={id} />
    ))
}