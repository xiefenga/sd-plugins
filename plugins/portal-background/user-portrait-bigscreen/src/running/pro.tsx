import ScreenApp from '@/App'
import { ConfigurationInput } from '@/types'
import { assertConfiguration } from '@/utils'
import { createRoot } from 'react-dom/client'


export default (dom: HTMLElement, props: ScreenPluginProps<Partial<ConfigurationInput>>) => {
  dom.childNodes.length && dom.removeChild(dom.childNodes[0])
  const root = createRoot(dom)
  if (assertConfiguration(props.options.externalVariables)) {
    root.render(<ScreenApp {...props.options.externalVariables} />)
  } else {
    root.render(
      <h1>缺少配置项</h1>
    )
  }
}