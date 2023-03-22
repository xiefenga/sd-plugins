import { logout } from '@/api'
import { message } from 'antd'

export const download = (blob: Blob, filename: string) => {
  const download = document.createElement('a')
  const href = window.URL.createObjectURL(blob)
  download.href = href
  download.download = `${filename}`
  document.body.appendChild(download)
  download.click()
  document.body.removeChild(download)
  window.URL.revokeObjectURL(href)
}

export const readFile2Json = async <T>(file: File): Promise<T> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.addEventListener('load', () => {
      const data = JSON.parse(reader.result as string) as T
      resolve(data)
    })
    reader.addEventListener('error', () =>{
      reject(reader.error)
    })
    reader.readAsText(file)
  })
}

export const appid = new URLSearchParams(window.location.search).get('appid')

export const logoutSystem = async () => {
  try {
    const { status, data } = await logout()
    if (status === 200) {
      if (data) {
        window.location.href = `/application/login/${appid}`
      } else {
        window.location.reload()
      }
    }
  } catch (error) {
    message.error('退出登录出错' + error)
  }
}