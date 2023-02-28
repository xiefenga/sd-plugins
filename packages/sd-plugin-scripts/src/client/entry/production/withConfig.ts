import proRender from '$$plugin-pro-entry$$'

window.CUSTOM_PLUGIN ??= new Map()

const render = async (dom: HTMLElement, props: any) => {
  if (props.isConfig) {
    try {
      const {
        default: settingRender,
      } = await import('$$plugin-config-entry$$')
      settingRender(dom, props)
    } catch (error) {
      console.log(error)
      proRender(dom, props)
    }
  } else {
    proRender(dom, props)
  }
}

window.CUSTOM_PLUGIN.set(process.env.PLUGIN_ID!, render)
