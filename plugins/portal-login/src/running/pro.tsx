import App from '@/App'
import { createRoot } from 'react-dom/client'
import pluginJson from '../../plugin.json'

interface PluginProps {
  appVariables: []
  customConfig: {
    appId: string
    componentId: string
  }
  sysVariables: []
  themeInfo: []
}

const runtimePath = (document.currentScript as HTMLScriptElement)?.src.replace(window.location.origin, '').replace(/\/js\/.*/, '/') ?? '/'

export default async (dom: HTMLElement, props: PluginProps) => {

  const { customConfig: { appId } } = props

  document.title = 'loading...'

  const root = createRoot(dom)

  dom.childNodes.length && dom.removeChild(dom.childNodes[0])

  try {
    const resp = await fetch(`${runtimePath}/config.json`)
    const json = await resp.json()
    const { $config } = json.props
    root.render(
      <App 
        appId={appId} 
        pluginConfig={$config} 
      />
    )
  } catch (error) {
    console.log(error)
    
    root.render(
      <App 
        appId={appId} 
        pluginConfig={pluginJson.props.$config}
      />
    )
  }
}