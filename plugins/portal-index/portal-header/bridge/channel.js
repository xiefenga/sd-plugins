
const channel = new BroadcastChannel('0x1461A0::sd-plugin-dev-channel')

channel.onmessage = function (e) {
  // const data = e.data
  // const text = '[receive] ' + data.msg + ' —— tab ' + data.from
  // console.log('[BroadcastChannel] receive message:', text)
  window.parent.postMessage(e.data, '*')
}

window.addEventListener('message', function (e) {
  channel.postMessage(e.data)
})