import App from '@/App'
import Tip from '@/Tip'
import { checkPluginProps } from '@/util'
import { createRoot } from 'react-dom/client'

export default (dom: HTMLElement, props: UnsafePluginProps<{ assetId: string }>) => {
  const root = createRoot(dom)
  dom.childNodes.length && dom.removeChild(dom.childNodes[0])
  checkPluginProps(props) 
    ? root.render(<App assetId={props.customConfig.assetId} />)
    : root.render(<Tip />)
}