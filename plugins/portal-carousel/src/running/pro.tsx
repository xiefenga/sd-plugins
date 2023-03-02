import App from '@/App'
import { createRoot } from 'react-dom/client'
import { PluginProps } from '@/types'

export default (dom: HTMLElement, props: PluginProps) => {
  createRoot(dom).render(
    <App {...props.customConfig} />
  )
}