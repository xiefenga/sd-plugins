import axios from 'axios'
import { ERROR_CODE, getToken } from '@/util'

const token = getToken()

const instance = axios.create({
  baseURL: '/sdata/rest',
  timeout: 60000,
  headers: { token },
  validateStatus(status) {
    return status >= 200 && status < 300 // default
  },
})

instance.defaults.headers.post['Content-Type'] = 'application/json'

instance.interceptors.response.use(
  response => {
    let { data } = response
    if (typeof data === 'string') {
      data = JSON.parse(data)
    }
    if (data && data.status !== 200 && !(data instanceof Blob)) {
      return Promise.reject(response)
    }
    if (data instanceof Blob) {
      response.data = data
      return response
    }

    response.data = data && data.result
    return response
  },
  error => {

    if (error?.response?.data) {
      const { code, message = '' } = error.response.data as { code: number, message: string }
      const codeKey = code ? `ERROR.${code}` : ''
      error.response.data.message = ERROR_CODE[codeKey] ?? message
    }
    
    if (error.response && error.response.status === 401) {
      return
    }
    return Promise.reject(error.response)
  }
)

export default instance
