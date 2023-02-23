import proRender from '$$plugin-pro-entry$$'

window.CUSTOM_PLUGIN ??= new Map()

const rendeWithSetting = async (dom: HTMLElement, props: any) => {
  if (props.isConfig) {
    try {
      const {
        default: settingRender,
      } = await import('$$plugin-setting-entry$$')
      settingRender(dom, props)
    } catch (error) {
      console.log(error)
      proRender(dom, props)
    }
  } else {
    proRender(dom, props)
  }
}

const render = process.env.WITH_SETTING ? rendeWithSetting : proRender

window.CUSTOM_PLUGIN.set(process.env.PLUGIN_ID!, render)
