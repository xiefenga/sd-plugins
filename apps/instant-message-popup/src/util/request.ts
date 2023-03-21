import ERROR_JSON from '@/assets/error.json'

export const ERROR_CODE = ERROR_JSON as Partial<Record<string, string>>

export const getToken = () => {
  const urlSearchParams = new URLSearchParams(location.search)
  return urlSearchParams.get('token') ?? window.token
}

