import { message } from 'antd'
import JSEncrypt from 'jsencrypt'

export const PUBLIC_KEY = 'MFwwDQYJKoZIhvcNAQEBBQADSwAwSAJBANNmSJW87EE2Z3KDW5Kod8cL + 7lUBgfKLm86CGfMQxvc8w + JnOE7GV72DVyg2kCMGho5g9AR64BmrGobbG4xMZECAwEAAQ =='

export const NOOP = () => { }

export const getCookie = (name: string) => {
  const x = document.cookie.split(';').map(item => item.split('=') as [string, string])
  const map = new Map<string, string>(x)
  return map.get(name) ?? ''
}

export const getToken = () => {
  const urlSearchParams = new URLSearchParams(location.search)
  return urlSearchParams.get('token') ?? window.token
}

export const EncryptPassword = (text: string) => {
  const encrypt = new JSEncrypt()
  encrypt.setPublicKey(
    '-----BEGIN PUBLIC KEY-----' +
    PUBLIC_KEY +
    '-----END PUBLIC KEY-----'
  )
  return encrypt.encrypt(text).toString()
}

export const download = (blob: Blob, filename: string) => {
  const download = document.createElement('a')
  const href = window.URL.createObjectURL(blob)
  download.href = href
  download.download = `${filename}.xlsx`
  document.body.appendChild(download)
  download.click()
  document.body.removeChild(download)
  window.URL.revokeObjectURL(href)
}

export const checkPluginProps = (props: UnsafePluginProps<{ assetId: string }>): props is PluginProps<{ assetId: string }> => {
  const access = 'assetId' in props.customConfig
  !access && message.error('缺少 assetId！')
  return access
}

