import alertify from 'alertifyjs'
import config from '@/config'
import { delay as sleep } from '@/util'
import { queryNotices } from '@/api/notify'
import { Notice } from '@/types/api/notify'
import Notification from '@/components/Notification'

alertify.defaults.notifier.closeButton = true

// const gap = 60 * 60 * 1000 * 24 * 1

const alreadyShowNotices = new Set<string>()

const notifications: Notification[] = []

let timer: number | undefined 

const getValidNotices = async () => {
  const notices = await queryNotices()
  const current = Date.now()
  return notices.filter(notice => !alreadyShowNotices.has(notice.id) && current - notice.create_time <= config.gap * 1000).slice(0, config.max)
}

const render = async () => {
  const notices = await getValidNotices()
  for (const notice of notices) {
    renderNotifaction(notice)
    await sleep(config.delay)
  }
}

const renderNotifaction = (notice: Notice) => {

  const {
    info_url: url,
    info_title: title,
    info_content: content,
    info_url_title: urlTitle = '查看',
    create_time: createTime,
  } = notice

  const createdDate = new Date(createTime)

  const date = `${createdDate.getFullYear()}-${(createdDate.getMonth() + 1).toString().padStart(2, '0')}-${createdDate.getDate().toString().padStart(2, '0')}`

  const time = `${createdDate.getHours().toString().padStart(2, '0')}:${createdDate.getMinutes().toString().padEnd(2, '0')}:${createdDate.getSeconds().toString().padStart(2, '0')}`

  const element = (
    <Notification
      url={url}
      date={date}
      time={time}
      title={title}
      content={content}
      urlTitle={urlTitle}
      handleClick={() => ins.dismiss()}
      handleMouseEnter={() => {
        pausePolling()
        notifications.forEach(ins => ins.delay(0))
      }}
      handleMouseLeave={() => {
        polling()
        notifications.forEach((ins, i) => ins.delay(config.wait + config.delay / 1000 * i))
      }}
    />
  )
  const ins = alertify.notify(element, 'notify', config.wait)
  alreadyShowNotices.add(notice.id)
  ins.ondismiss = () => {
    const index = notifications.indexOf(ins)
    if (index > -1) {
      notifications.splice(index, 1)
    }
  }
  notifications.push(ins)
}

const pausePolling = () => {
  window.clearInterval(timer)
}

const polling = () => {
  pausePolling()
  timer = window.setInterval(render, config.pollInterval * 1000)
}


const notify = () => {
  render()
  polling()
}

export default notify

