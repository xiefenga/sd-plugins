
type UnsafePluginProps<T> = PluginProps<Partial<T>>

type PluginProps<T> = {
  appVariables: []
  customConfig: {
    appId: string
    componentId: string
  } & T
  sysVariables: []
  themeInfo: []
}

type PluginRender<T> = (dom: HTMLElement, props: UnsafePluginProps<T>) => void

interface Window {
  token?: string
  CUSTOM_PLUGIN?: Map<string, PluginRender>
}

interface Process {
  env: {
    PLUGIN_ID: string
    PLUGIN_TYPE: string
    NODE_ENV: 'development' | 'production'
    [key: string]: string
  }
}

declare const process: Process

declare module '*.png' {
  const src: string
  export default src
}
