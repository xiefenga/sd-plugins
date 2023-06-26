import { createRoot } from 'react-dom/client'

import App from '@/App'
import { PluginConfigProvider } from '@/context'
import { PluginConfig, UnsafePluginProps } from '@/types'

export default (dom: HTMLElement, props: UnsafePluginProps<PluginConfig>) => {
  const root = createRoot(dom)
  dom.childNodes.length && dom.removeChild(dom.childNodes[0])
  if (props.customConfig.appAssetId && props.customConfig.permissionAssetId) {
    const { appAssetId, permissionAssetId } = props.customConfig
    root.render(
      <PluginConfigProvider value={{ appAssetId, permissionAssetId }}>
        <App />
      </PluginConfigProvider>
    )
  } else {
    root.render(<div>请先配置 appAssetId 和 permissionAssetId</div>)
  }
}