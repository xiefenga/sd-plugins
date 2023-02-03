type Render = () => void

declare module '$$plugin-dev-entry$$' {
  declare const render: Render
  export default render
}


type PluginRender<T> = (dom: HTMLElement, props: T) => void

declare module '$$plugin-pro-entry$$' {
  declare const render: PluginRender<T>
  export default render
}