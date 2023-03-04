
export const MESSAGE_TYPE = '@0x1461A0::PLUGIN_CONFIG_SYNC'


interface PluginMessageData<T = any> {
  type: typeof MESSAGE_TYPE,
  payload: T,
}

export const postConfigMessage = (data: any) => {
  const message = { type: MESSAGE_TYPE, payload: data }
  window.frames[0].window.postMessage(message, '*')
}

function isSyncMessage(e: MessageEvent): e is MessageEvent<PluginMessageData> {
  return e.data.type === MESSAGE_TYPE
}

export const registerMessage = (handler: (e: MessageEvent<PluginMessageData>) => void) => {
  const eventHandler = (e: MessageEvent) => {
    if (isSyncMessage(e)) {
      handler(e)
    }
  }
  window.addEventListener('message', eventHandler)
  return () => {
    window.removeEventListener('message', eventHandler)
  }
}