import template from './template.dot?raw'
import './index.less'

type Fc<T> = (_: T) => { template: string }

interface NotificationProps {
  title: string
  date: string
  time: string
  content: string
  urlTitle: string
  url: string
  handleClick: () => void
  handleMouseEnter: () => void
  handleMouseLeave: () => void
}

const Notification: Fc<NotificationProps> = () => {

  return {
    template,
  }
}

export default Notification