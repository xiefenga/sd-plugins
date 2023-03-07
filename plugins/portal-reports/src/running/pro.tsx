import { createRoot } from 'react-dom/client'
import App from '@/App'

export default (dom: HTMLElement, props: any) => {

  createRoot(dom).render(
    <App {...props} />
  )
}