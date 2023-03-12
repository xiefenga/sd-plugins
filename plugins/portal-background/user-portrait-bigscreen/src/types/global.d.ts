/// <reference types="webpack-env"  />

type UnsafePluginProps<T, PluginTypeProps> = PluginTypeProps<Partial<T>>

type AppPluginProps<T> = {
  appVariables: []
  customConfig: {
    appId: string
    componentId: string
  } & T
  sysVariables: []
  themeInfo: []
}

type PluginRender<Type, Props> = (dom: HTMLElement, props: UnsafePluginProps<Props, Type>) => void

interface ScreenPluginProps<T> {
  className: string
  componentId: string
  customConfig: {
    componentId: string
    data: any[]
    options: ScreenPluginProps<T>['options']
  }
  options: {
    columns: any[]
    customCss: string
    dataSourceType: number
    externalVariables: T
    showColumns: any[]
  }
  [key: string]: any
}

type ScreenPluginRender<T = any> = (dom: HTMLElement, props: ScreenPluginProps<Partial<T>>) => void

interface Window {
  token?: string
  CUSTOM_PLUGIN?: Map<string, PluginRender>
}

// interface Process {
//   env: {
//     PLUGIN_ID: string
//     PLUGIN_TYPE: string
//     NODE_ENV: 'development' | 'production'
//   }
// }

// declare const process: Process

declare module '*.png' {
  const src: string
  export default src
}

declare module '*.ttf' {
  const src: string
  export default src
}