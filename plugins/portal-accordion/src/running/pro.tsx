import '@/utils/runtime'
import App from '@/App'
import {createRoot} from 'react-dom/client'

export default (dom: HTMLElement, props: any) => {
  console.log(props)
  createRoot(dom).render(
    <App />
  )
}