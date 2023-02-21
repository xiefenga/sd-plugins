type Render = () => void

declare module '$$plugin-dev-entry$$' {
  const render: Render
  export default render
}


type PluginRender<T = any> = (dom: HTMLElement, props: T) => void

declare module '$$plugin-pro-entry$$' {
  const render: PluginRender
  export default render
}

interface Window {
  CUSTOM_PLUGIN?: Map<string, PluginRender>
}
