const BASE_URL = '/sdata/rest'

interface Option {
  timeout?: number
  headers?: HeadersInit
}

async function request(path: string, options?: Option & RequestInit) {

  const { timeout, headers: inputHeaders = {}, ...restOpiton } = options ?? {} 

  const controller = new AbortController()

  const signal = controller.signal

  const url = `${BASE_URL}/${fixPath(path)}`

  const headers = {
    'Content-Type': 'application/json',
    ...inputHeaders,
  }

  const requestInit = {
    signal,
    headers,
    ...restOpiton,
  }

  const fetchPromise = fetch(url, requestInit)

  timeout && cancelRequest(controller, timeout)

  return fetchPromise.then(response => response.json())
}

const cancelRequest = (controller: AbortController, timeout: number) => {
  setTimeout(() => {
    controller.abort()
  }, timeout)
}

const fixPath = (path: string) => path.startsWith('/') ? path.slice(1) : path

export default request