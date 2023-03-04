import { effect, reactive } from '@vue/reactivity'

export * from './theme'
export * from './constants'

export * from './components'

export * from './types'

window.PROTAL_CONFIGGURATION ??= reactive({})

export const setConfiguration = (key: string, val: any) => {
  window.PROTAL_CONFIGGURATION[key] = val
}

export const getConfiguration = (key: string): Promise<any> => {
  return new Promise(resolve => {
    effect(() => {
      const value = window.PROTAL_CONFIGGURATION[key]
      if (value) {
        resolve(value)
      }
    })
  })
}

