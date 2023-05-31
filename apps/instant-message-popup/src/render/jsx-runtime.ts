import doT from 'dot'
import { v4 as uuidv4 } from 'uuid'

type RenderFunc<T> = (_: T) => { template: string }

interface EventStore {
  attrs: string,
  selector: string
  event: keyof ElementEventMap,
  handler: EventListener
}

function assertEventListener(o: unknown): asserts o is EventListener {
  if (typeof o !== 'function') {
    throw new TypeError('handler must be a event handler')
  }
}

export function jsx<T>(render: RenderFunc<T>, props: T) {

  const { template } = render(props)

  const eventRecords: EventStore[] = []

  const parsedTemplate = template.replace(/@([a-zA-Z]+)="([a-zA-Z]+)"/g, (_, event, handlerName) => {
    const uuid = uuidv4()

    const attrs = `event-${event}`

    const attrsValue = `${attrs}="${uuid}"`

    const selector = `[${attrsValue}]`

    const handler = props[handlerName as keyof T]

    assertEventListener(handler)

    eventRecords.push({
      attrs,
      selector,
      handler,
      event: event as keyof ElementEventMap,
    })

    return attrsValue
  })

  const domStr = doT.template(parsedTemplate)(props)

  const doc = new DOMParser().parseFromString(`<div id="container">${domStr}</div>`, 'text/html')

  const dom = doc.querySelector('#container')!.firstElementChild

  eventRecords.forEach(({ attrs, selector, event, handler }) => {
    const element = doc.querySelector(selector)
    element?.addEventListener(event, handler)
    element?.removeAttribute(attrs)
  })

  return dom
}