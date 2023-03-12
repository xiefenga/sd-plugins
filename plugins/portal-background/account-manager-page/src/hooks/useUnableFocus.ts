import { useRef } from 'react'
import { InputRef } from 'antd'
import { useEventListener, useMount } from 'ahooks'

export const useAntdUnableFocusRef = () => {

  const inputRef = useRef<InputRef>(null)

  useMount(() => {
    if (inputRef.current?.input?.tabIndex) {
      inputRef.current.input.tabIndex = -1
    }
  })

  useEventListener('focus', () => {
    inputRef.current?.input?.blur()
  }, { target: () => inputRef.current?.input })

  return inputRef
}