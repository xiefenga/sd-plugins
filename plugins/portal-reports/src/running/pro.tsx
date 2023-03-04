import { createRoot } from 'react-dom/client'
import App from '@/App'

export default (dom: HTMLElement, props: any) => {

  console.log(props)

  createRoot(dom).render(
    <App {...props} />
  )
}